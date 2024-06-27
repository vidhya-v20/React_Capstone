const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    
  
    const convertedData = data.toUpperCase();
    

    writeToFile(convertedData);
});

function writeToFile(data) {
    fs.writeFile('output.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Conversion successful. Output written to output.txt');
    });
}
