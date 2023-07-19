const { Triangle, Circle, Square } = require('./shapes.js');

test('Triangle render method should return the correct SVG string', () => {
    const triangle = new Triangle();
    triangle.setColor("blue");
    expect(triangle.render()).toEqual('<polygon points="150,50 250,150 50,150" fill="blue" />');
});

test('Circle render method should return the correct SVG string', () => {
    const circle = new Circle();
    circle.setColor("red");
    expect(circle.render()).toEqual('<circle cx="150" cy="100" r="50" fill="red" />');
});

test('Square render method should return the correct SVG string', () => {
    const square = new Square();
    square.setColor("green");
    expect(square.render()).toEqual('<rect x="100" y="50" width="100" height="100" fill="green" />');
});
