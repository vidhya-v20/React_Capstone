const fs = require('fs');
const path = require('path');


fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    
    let jsonData;
    try {
  
        jsonData = JSON.parse(data);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return;
    }
    

    const modifiedData = jsonData.map(obj => ({
        ...obj,
        updatedAt: new Date().toISOString()
    }));
    
    writeToFile(modifiedData);
});

function writeToFile(data) {
    const filePath = path.join(__dirname, 'modifiedData.json');
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Modification successful. Updated data written to modifiedData.json');
    });
}
