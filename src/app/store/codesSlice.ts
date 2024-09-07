import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CodeState } from "../utilities/interfaces";

const initialState: CodeState = {
  codes: ["", "", "", "", "", ""],
  colors: [
    [
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
    ],
    [
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
    ],
    [
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
    ],
    [
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
    ],
    [
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
    ],
    [
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
      "bg-emptyCircle bg-opacity-30",
    ],
  ],
  shakers: [false, false, false, false, false, false],
  currentRow: 0,
  animation: false,
  gameOver: false,
};

const codeSlice = createSlice({
  name: "codes",
  initialState,
  reducers: {
    setCodes(state, action: PayloadAction<{ index: number; code: string }>) {
      const { index, code } = action.payload;
      state.codes[index] = code;
    },
    setColors(
      state,
      action: PayloadAction<{ index: number; colors: string[] }>
    ) {
      const { index, colors } = action.payload;
      state.colors[index] = colors;
    },
    setShakers(
      state,
      action: PayloadAction<{ index: number; shakeStatus: boolean }>
    ) {
      const { index, shakeStatus } = action.payload;
      state.shakers[index] = shakeStatus;
    },
    setCurrentRow(state, action: PayloadAction<number>) {
      state.currentRow = action.payload;
    },
    setAnimation(state, action: PayloadAction<boolean>) {
      state.animation = action.payload;
    },
    setGameOver(state, action: PayloadAction<boolean>) {
      state.gameOver = action.payload;
    },
  },
});

export const {
  setCodes,
  setColors,
  setShakers,
  setCurrentRow,
  setAnimation,
  setGameOver,
} = codeSlice.actions;
export default codeSlice.reducer;
