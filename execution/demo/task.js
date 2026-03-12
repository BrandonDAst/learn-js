export function f1_t1() { console.log("F1 - T1") }
export function f1_t2() { setTimeout(() => console.log("Async F1 - T2"), 1) }
export function f1_t3() { console.log("F1 - T3") }
export function f2_t1() { console.log("F2 - T1") }
export function f3_t1() { console.log("F3 - T1") }
export function f3_t2() { console.log("F3 - T2") }