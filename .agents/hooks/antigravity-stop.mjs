import { runAgentVerification } from "./run-agent-verification.mjs";

let input = "";
for await (const chunk of process.stdin) input += chunk;

let event = {};
try {
  event = JSON.parse(input || "{}");
} catch {
  event = {};
}

if (event.fullyIdle === false) {
  console.log(JSON.stringify({ decision: "continue", reason: "Wait for background tasks to finish." }));
  process.exit(0);
}

const result = runAgentVerification();
if (!result.ok) {
  const reason = result.error ?? "Run lint, tests, and build; fix failures before finishing.";
  console.log(JSON.stringify({ decision: "continue", reason }));
} else {
  console.log(JSON.stringify({ decision: "stop" }));
}
