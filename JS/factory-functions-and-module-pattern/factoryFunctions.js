// en el ejemplo es personFactory
function Person(name) {
    const sayName = () => (console.log(`Hello, I'm ${name}!`));
    return { name, sayName }
}

// Person.prototype.sayName = function() {
//     console.log(`Hello, I'm ${this.name}!`)
// }

const jeff = Person("Jeff");

jeff.sayName();