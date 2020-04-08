import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { AddressInfo } from "net";
import app from "./app";
import * as Auth from "./auth";
import * as Config from "./config";

const expressApp = express();
expressApp.use(cors());
expressApp.use(morgan("dev"));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.set("trust proxy", 1);

expressApp.get("/login", Auth.loginPageHandler);
expressApp.post("/login", Auth.loginHandler);
expressApp.post("/auth", Auth.authHandler);
expressApp.post("/token", Auth.tokenHandler);
expressApp.post("/smarthome", app);

const appPort = process.env.PORT || Config.expressPort;

const expressServer = expressApp.listen(appPort, async () => {
  const server = expressServer.address() as AddressInfo;
  const { address, port } = server;

  console.log(`Smart home server listening at ${address}:${port}`);
});
