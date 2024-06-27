process.stdout.write('What is your name? ')

process.stdin.on('data', (data) => {
  const name = data.toString().trim()
  process.stdout.write(`Hello ${name}!
`)
  process.exit()
})