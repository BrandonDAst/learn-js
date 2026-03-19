function crearPromesa() {
  return new Promise((resolve, reject) => {
    let random = Math.random() * 10;
    random = Math.floor(random) + 1;

    setTimeout(() => {
      if (random % 2 == 0) resolve(`${random} Es par. ✅`)
      else reject(`${random} Es impar. ❌`)
    }, 100)
  });
}

const prom1 = crearPromesa();
const prom2 = crearPromesa();
const prom3 = crearPromesa();

Promise.allSettled([prom1, prom2, prom3])
  .then(resultados => console.log(resultados))
  .catch(error => console.log(error))
  .finally(() => console.log("Terminamos."))