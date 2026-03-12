import { CALL_STACK, runCallStack } from "./4_callStack.js";

// function saludar() {
//   setTimeout(() => console.log("2 seconds"), 2000)
//   console.log("Hola")
// }
// function iniciar() {
//   saludar();
// }
// iniciar();

// El Callstack recibe todas las tareas por completar. Las apila, y ejecuta la ultima en llegar primero. Por lo que "iniciar" es la ultima tarea en completarse, mientras que las tareas anidadas se resuelven primero.

/*
console.log() 
^
setTimeout(...)
^
saludar()
^
iniciar()
*/


CALL_STACK.push("start function - iniciar()")
CALL_STACK.push("start function - saludar()")
CALL_STACK.push("call api - setTimeout")
CALL_STACK.push("start function - console.log()")
// Estas 4 tareas, al ser anidadas, liberarán el hilo hasta que se completen.

runCallStack();