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
            if(grid[r][c].start) return grid[r][c];
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
    while (cameFrom.has(current)){
        current = cameFrom.get(current);
        if(!current.start) current.path = true;
    }
}

function bfs() {
    if(!startPlaced || !endPlaced) return;
    clearPath();

    const start = getStartCell();
    const end = getEndCell();
    const queue = [start];
    const cameFrom = new Map();
    start.visited = true;

    function step(){
        if(queue.length === 0) return;

        const current = queue.shift();
        if(current === end){
            tracePath(cameFrom, end);
            drawGrid(ctx);
            return;
        }
        for(const neighbor of getNeighbors(current)){
            if(neighbor.wall || neighbor.visited) continue;
            neighbor.visited = true;
            cameFrom.set(neighbor, current);
            queue.push(neighbor);
        }
        drawGrid(ctx);
        setTimeout(step, 20);
    }
    step();
}