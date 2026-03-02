let object = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
  key4: "value4",
}

// for (key, value in object) {
//   console.log(key)
//   console.log(value)
// }
for (key in object) {
  console.log(`Llave: ${key} - Valor: ${object[key]}`)
}