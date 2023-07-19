const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes.js');

const shapes = {
    'Triangle': Triangle,
    'Circle': Circle,
    'Square': Square
};

// prompt user for input
inquirer.prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for your logo text: ',
        validate: function(value) {
            if (value.length <= 3) {
              return true;
            }
            return 'Please enter up to three characters';
        },
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color for your text (keyword or hex value): ',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for your logo (circle, triangle, square): ',
        choices: ['Triangle', 'Circle', 'Square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a color for your shape (keyword or hex value): ',
    }
])
.then(answers => {
    // create SVG start tag
    let svgStartTag = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">';

    // create logo shape
    const Shape = shapes[answers.shape];
    const shape = new Shape(answers.shapeColor);
    let shapeSVG = shape.render();

    // create logo text
    let textSVG = `<text x="150" y="150" font-family="Verdana" font-size="35" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
    
    // create SVG end tag
    let svgEndTag = '</svg>';

    // generate SVG string
    let svgString = svgStartTag + shapeSVG + textSVG + svgEndTag;

    // create SVG file
    fs.writeFile('logo.svg', svgString, (err) => {
        if (err) throw err;
        console.log('Generated logo.svg');
    });
})
.catch(error => {
    if(error.isTtyError) {
        console.log('Prompt couldn\'t be rendered in the current environment');
    } else {
        console.log('Something else went wrong');
    }
});
