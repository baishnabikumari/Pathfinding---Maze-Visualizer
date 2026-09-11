const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let speed = 20;
const algoMap = { bfs, dijkstra, astar };

const runBtn = document.getElementById("runBtn");
runBtn.addEventListener("click", () => {
    const algo = document.getElementById("algoSelect").value;
    clearStats();
    algoMap[algo]((result) => {
        const label = algo === "astar" ? "A*" : algo[0].toUpperCase() + algo.slice(1);
        addStatsRow(label, result.visited, result.pathLength, result.time);
    });
});

const raceBtn = document.getElementById("raceBtn");
raceBtn.addEventListener("click", runRace);

function runRace(){
    clearStats();
    const order = [
        ["BES", bfs],
        ["Dijkstra", dijkstra],
        ["A*", astar]
    ];

    function runNext(i){
        if(i >= order.length) return;
        const [name, fn] = order[i];
        clearPath();
        drawGrid(ctx);
        fn((result) => {
            addStatsRow(name, result.visited, result.pathLength, result.time);
            runNext(i + 1);
        });
    }
    runNext(0);
}

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
    clearPath();
    drawGrid(ctx);
});

const speedSlider = document.getElementById("speedSlider");
speedSlider.addEventListener("input", (e) => {
    speed = Number(e.target.value);
});

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

createGrid();
drawGrid(ctx);

let startPlaced = false;
let endPlaced = false;
let mouseDown = false;

function getCell(e){
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if(row < 0 || row >= rows || col < 0 || col >= cols) return null;
    return grid[row][col];
}

function handleCellClick(cell, isShift){
    if(!cell) return;

    if(!startPlaced){
        cell.start = true;
        startPlaced = true;
    } else if(!endPlaced && !cell.start){
        cell.end = true;
        endPlaced = true;
    } else if (!cell.start && !cell.end){
        if(isShift){
            cell.weight = cell.weight > 1 ? 1 : 5;
        } else{
            cell.wall = !cell.wall;
        }
    }
    drawGrid(ctx);
}

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    handleCellClick(getCell(e), e.shiftKey);
});
canvas.addEventListener("mousemove", (e) => {
    if(!mouseDown) return;
    //not start and end
    if(startPlaced && endPlaced){
        const cell = getCell(e);
        if(cell && !cell.start && !cell.end){
            if(e.shiftKey) cell.weight = 5;
            else cell.wall = true;
            drawGrid(ctx);
        }
    }
});
canvas.addEventListener("mouseup", () => {
    mouseDown = false;
})