# Pathfinding Visualizer
A grid-based maze generator + pathfinding visualizer build with plian JS and canvas. no framework and no libraries etc.

**AI Declaration** — the ai coding time showing on hackatime is false. it was caused by the claude code desktop app running in the background, and hackatime somehow counted that as coding time. idk why hackatime is doing this now.

## Screenshot and demo video
<img width="806" height="695" alt="Screenshot 2026-09-13 at 11 09 09 PM" src="https://github.com/user-attachments/assets/6a566b25-1923-4a7b-b4b6-ba80bccc739f" />

<img width="792" height="660" alt="Screenshot 2026-09-13 at 11 09 35 PM" src="https://github.com/user-attachments/assets/5d08116d-2e2f-48ef-ae45-96fd68a9aaa2" />

<img width="822" height="745" alt="Screenshot 2026-09-13 at 11 09 50 PM" src="https://github.com/user-attachments/assets/174884ae-10b6-4fad-8d01-cedb1d902394" />

<img width="802" height="576" alt="Screenshot 2026-09-13 at 11 10 14 PM" src="https://github.com/user-attachments/assets/c0d3000b-e8f2-4aa8-b56a-5ea6dd0e2f73" />

<img width="806" height="699" alt="Screenshot 2026-09-13 at 11 10 35 PM" src="https://github.com/user-attachments/assets/00a9cb38-e468-4d27-8db6-826a495be859" />

<img width="807" height="755" alt="Screenshot 2026-09-13 at 11 11 20 PM" src="https://github.com/user-attachments/assets/d905b215-a389-4990-91c2-472c364a1a8a" />

<img width="805" height="687" alt="Screenshot 2026-09-13 at 11 11 49 PM" src="https://github.com/user-attachments/assets/ff039412-a8b4-4bc6-96bd-db7b3c381dbe" />

<img width="796" height="697" alt="Screenshot 2026-09-13 at 11 12 18 PM" src="https://github.com/user-attachments/assets/0a8877dc-0c2c-48f6-b8db-820701f17e3c" />

<img width="800" height="754" alt="Screenshot 2026-09-13 at 11 12 37 PM" src="https://github.com/user-attachments/assets/5948cbf9-4783-4847-881e-217bf8ca2fc3" />

https://github.com/user-attachments/assets/55970c85-c436-4ec1-acf9-85e493e568cb

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
