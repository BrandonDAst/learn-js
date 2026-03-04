const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const usersDatabase = [
  {
    username: "brandon",
    password: "123",
  },
  {
    username: "caro",
    password: "456",
  },
  {
    username: "mariana",
    password: "789",
  },
];

const usersTimeline = [
  {
    username: "Estefany",
    timeline: "Me encata Javascript!",
  },
  {
    username: "Oscar",
    timeline: "Bebeloper es lo mejor!",
  },
  {
    username: "Mariana",
    timeline: "A mi me gusta más el café que el té",
  },
  {
    username: "brandon",
    timeline: "Yo hoy no quiero trabajar",
  },
];

function printTimeline(username) {
  const userTL = usersTimeline.find((tL) => tL.username === username);

  console.log("---Timeline---")
  console.log(userTL.timeline);
}
async function run() {
  const rl = readline.createInterface({ input, output });

  let userName_input = await rl.question("Username: ");
  let password_input = await rl.question("Password: ");

  let existingUser = usersDatabase.find((user) => user.username === userName_input);

  if (existingUser && existingUser.password === password_input) {
    console.log("Pásale carnal");
    printTimeline(existingUser.username)
  }
  else console.warn("Usuario o contraseña incorrectos.")

  rl.close();
}

run();