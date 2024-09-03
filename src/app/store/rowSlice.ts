import { createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';


interface ActiveRowState {
    currentRow: number;
}
const initialState: ActiveRowState = {
    currentRow: 0
};

const activeRowSlice = createSlice({
    name: 'activeRow',
    initialState,
    reducers: {
      setActiveRow(state, action: PayloadAction<number>) {
        state.currentRow = action.payload;
      },
    },
  });
  
  export const { setActiveRow } = activeRowSlice.actions;
  export default activeRowSlice.reducer;