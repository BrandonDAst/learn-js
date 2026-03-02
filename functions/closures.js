/*
  CLOSURES:
  Una closure es una funcion que tiene acceso a variables de un ámbito externo, incluso después de que esa funcion haya terminado de ejecutarse.

 */

function createCounter() {
  let count = 0;

  return function increase() {
    return count++;
  }
}

let counter = createCounter();
console.log(counter())
console.log(counter())
console.log(counter())


/* 
  Esto puede simular Modificadores de Acceso PRIVATE
*/

function crearCuenta(saldoInicial) {
  let saldo = saldoInicial; // <- Luego de llamar crearCuenta, este valor no se puede modificar, a menos de funciones como ...
  return {
    depositar: (monto) => saldo += monto,
    retirar: (monto) => saldo -= monto,
    verSaldo: () => console.log(`El saldo actual es de: ${saldo}`),
  }
}
let cuenta = crearCuenta(1000);
cuenta.verSaldo();
cuenta.depositar(100);
cuenta.verSaldo();
cuenta.retirar(123);
cuenta.verSaldo();