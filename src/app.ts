import { smarthome, SmartHomeJwt } from "actions-on-google";
import jwt from "./smart-home-key.json";
import { getStatus } from "./api";
import { modeQueToGoogle } from "./helper";

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
        availableThermostatModes: "off,heat,cool,heatcool,fan-only",
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

app.onQuery(async (body, headers) => {
  const status = await getStatus(headers.authorization as string);
  const {
    RemoteZoneInfo,
    MasterInfo,
    UserAirconSettings,
  } = status.lastKnownState;
  const devices = RemoteZoneInfo.map((z, i) => {
    return {
      online: MasterInfo.CloudReachable,
      thermostatMode: UserAirconSettings.EnabledZones[i]
        ? modeQueToGoogle[UserAirconSettings.Mode]
        : "off",
      thermostatTemperatureSetpoint:
        UserAirconSettings.Mode === "COOL"
          ? z.TemperatureSetpoint_Cool_oC
          : z.TemperatureSetpoint_Heat_oC,
      thermostatTemperatureSetpointHigh: z.TemperatureSetpoint_Cool_oC,
      thermostatTemperatureSetpointLow: z.TemperatureSetpoint_Heat_oC,
      thermostatTemperatureAmbient: z.LiveTemp_oC,
      thermostatHumidityAmbient: MasterInfo.LiveHumidity_pc,
      status: "SUCCESS",
    };
  });
  return {
    requestId: body.requestId,
    payload: {
      devices: { ...devices },
    },
  };
});

export default app;
