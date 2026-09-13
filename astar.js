function heuistic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function astar(onDone){
    if(!startPlaced || !endPlaced) return;

    clearPath();
    const start = getStartCell();
    const end = getEndCell();
    const gScore = new Map();
    const fScore = new Map();
    const cameFrom = new Map();
    const visited = new Set();

    for (let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            gScore.set(grid[r][c], Infinity);
            fScore.set(grid[r][c], Infinity);
        }
    }
    gScore.set(start, 0);
    fScore.set(start, heuistic(start, end));

    const queue = [start];
    const startTime = performance.now();
    let visitedCount = 0;

    function step(){
        if(queue.length === 0) return;
        // let lowestIndex = 0;
        // for(let i = 1; i < queue.length; i++){
        //     if(fScore.get(queue[i]) < fScore.get(queue[lowestIndex])) lowestIndex = i;
        // }
        // const current = queue.splice(lowestIndex, 1)[0];
        const current = extractLowest(queue, fScore);

        if(current === end){
            const pathLength = tracePath(cameFrom, end);
            //tracePath(cameFrom, end);
            drawGrid(ctx);
            const time = performance.now() - startTime;
            if(onDone) onDone({ visited: visitedCount, pathLength, time });
            return;
        }
        visited.add(current);
        current.visited = true;
        visitedCount++;

        for(const neighbor of getNeighbors(current)){
            if(neighbor.wall || visited.has(neighbor)) continue;

            const tentativeG = gScore.get(current) + neighbor.weight;
            if(tentativeG < gScore.get(neighbor)){
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeG);
                fScore.set(neighbor, tentativeG + heuristic(neighbor, end));
                if(!queue.includes(neighbor)) queue.push(neighbor);
            }
        }
        drawGrid(ctx);
        setTimeout(step, speed);
    }
    step();
}
