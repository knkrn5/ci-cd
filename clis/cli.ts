import { spawn } from "node:child_process";

const bcp = spawn("bash", ["s.sh"]);

bcp.stdout.on("data", (data) => {
  process.stdout.write(`stdout: ${data}`);
});

bcp.stderr.on("data", (data) => {
  process.stderr.write(`stderr: ${data}`);
});

bcp.on("close", (code) => {
  if (code !== 0) {
    console.error(`child process exited with code ${code}`);
  } else {
    console.log("script ran successfully");
  }
});

bcp.on("error", (err) => {
  console.error(`Failed to start child process: ${err}`);
});
