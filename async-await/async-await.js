function run() {
  fetch(`https://rickandmortyapi.com/api/character`)
    .then(res => res.json())
    .then(jRes => console.log(jRes))
    .catch(error => console.error(error))
}

run();

async function runAsync() {
  try {
    let promiseResponse = await fetch(`https://rickandmortyapi.com/api/character`)
    let data = await promiseResponse.json()
    console.log(data)
  }
  catch (err) {
    console.error(err)
  }
  finally {
    console.log("Terminamos...")
  }

}
await runAsync();