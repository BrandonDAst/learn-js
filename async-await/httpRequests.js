function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
}

async function run() {
  // GET
  const getResponseData = await
    sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts");
  console.log(getResponseData);

  // POST
  switch (key) {
    case value:

      break;

    default:
      break;
  }
}

run();