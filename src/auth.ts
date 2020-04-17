import util from "util";
import { registerDevice, getAccessToken } from "./api";
import { RequestHandler } from "express";

export const loginPageHandler: RequestHandler = (req, res) => {
  res.send(`
    <html>
      <body style="">
        <form action="/login" method="post">
          <input type="hidden" name="responseurl" value="${req.query.responseurl}" />
          <label for="username">QUE Email</label>
          <input id="username" name="username" />
          <label for="username">QUE Password</label>
          <input name="password" type="password" />
          <button type="submit">Link QUE to Google Home</button>
        </form>
        <style>
          body {
            display: flex; 
            align-items: center; 
            justify-content: center;
          }
          form {
            display: flex;
            flex-direction: column;
          }
          input {
            margin-bottom: 16px;
          }
        </style>
      </body>
    </html>
  `);
};

export const loginHandler: RequestHandler = async (req, res) => {
  const responseurl = decodeURIComponent(req.body.responseurl);
  const username = req.body.username;
  const password = req.body.password;
  const device = await registerDevice(username, password);
  const redirectUri = `${responseurl}&code=${device.pairingToken}`;
  return res.redirect(redirectUri);
};

export const authHandler: RequestHandler = async (req, res) => {
  const responseurl = util.format(
    "%s?state=%s",
    decodeURIComponent(req.query.redirect_uri),
    req.query.state
  );
  return res.redirect(`/login?responseurl=${encodeURIComponent(responseurl)}`);
};

export const tokenHandler: RequestHandler = async (req, res) => {
  const grantType = req.query.grant_type || req.body.grant_type;
  const code = req.query.code || req.body.code;
  const accessToken = await getAccessToken(code);

  if (grantType === "authorization_code") {
    // eslint-disable-next-line @typescript-eslint/camelcase
    res.status(200).json({ ...accessToken, refresh_token: code });
  } else if (grantType === "refresh_token") {
    res.status(200).json(accessToken);
  }
};
