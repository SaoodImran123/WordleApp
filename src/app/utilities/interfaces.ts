//subgrid interface to track subgrids personal ID
export interface SubGridProps {
  rowIndex: number;
}
//interface for redux state
export interface CodeState {
  //tracks users entered responses
  codes: string[];
  //maintains color of each tile
  colors: string[][];
  //maintains shake status of each subgrid row
  shakers: boolean[];
  //tracks currently active row
  currentRow: number;
  //tracks if scroll in animation has played
  animation: boolean;
  //tracks if the game is finished
  gameOver: boolean;
}
