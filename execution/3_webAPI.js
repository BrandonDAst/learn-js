// Web API es el asistende del navegador/motor al que JS le delega el trabajo mientras sigue ejecutando.

import { MICRO_STACK_QUEUE } from "./2-stackQueue";

// console.log(1);
// setTimeout(() => console.log(2), 1000)
// console.log(3)

/*
  Esto imprimie:
  
  1
  3
  2
  
*/
/*
  Ya que JS al ser de un solo hilo, ejecuta:
  La impresion (1)
  La delegacion de la espera hacia la Web API
  La impresion (3)
  Y finalmente, cuando se completen los 1000 milisegundos, la Web API deposita el resultado, en este caso la impresion de (2) al call stack.
*/

export let WEB_API_CALLS = [];
export function runWebAPI() {
  let currentCall = "";

  while (WEB_API_CALLS.length > 0) {
    currentCall = WEB_API_CALLS.slice(-1)[0];

    console.log("Calling: ", currentCall);
    MICRO_STACK_QUEUE.push(`Result of: ${currentCall}`)

    WEB_API_CALLS.pop();
  }
}
runWebAPI
