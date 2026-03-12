import { runWebAPI, WEB_API_CALLS } from "./3_webAPI";

export let CALL_STACK = [];

export function runCallStack() {
  let currentTask = "";

  while (CALL_STACK.length > 0) {
    currentTask = CALL_STACK.slice(-1)[0];
    console.log("Executing: ", currentTask);

    if (currentTask.includes("call api")) {
      WEB_API_CALLS.push(currentTask)
      runWebAPI();
    }

    CALL_STACK.pop();
  }
}