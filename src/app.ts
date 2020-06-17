import {
  smarthome,
  SmartHomeJwt,
  SmartHomeV1ExecuteStatus,
} from "actions-on-google";
import jwt from "./smart-home-key.json";
import { getStatus, sendCommand, getAcSys } from "./api";
import {
  getDeviceStates,
  getDevices,
  convertCommandsGoogleToQue,
  getSerialOrThrow,
} from "./helper";

const app = smarthome({ jwt: jwt as SmartHomeJwt });

app.onSync(async (body, headers) => {
  const ac = await getAcSys(headers.authorization as string);
  const serial = ac._embedded["ac-system"]?.[0]?.serial;
  const status = await getStatus(headers.authorization as string, serial);
  const devices = getDevices(status);
  return {
    requestId: body.requestId,
    payload: {
      agentUserId: serial,
      devices,
    },
  };
});

app.onQuery(async (body, headers) => {
  const serial = getSerialOrThrow(body.inputs[0].payload.devices);
  const status = await getStatus(headers.authorization as string, serial);
  const devices = getDeviceStates(status);
  return {
    requestId: body.requestId,
    payload: {
      devices: { ...devices },
    },
  };
});

app.onExecute(async (body, headers) => {
  const { requestId, inputs } = body;
  const serial = getSerialOrThrow(inputs[0].payload.commands[0].devices);
  const googleCommands = inputs.map((i) => i.payload.commands).flat(1);
  const queCommand = convertCommandsGoogleToQue(googleCommands);
  const response = await sendCommand(
    headers.authorization as string,
    serial,
    queCommand
  );
  const ids = googleCommands.map((gc) => gc.devices.map((d) => d.id)).flat(1);
  const status: SmartHomeV1ExecuteStatus =
    response.type === "ack" ? "SUCCESS" : "ERROR";
  return {
    requestId,
    payload: {
      commands: [{ ids, status }],
    },
  };
});

export default app;
