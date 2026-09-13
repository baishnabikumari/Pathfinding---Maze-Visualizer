function clearPath(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            grid[r][c].visited = false;
            grid[r][c].path = false;
        }
    }
}

function getStartCell(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(grid[r][c].start) return grid[r][c];
        }
    }
}

function getEndCell(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(grid[r][c].end) return grid[r][c];
        }
    }
}

function getNeighbors(cell){
    const neighbors = [];
    const { row, col } = cell;

    if(row > 0) neighbors.push(grid[row - 1][col]);
    if(row < rows - 1) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col - 1]);
    if(col < cols - 1) neighbors.push(grid[row][col + 1]);

    return neighbors;
}

function tracePath(cameFrom, endCell){
    let current = endCell;
    let count = 0;
    while (cameFrom.has(current)){
        current = cameFrom.get(current);
        if(!current.start){
            current.path = true;
            count++;
        }
    }
    return count;
}

function bfs(onDone) {
    if(!startPlaced || !endPlaced) return;
    clearPath();

    const start = getStartCell();
    const end = getEndCell();
    const queue = [start];
    const cameFrom = new Map();
    start.visited = true;
    const startTime = performance.now();
    let visitedCount = 1;

    // let stepCount = 0;
    function step(){
        if(queue.length === 0) return;
        // if(++stepCount > 3000){
        //     console.warn("bfs exceeded 3000 steps");
        //     return;
        // }

        const current = queue.shift();
        if(current === end){
            const pathLength = tracePath(cameFrom,end);
            //tracePath(cameFrom, end);
            drawGrid(ctx);
            const time = performance.now() - startTime;
            if (onDone) onDone({ visited: visitedCount, pathLength, time });
            return;
        }
        for(const neighbor of getNeighbors(current)){
            if(neighbor.wall || neighbor.visited) continue;
            neighbor.visited = true;
            visitedCount++;
            cameFrom.set(neighbor, current);
            queue.push(neighbor);
        }
        drawGrid(ctx);
        setTimeout(step, speed);
    }
    step();
}