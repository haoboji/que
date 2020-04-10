import fetch from "node-fetch";
import config from "./config.json";
import { Status } from "./types";

export const SERVER = "https://que.actronair.com.au/api/v0";
export const AUTH_URL = `${SERVER}/client/user-devices`;
export const TOKEN_URL = `${SERVER}/oauth/token`;
export const STATUS_URL = `${SERVER}/client/ac-systems/status/latest`;
export const CMD_URL = `${SERVER}/client/ac-systems/cmds/send`;

export const AUTH_PARAMS =
  "deviceName=google&client=Android&deviceUniqueIdentifier=smarthome";
export const TOKEN_PARAMS = "grant_type=refresh_token&client_id=app";

export const getRefreshToken = async (username: string, password: string) => {
  const response = await fetch(AUTH_URL, {
    body: `${AUTH_PARAMS}&username=${username}&password=${password}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
  const { pairingToken } = await response.json();
  return pairingToken;
};

export const getAccessToken = async (refreshToken: string) => {
  const response = await fetch(TOKEN_URL, {
    body: `${TOKEN_PARAMS}&refresh_token=${refreshToken}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
  const token = await response.json();
  console.log("token", token);
  return token;
};

export const getStatus = async (authorization: string): Promise<Status> => {
  console.log("status url: ", `${STATUS_URL}?serial=${config.serial}`);
  const response = await fetch(`${STATUS_URL}?serial=${config.serial}`, {
    headers: { authorization },
  });
  const status = await response.json();
  return status;
};

export const sendCommand = async (
  authorization: string,
  command: {
    [s: string]: string | boolean;
  }
) => {
  const response = await fetch(`${CMD_URL}?serial=${config.serial}`, {
    body: JSON.stringify({ command }),
    headers: { authorization },
    method: "POST",
  });
  console.log("CMD url: ", `${CMD_URL}?serial=${config.serial}`);
  console.log("CMD request: ", JSON.stringify({ command }));
  console.log("CMD response:", await response.json());
};
