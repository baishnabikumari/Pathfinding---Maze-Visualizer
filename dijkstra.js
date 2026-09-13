function dijkstra(onDone){
    if(!startPlaced || !endPlaced) return;
    clearPath();

    const start = getStartCell();
    const end = getEndCell();

    const dist = new Map();
    const cameFrom = new Map();
    const visited = new Set();

    for (let r = 0; r < rows; r++){
        for(let c = 0; r < cols; c++){
            dist.set(grid[r][c], Infinity);
        }
    }
    dist.set(start, 0);
    const queue = [start];
    const startTime = performance.now();
    let visitedCount = 0;

    function step(){
        if(queue.length === 0) return;
        // let lowestIndex = 0;
        // for(let i = 1; i < queue.length; i++){
        //     if(dist.get(queue[i]) < dist.get(queue[lowestIndex])) lowestIndex = i;
        // }
        // const current = queue.splice(lowestIndex, 1)[0];
        const current = extractLowest(queue, dist);

        if(visited.has(current)){
            setTimeout(step, 0);
            return;
        }
        visited.add(current);
        current.visited = true;
        visitedCount++;

        if(current === end){
            const pathLength = tracePath(cameFrom, end);
            //tracePath(cameFrom, end);
            drawGrid(ctx);
            const time = performance.now() - startTime;
            if(onDone) onDone({ visited: visitedCount, pathLength, time });
            return;
        }
        for(const neighbor of getNeighbors(current)){
            if(neighbor.wall || visited.has(neighbor)) continue;
            const newDist = dist.get(current) + neighbor.weight;
            if(newDist < dist.get(neighbor)){
                dist.set(neighbor, newDist);
                cameFrom.set(neighbor, current);
                if(!queue.push(neighbor)) queue.push(neighbor);
            }
        }
        drawGrid(ctx);
        setTimeout(step, speed);
    }
    step();
}