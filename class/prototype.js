class Animal {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  makeSound() {
    console.log("Making sound...")
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Dog")
    this.breed = breed;
  }

  makeSound() {
    console.log("Whoof whoof!!")
  }
  run() {
    console.log(`${this.name} is running!`)
  }
}

const husky = new Dog("Jyn", "husky")
husky.makeSound();
husky.run();
// Adding Walk method only to husky instance
husky.walk = function () { console.log(`${this.name} is walking!`) }
husky.walk();

//Adding Jump method to Dog prototype, so other instances can access it
Dog.prototype.jump = function () { console.log(`${this.name} is jumping!`) }
husky.jump();

const labrador = new Dog("Max", "labrador")
labrador.makeSound();
labrador.run();
// labrador.walk(); // Labrador instance does not contains walk method
labrador.jump();


/////
let huskyProto = Object.getPrototypeOf(husky);
console.log("Protype of Husky: ", huskyProto)

let labProto = Object.getPrototypeOf(labrador);
console.log("Protype of Labrador: ", labProto)

let currentProto = Object.getPrototypeOf(husky)
for (; currentProto !== null; currentProto = Object.getPrototypeOf(currentProto)) {
  console.log(currentProto)
}