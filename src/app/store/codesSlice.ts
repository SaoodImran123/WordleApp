import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CodeState {
  codes: string[];
  colors: string[][];
  shakers: boolean[]
}

const initialState: CodeState = {
  codes: ["", "", "", "", "", ""],
  colors: [["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],],
  shakers: [false, false, false, false, false, false]
};

const codeSlice = createSlice({
  name: 'codes',
  initialState,
  reducers: {
    setCodes(state, action: PayloadAction<{index: number, code: string}>) {
       const {index, code }= action.payload;
       state.codes[index] = code
    },
    setColors(state, action: PayloadAction<{index: number, colors: string[]}>) {
        const {index, colors } = action.payload
        state.colors[index] = colors
      },
      setShakers(state, action: PayloadAction<{index: number, shakeStatus: boolean}>) {
        const {index, shakeStatus } = action.payload
        state.shakers[index] = shakeStatus
      },
  },
});

export const { setCodes, setColors, setShakers } = codeSlice.actions;
export default codeSlice.reducer;
