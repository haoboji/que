import fetch from "node-fetch";

export const SERVER = "https://que.actronair.com.au/api/v0";
export const AUTH_URL = `${SERVER}/client/user-devices`;
export const TOKEN_URL = `${SERVER}/oauth/token`;
export const AUTH_PARAMS =
  "deviceName=google&client=Android&deviceUniqueIdentifier=smarthome";
export const TOKEN_PARAMS = "grant_type=refresh_token&client_id=app";

export const getRefreshToken = async (username: string, password: string) => {
  console.log(username, password);
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
