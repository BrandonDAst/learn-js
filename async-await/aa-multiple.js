let urls = ["https://rickandmortyapi.com/api/character/1", "https://rickandmortyapi.com/api/character/2", "https://rickandmortyapi.com/api/character/3", "https://rickandmortyapi.com/api/character/4", "https://rickandmortyapi.com/api/character/5"]

async function fetchMultipleData() {
  let response = null;
  let data = null;
  try {
    for await (let url of urls) {
      response = await fetch(url);
      data = await response.json();

      console.log(data)
    }
  }
  catch (err) {
    console.log(err);
  }
}

await fetchMultipleData()