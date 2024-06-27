

function logMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    console.log('Memory Usage:');
    console.log(`  - RSS: ${formatBytes(memoryUsage.rss)}`);
    console.log(`  - Heap Total: ${formatBytes(memoryUsage.heapTotal)}`);
    console.log(`  - Heap Used: ${formatBytes(memoryUsage.heapUsed)}`);
    console.log(`  - External: ${formatBytes(memoryUsage.external)}`);
    console.log('\n');
}

function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

setInterval(logMemoryUsage, 5000);

console.log('Node.js version:', process.version);
console.log('Operating system:', process.platform);
console.log('Process ID:', process.pid);

logMemoryUsage();