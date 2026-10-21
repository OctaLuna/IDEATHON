import { runAgentVerification } from "./run-agent-verification.mjs";

let hookInput = {};
try {
  hookInput = JSON.parse(await new Promise((resolve) => {
    let input = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (input += chunk));
    process.stdin.on("end", () => resolve(input || "{}"));
  }));
} catch {
  hookInput = {};
}

const result = runAgentVerification();
if (!result.ok) {
  const reason = result.error ?? "Run lint, tests, and build; fix failures before finishing.";
  console.log(JSON.stringify(hookInput.stop_hook_active
    ? { continue: false, systemMessage: reason }
    : { decision: "block", reason }));
} else {
  console.log("{}");
}
