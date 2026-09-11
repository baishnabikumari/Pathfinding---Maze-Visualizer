function resetMaze(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            grid[r][c].wall = true;
            grid[r][c].start = false;
            grid[r][c].end = false;
            grid[r][c].visited = false;
            grid[r][c].path = false;
            grid[r][c].weight = 1;
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

function backtrackerMaze(){
    resetMaze();
    carve(1,1);

    grid[1][1].start = true;
    grid[rows - 2][cols - 2].end = true;
    startPlaced = true;
    endPlaced = true;

    drawGrid(ctx);
}

function primMaze(){
    resetMaze();
    const frontier = [];

    function addFrontier(r, c){
        if(r < 1 || r >= rows - 1 || c < 1 || c >= cols - 1) return;
        if(!grid[r][c].wall) return;
        if(!frontier.includes(grid[r][c])) frontier.push(grid[r][c]);
    }
    grid[1][c].wall = false;
    addFrontier(1, 3);
    addFrontier(3, 1);

    while(frontier.length > 0){
        const idx = Math.floor(Math.random() * frontier.length);
        const cell = frontier.splice(idx, 1)[0];
        const options = [
            [cell.row - 2, cell.col],
            [cell.row + 2, cell.col],
            [cell.row, cell.col - 2],
            [cell.row, cell.col + 2]
        ].filter(([r, c]) => r >= 1 && r < rows - 1 && c >= 1 && c < cols - 1 && !grid[r][c].wall);

        if (options.length === 0) continue;
        
        const [nr, nc] = options[Math.floor(Math.random() * options.length)];
        cell.wall = false;
        grid[(cell.row + nr) / 2][(cell.col + nc) / 2].wall = false;

        addFrontier(cell.row - 2, cell.col);
        addFrontier(cell.row + 2, cell.col);
        addFrontier(cell.row, cell.col - 2);
        addFrontier(cell.row, cell.col + 2);
    }
    grid[1][1].start = true;
    grid[rows - 2][cols - 2].end = true;
    startPlaced = true;
    endPlaced = true;
    drawGrid(ctx);
}
function generateMaze(){
    const algo = document.getElementById("mazeSelect").value;
    if(algo === "prim") primMaze();
    else backtrackerMaze();
}