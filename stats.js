function addStatsRow(name, visited, pathLength, time){
    const tbody = document.getElementById("statsBody");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${visited}</td><td>${pathLength}</td><td>${time.toFixed(1)}</td>`;
    tbody.appendChild(row);
}

function clearStats(){
    document.getElementById("statsBody").innerHTML = "";
}