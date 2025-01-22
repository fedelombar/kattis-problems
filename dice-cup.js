function findMostLikelyOutcomes(faces1, faces2) {
    const frequency = new Map();
    const totalOutcomes = faces1 * faces2;
    
    for (let i = 1; i <= faces1; i++) {
        for (let j = 1; j <= faces2; j++) {
            const sum = i + j;
            frequency.set(sum, (frequency.get(sum) || 0) + 1);
        }
    }
    
    let maxFrequency = 0;
    for (const freq of frequency.values()) {
        maxFrequency = Math.max(maxFrequency, freq);
    }
    
    const mostLikelyOutcomes = [];
    for (const [sum, freq] of frequency) {
        if (freq === maxFrequency) {
            mostLikelyOutcomes.push(sum);
        }
    }
    
    // ascending order
    mostLikelyOutcomes.sort((a, b) => a - b);
    
    // print each outcome on a new line
    mostLikelyOutcomes.forEach(outcome => {
        console.log(outcome);
    });
}

// read input from stdin 
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const [faces1, faces2] = line.trim().split(' ').map(Number);
    
    // input validation
    if (!faces1 || !faces2 || faces1 < 1 || faces2 < 1) {
        console.error('Please provide two positive integers as arguments');
        process.exit(1);
    }

    findMostLikelyOutcomes(faces1, faces2);
    rl.close();
});
