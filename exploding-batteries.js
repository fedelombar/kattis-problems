    
function solve() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (line) => {
        const n = parseInt(line);

        if (n === 0) {
            rl.close();
            return;
        }
        
        if (n === 1) {
            console.log(0);
            return;
        }
        
        const target = n - 1;
        let x = 0;
        while (x * (x + 1) / 2 < target) {
            x++;
        }
        
        console.log(x);
    });
}

solve();
