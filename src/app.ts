import { smarthome, SmartHomeJwt } from "actions-on-google";
import jwt from "./smart-home-key.json";
import { getStatus } from "./api";

const app = smarthome({ jwt: jwt as SmartHomeJwt, debug: true });

app.onSync(async (body, headers) => {
  const status = await getStatus(headers.authorization as string);
  const devices = status.lastKnownState.RemoteZoneInfo.map((z, i) => {
    return {
      id: i.toString(),
      type: "action.devices.types.THERMOSTAT",
      traits: ["action.devices.traits.TemperatureSetting"],
      name: {
        name: z.NV_Title,
        defaultNames: [z.NV_Title],
        nicknames: [z.NV_Title],
      },
      willReportState: true,
      attributes: {
        availableThermostatModes: "off,heat,cool,on",
        thermostatTemperatureUnit: "C",
      },
    };
  });
  return {
    requestId: body.requestId,
    payload: {
      agentUserId: status.lastKnownState.AirconSystem.MasterSerial,
      devices,
    },
  };
});

export default app;
