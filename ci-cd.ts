import express from "express";
import { spawn } from "node:child_process";
import { createHmacSign, verifySign } from "./utils/hmac.ts";

const app = express();
const port = 3000;

// app.use(express.raw({ type: "application/json" }));
/* app.use(
  express.raw({
    type: "application/x-www-form-urlencoded",
  }),
); */
app.use(
  express.raw({
    type: ["application/json", "application/x-www-form-urlencoded"],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.post("/gw", (req, res) => {
  console.log("body data of gw", req.body);

  if (!Buffer.isBuffer(req.body)) {
    return res.status(400).send("Request body is required");
  }

  const signature = req.headers["x-hub-signature-256"] as string;
  if (!signature) {
    return res.status(403).send("Invalid signature");
  }

  const isSignValid = verifySign(signature, req.body);
  console.log("is sign valid", signature, isSignValid);

  if (!isSignValid) {
    return res.status(403).send("Webhook not valid");
  }

  res.status(202).send("Webhook accepted");

  const bcp = spawn("bash", ["cli/t.sh"]);

  bcp.stdout.on("data", (data) => {
    process.stdout.write(`stdout: ${data}`);
  });

  bcp.stderr.on("data", (data) => {
    process.stderr.write(`stderr: ${data}`);
  });

  bcp.on("close", (code) => {
    if (code !== 0) {
      console.error(`child process exited with code ${code}`);
      // res.status(500).send(`child process exited with code ${code}`);
    } else {
      console.log("script ran successfully", new Date().toLocaleString());
      // res.send("script ran successfully");
    }
  });

  bcp.on("error", (err) => {
    console.error(`Failed to start child process: ${err}`);
    // res.status(500).send(`Failed to start child process: ${err}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
