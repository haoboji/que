import { smarthome, SmartHomeJwt } from "actions-on-google";
import jwt from "./smart-home-key.json";

const app = smarthome({ jwt: jwt as SmartHomeJwt, debug: true });

app.onSync(async (body, headers) => {
  console.log("headers", headers);
  return {
    requestId: body.requestId,
    payload: {
      agentUserId: "1",
      devices: [],
    },
  };
});

export default app;
