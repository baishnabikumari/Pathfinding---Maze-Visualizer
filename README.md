# Pathfinding Visualizer
A grid-based maze generator + pathfinding visualizer build with plian JS and canvas. no framework and no libraries etc.

## Screenshot and demo video


## Features
- Maze generation: recursive backtracker and the randomized prim's.
- Pathfinding: BFS, Dijkstra and A*
- Weighted terrain(shift+click to place mud tiles, cost is 5)
- Spped slider for the animation
- Race mode - runs all the three algo back to back and campares nodes / path length / time
- Step safety cap on each algo(bails out past 3000 steps) to prevent a runway loop from freezzing the tab.

## Controls
- Click once to place ths start node, click it again for the end node
- Click/drag on empty cells to toggle walls
- Shift+click/drag to toggle weighted mud tiles
- pick a maze algo from the dropdown and hit generate maze
- pick a pathfinding algo and hit run, or hit the race all button to campare all the three

## Running it
Just open index.html in a browser, no build step needed.

## file structure

## important notes
- dijkstra and A* both use a plain array scan to the lowest-score node instead of the real priority of queue/heap - fine for the 15x25 grid.
- Both dedupe queue entries before pushing to avoid the same cell getting queued multiple times.