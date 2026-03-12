/**
 * Las promesas ayudan a manejar el comportamiento asincrono de JS.
 * 
 * Tienen 3 estados:
 *  - pending. Cuando la promesa se crea
 *  - fullfiled. Cuando la promesa se resuelva, bien o mal.
 *  - reject. Cuando la promesa no se resolvió.
 * 
 * Usa 2 callbaks:
 *  - resolve
 *  - reject
 * 
 * Tiene 2 métodos
 *  - then: se ejecuta cuando la promesa se resuelve
 *  - catch: se ejecuta cuando la promesa no se resuelve
 */
function run() {
  let random = Math.random() * 10;
  random = Math.floor(random) + 1;

  const prom = new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        if (random % 2 == 0) resolve(`${random} Es par.`)
        // else reject(`${random} Es non.`)
      }, 500)
    }
  );

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Resolviendo..."), 100)
    setTimeout(() => reject("Rechazando..."), 100)
  })
    .then((res) => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log("Terminamos."))

  prom
    .then((successMessage) => { console.log(successMessage) })
    .catch((errorMessage) => { console.log(errorMessage) })
    .finally(() => { console.log("Terminamos. ") })
}

run();


let seqProm = new Promise((resolve, reject) => {
  console.log(1)
  resolve(2)

}).then(result => console.log(result))
console.log(3)