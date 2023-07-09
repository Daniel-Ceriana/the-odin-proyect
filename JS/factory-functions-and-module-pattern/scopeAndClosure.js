//scope
let a = 17;

const func = x => {
    a = x;
};

func(99);

console.log(a);


//closure
const counterCreator = () => {
    let count = 0;
    return () => {
        console.log(count);
        count++;
    };
};

const counter = counterCreator();

counter();
counter();
counter();
counter();




//Inheritance with factories

const Person = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return { sayName };
}

const Nerd = (name) => {
    const { sayName } = Person(name);
    const doSomethingNerdy = () => console.log('nerd stuff1');
    return { sayName, doSomethingNerdy };
}

const jeff = Nerd('jeff');

jeff.sayName();
jeff.doSomethingNerdy();


//lo mismo pero de otra forma

const Nerd1 = (name) => {
    const prototype = Person(name);
    const doSomethingNerdy = () => console.log('nerd stuffssdfsd');
    return Object.assign({}, prototype, { doSomethingNerdy });
}
const jeff1 = Nerd1('jeff1');
jeff1.sayName();
jeff1.doSomethingNerdy();


const obj = { a: 1 };
const copy = Object.assign({}, obj);
const copy1 = obj;
console.log(copy); // { a: 1 }
console.log(copy1); // { a: 1 }