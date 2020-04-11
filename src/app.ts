import {
  smarthome,
  SmartHomeJwt,
  SmartHomeV1ExecuteResponseCommands,
} from "actions-on-google";
import jwt from "./smart-home-key.json";
import { getStatus, sendCommand } from "./api";
import {
  getDeviceStates,
  getDevices,
  convertCommandsGoogleToQue,
} from "./helper";

const app = smarthome({ jwt: jwt as SmartHomeJwt });

app.onSync(async (body, headers) => {
  const status = await getStatus(headers.authorization as string);
  const devices = getDevices(status);
  return {
    requestId: body.requestId,
    payload: {
      agentUserId: status.lastKnownState.AirconSystem.MasterSerial,
      devices,
    },
  };
});

app.onQuery(async (body, headers) => {
  const status = await getStatus(headers.authorization as string);
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
  const googleCommands = inputs.reduce(
    (prev, curr) => [...prev, ...curr.payload.commands],
    []
  );
  const ids = googleCommands.map((gc) => gc.devices.map((d) => d.id)).flat(1);
  const queCommand = convertCommandsGoogleToQue(googleCommands);
  await sendCommand(headers.authorization as string, queCommand);
  const status = await getStatus(headers.authorization as string);
  const devices = getDeviceStates(status);
  const commands: SmartHomeV1ExecuteResponseCommands[] = ids.map((id) => ({
    ids: [id],
    status: "SUCCESS",
    states: {
      ...devices[parseInt(id)],
    },
  }));
  return {
    requestId,
    payload: {
      commands,
    },
  };
});

export default app;
