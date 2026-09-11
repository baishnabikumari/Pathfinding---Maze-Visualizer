function extractLowest(queue, scoreMap){
    let lowestIndex = 0;
    for(let i = 1; i < queue.length; i++){
        if(scoreMap.get(queue[i]) < scoreMap.get(queue[lowestIndex])) lowestIndex = i;
    }
    return queue.splice(lowestIndex, 1)[0];
}