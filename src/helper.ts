import { Status } from "./types";
import {
  SmartHomeV1QueryRequestDevices,
  SmartHomeV1ExecuteRequestExecution,
  SmartHomeV1ExecuteRequestCommands,
} from "actions-on-google";

export const modeQueToGoogle: { [s: string]: string } = {
  COOL: "cool",
  HEAT: "heat",
  AUTO: "heatcool",
  FAN: "fan-only",
};

export const getDevices = (status: Status) => {
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
        availableThermostatModes: [
          "off",
          ...Object.values(modeQueToGoogle),
        ].join(","),
        thermostatTemperatureUnit: "C",
      },
      customData: {
        serial: status.lastKnownState.AirconSystem.MasterSerial,
      },
    };
  });
  return devices;
};

export const getDeviceStates = (status: Status) => {
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
    };
  });
  return devices;
};

export const convertCommandGoogleToQue = (
  device: SmartHomeV1QueryRequestDevices,
  execution: SmartHomeV1ExecuteRequestExecution
): { [s: string]: string | boolean } => {
  const { command, params } = execution;
  switch (command) {
    case "action.devices.commands.ThermostatSetMode": {
      const queMode = Object.keys(modeQueToGoogle).find(
        (q) => modeQueToGoogle[q] === params.thermostatMode
      );
      if (queMode) {
        return {
          [`UserAirconSettings.EnabledZones[${parseInt(device.id)}]`]: true,
          "UserAirconSettings.Mode": queMode,
        };
      } else {
        return {
          [`UserAirconSettings.EnabledZones[${parseInt(device.id)}]`]: false,
        };
      }
    }
    default:
      return {};
  }
};

export const convertCommandsGoogleToQue = (
  commands: SmartHomeV1ExecuteRequestCommands[]
): { [s: string]: string | boolean } => {
  const queCommands = commands.reduce((prev, curr) => {
    const { devices, execution } = curr;
    const commands = devices
      .map((d) =>
        execution.map((e) => {
          return convertCommandGoogleToQue(d, e);
        })
      )
      .flat(1);
    return [...prev, ...commands];
  }, []);
  const singleCommand = queCommands.reduce(
    (prev, curr) => ({ ...prev, ...curr }),
    { type: "set-settings" }
  );
  return singleCommand;
};
