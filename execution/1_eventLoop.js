import { MICRO_STACK_QUEUE } from "./2-stackQueue";
import { CALL_STACK } from "./4_callStack";

export function runEventLoop() {
  // Always watch for Call Stack
  while (true) {
    // If it is empty, add the next task from the Stack Queue
    if (CALL_STACK.length == 0) CALL_STACK.push(MICRO_STACK_QUEUE.slice(-1))
  }
}
