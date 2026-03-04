export class Person {
  constructor(name, lastName, age, location) {
    this.age = age;
    this.name = name;
    this.lastName = lastName;
    this.location = location;
  }

  greet() {
    console.log(`Hi! My name is ${this.name} ${this.lastName}`)
  }
}

const persona1 = new Person("Brandon", "Diaz", 30, "Mexico")
persona1.greet();