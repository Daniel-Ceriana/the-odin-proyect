const calculator = (() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
        add,
        sub,
        mul,
        div,
    };
})();

calculator.add(3, 5); // 8
calculator.sub(6, 2); // 4
calculator.mul(14, 5534); // 77476

console.log(calculator.add(3, 5))
console.log(calculator.sub(6, 2))
console.log(calculator.mul(14, 5534))