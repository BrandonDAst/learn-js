function checkType(value) {
  console.log(value)
  console.log(typeof value)
}


// Explicita
const integer = parseInt("42")
checkType(integer)

const decimal = parseFloat("3.14")
checkType(decimal)

const binaryToDec = parseInt("1010", 2)
checkType(binaryToDec)