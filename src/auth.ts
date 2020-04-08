import util from "util";
import { getRefreshToken, getAccessToken } from "./api";
import { RequestHandler } from "express";

export const loginPageHandler: RequestHandler = (req, res) => {
  res.send(`
    <html>
      <body>
        <form action="/login" method="post">
          <input type="hidden" name="responseurl" value="${req.query.responseurl}" />
          <input name="username" />
          <input name="password" />
          <button type="submit" style="font-size:14pt">Link this service to Google</button>
        </form>
      </body>
    </html>
  `);
};

export const loginHandler: RequestHandler = async (req, res) => {
  const responseurl = decodeURIComponent(req.body.responseurl);
  const username = req.body.username;
  const password = req.body.password;
  const refreshToken = await getRefreshToken(username, password);
  console.log("refreshToken: ", refreshToken);
  const redirectUri = `${responseurl}&code=${refreshToken}`;
  console.log(redirectUri);
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
  console.log(`code: ${code}`);
  console.log(`Grant type ${grantType}`);
  const accessToken = await getAccessToken(code);

  if (grantType === "authorization_code") {
    // eslint-disable-next-line @typescript-eslint/camelcase
    res.status(200).json({ ...accessToken, refresh_token: code });
  } else if (grantType === "refresh_token") {
    res.status(200).json(accessToken);
  }
};
