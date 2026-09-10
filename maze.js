function resetMaze(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            grid[r][c].wall = true;
            grid[r][c].start = false;
            grid[r][c].end = false;
            grid[r][c].visited = false;
            grid[r][c].path = false;
        }
    }
    startPlaced = false;
    endPlaced = false;
}

function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function carve(r,c){
    grid[r][c].wall = false;

    const dirs = shuffle([
        [-2,0],
        [2,0],
        [0,-2],
        [0,2]
    ]);
    for (const [dr,dc] of dirs){
        const nr = r + dr;
        const nc = c + dc;

        if (nr < 1 || nr >= rows - 1 || nc < 1 || nc >= cols - 1) continue;
        if(!grid[nr][nc].wall) continue;

        grid[r + dr / 2][c + dc / 2].wall = false;
        carve(nr, nc);
    }
}

function generateMaze(){
    resetMaze();
    carve(1,1);

    grid[1][1].start = true;
    grid[rows - 2][cols - 2].end = true;
    startPlaced = true;
    endPlaced = true;

    drawGrid(ctx);
}