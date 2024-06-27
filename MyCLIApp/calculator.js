
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return num1 / num2;
}       

function main() {
  
    const args = process.argv.slice(2); 
  
    if (args.length !== 3) {
        console.error('Usage: node calculator.js <operation> <num1> <num2>');
        return;
    }

    const operation = args[0];
    const num1 = parseFloat(args[1]);
    const num2 = parseFloat(args[2]);


    if (isNaN(num1) || isNaN(num2)) {
        console.error('Invalid numbers provided');
        return;
    }

    let result;

    switch (operation) {
        case 'add':
            result = add(num1, num2);
            break;
        case 'subtract':
            result = subtract(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'divide':
            try {
                result = divide(num1, num2);
            } catch (error) {
                console.error(error.message);
                return;
            }
            break;
        default:
            console.error('Unsupported operation. Supported operations: add, subtract, multiply, divide');
            return;
    }


    console.log(`Result of ${operation} ${num1} and ${num2} is: ${result}`);
}


main();
