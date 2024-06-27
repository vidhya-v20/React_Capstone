// Display the contents of process.argv
console.log(process.argv)

// Extract arguments if any
const args = process.argv.slice(2) // Ignore the first two elements
console.log('Arguments:', args.join(' '))