import fetch from "node-fetch";
import { Status, ACSystem, Device, Token } from "./types";

export const SERVER = "https://que.actronair.com.au";
export const AUTH_URL = `${SERVER}/api/v0/client/user-devices`;
export const TOKEN_URL = `${SERVER}/api/v0/oauth/token`;
export const AC_SYS_URL = `${SERVER}/api/v0/client/ac-systems`;
export const STATUS_URL = `${AC_SYS_URL}/status/latest`;
export const CMD_URL = `${AC_SYS_URL}/cmds/send`;

export const AUTH_PARAMS =
  "deviceName=Smarthome&client=LoadTest&deviceUniqueIdentifier=Google";
export const TOKEN_PARAMS = "grant_type=refresh_token&client_id=app";

export const getAcSys = async (authorization: string): Promise<ACSystem> => {
  const response = await fetch(AC_SYS_URL, { headers: { authorization } });
  return await response.json();
};

export const registerDevice = async (
  username: string,
  password: string
): Promise<Device> => {
  const response = await fetch(AUTH_URL, {
    body: `${AUTH_PARAMS}&username=${username}&password=${password}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
  const device = await response.json();
  console.log("Device: ", device);
  return device;
};

export const getAccessToken = async (refreshToken: string): Promise<Token> => {
  const response = await fetch(TOKEN_URL, {
    body: `${TOKEN_PARAMS}&refresh_token=${refreshToken}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
  const token = await response.json();
  console.log("Token: ", token);
  return token;
};

export const getStatus = async (
  authorization: string,
  serial: string
): Promise<Status> => {
  const response = await fetch(`${STATUS_URL}?serial=${serial}`, {
    headers: { authorization },
  });
  const status = await response.json();
  console.log("Status: ", status);
  return status;
};

export const sendCommand = async (
  authorization: string,
  serial: string,
  command: {
    [s: string]: string | boolean;
  }
) => {
  console.log(`authorization: ${authorization}`);
  const response = await fetch(`${CMD_URL}?serial=${serial}`, {
    body: JSON.stringify({ command }),
    headers: { authorization },
    method: "POST",
  });
  console.log("CMD url: ", `${CMD_URL}?serial=${serial}`);
  console.log("CMD request: ", JSON.stringify({ command }));
  console.log("CMD response:", await response.json());
};
