import * as ngrok from "ngrok";

(async () => {
  try {
    const url = await ngrok.connect(3000);
    console.log("");
    console.log("COPY & PASTE NGROK URL BELOW");
    console.log(url);
    console.log("");
    console.log("=====");
    console.log(
      "Visit the Actions on Google console at http://console.actions.google.com"
    );
    console.log("Replace the webhook URL in the Actions section with:");
    console.log("    " + url + "/smarthome");

    console.log("");
    console.log("In the console, set the Authorization URL to:");
    console.log("    " + url + "/fakeauth");

    console.log("");
    console.log("Then set the Token URL to:");
    console.log("    " + url + "/faketoken");
    console.log("");

    console.log("Finally press the 'TEST DRAFT' button");
  } catch (err) {
    console.error("Ngrok was unable to start");
    console.error(err);
    process.exit();
  }
})();
