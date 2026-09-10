const rows = 15;
const cols = 25;
const cellSize = 30;

let grid = [];

function createGrid(){
    for(let r = 0; r < rows; r++){
        let row = [];
        for (let c = 0; c < cols; c++){
            row.push({
                row: r,
                col: c,
                wall: false,
                start: false,
                end: false,
                visited: false,
                path: false
            });
        }
        grid.push(row);
    }
}

function drawGrid(ctx){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            const cell = grid[r][c];
            const x = c * cellSize;
            const y = r * cellSize;

            if(cell.start) ctx.fillStyle = "#4caf50";
            else if(cell.end) ctx.fillStyle = "#f44336";
            else if(cell.wall) ctx.fillStyle = "#222";
            else if(cell.path) ctx.fillStyle = "#ffeb3b";
            else if(cell.visited) ctx.fillStyle = "#3a5f77";
            else ctx.fillStyle = "#2c2c2c";

            ctx.fillRect(x, y, cellSize, cellSize);
            ctx.strokeStyle = "#444";
            ctx.strokeRect(x, y, cellSize, cellSize);
        }
    }
}