const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

createGrid();
drawGrid(ctx);

let startPlaced = false;
let endPlaced = false;
let mouseDown = false

function getCell(e){
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if(row < 0 || row >= rows || col < 0 || col >= cols) return null;
    return grid[row][col];
}

function handleCellClick(cell){
    if(!cell) return;

    if(!startPlaced){
        cell.start = true;
        startPlaced = true;
    } else if(!endPlaced && !cell.start){
        cell.end = true;
        endPlaced = true;
    } else if (!cell.start && !cell.end){
        cell.wall = !cell.wall;
    }
    drawGrid(ctx);
}

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    handleCellClick(getCell(e));
});
canvas.addEventListener("mousemove", (e) => {
    if(!mouseDown) return;
    //not start and end
    if(startPlaced && endPlaced){
        const cell = getCell(e);
        if(cell && !cell.start && !cell.end){
            cell.wall = true;
            drawGrid(ctx);
        }
    }
});
canvas.addEventListener("mouseup", () => {
    mouseDown = false;
})