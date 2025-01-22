const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
let currentLine = 0;

rl.on('line', (line) => {
    inputLines.push(line);
});

rl.on('close', () => {
    const [N, M] = inputLines[currentLine++].split(' ').map(Number);
    
    // Parse trees data
    const trees = [];
    for (let i = 0; i < N; i++) {
        trees.push(inputLines[currentLine++].split(' ').map(Number));
    }
    
    // Parse poles coordinates
    const poles = [];
    for (let i = 0; i < M; i++) {
        poles.push(inputLines[currentLine++].split(' ').map(Number));
    }
    
    // Find the minimum fence length using convex hull
    const hull = findConvexHull(poles);
    const requiredFenceLength = calculatePerimeter(hull);
    
    // Calculate and output the result
    const result = findMinimumTime(trees, requiredFenceLength);
    console.log(Math.ceil(result)); // Make sure to round up the result
});

const findConvexHull = (points) => {
    if (points.length < 3) return points;
    
    const pivot = points.reduce((lowest, p) =>
        (p[1] < lowest[1] || (p[1] === lowest[1] && p[0] < lowest[0])) ? p : lowest
    );
    
    const sortedPoints = points
        .filter(p => p !== pivot)
        .sort((a, b) => {
            const angleA = Math.atan2(a[1] - pivot[1], a[0] - pivot[0]);
            const angleB = Math.atan2(b[1] - pivot[1], b[0] - pivot[0]);
            if (angleA === angleB) {
                return distanceSquared(pivot, a) - distanceSquared(pivot, b);
            }
            return angleA - angleB;
        });
    
    const hull = sortedPoints.length > 0 ? [pivot, sortedPoints[0]] : [pivot];

    for (let i = 1; i < sortedPoints.length; i++) {
        while (hull.length > 1 && !isCounterClockwise(
            hull[hull.length - 2],
            hull[hull.length - 1],
            sortedPoints[i]
        )) {
            hull.pop();
        }
        hull.push(sortedPoints[i]);
    }
    return hull;
};

const distanceSquared = (p1, p2) => {
    return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
};

const isCounterClockwise = (p1, p2, p3) => {
    return (p2[0] - p1[0]) * (p3[1] - p1[1]) - 
           (p2[1] - p1[1]) * (p3[0] - p1[0]) > 0;
};

const calculatePerimeter = (hull) => {
    let perimeter = 0;
    for (let i = 0; i < hull.length; i++) {
        const next = (i + 1) % hull.length;
        perimeter += Math.sqrt(distanceSquared(hull[i], hull[next]));
    }
    return perimeter;
};

const findMinimumTime = (trees, fenceLength) => {
    trees.sort((a, b) => (b[0]/b[1]) - (a[0]/a[1]));
    
    let totalLength = 0;
    let totalTime = 0;
    
    for (let i = 0; i < trees.length && totalLength < fenceLength; i++) {
        const [boards, time] = trees[i];
        totalLength += boards;
        totalTime += time;
    }
    
    if (totalLength < fenceLength) {
        return -1; // Impossible to build the fence
    }
    
    return totalTime;
};