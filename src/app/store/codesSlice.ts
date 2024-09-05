import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CodeState {
  codes: string[];
  colors: string[][]
}

const initialState: CodeState = {
  codes: ["", "", "", "", "", ""],
  colors: [["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],
  ["bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30","bg-emptyCircle bg-opacity-30"],]
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
  },
});

export const { setCodes, setColors } = codeSlice.actions;
export default codeSlice.reducer;
