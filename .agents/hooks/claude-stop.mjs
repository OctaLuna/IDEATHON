import { runAgentVerification } from "./run-agent-verification.mjs";

const result = runAgentVerification();
if (!result.ok) {
  const reason = result.error ?? "Run lint, tests, and build; fix failures before finishing.";
  console.log(JSON.stringify({ decision: "block", reason }));
}
