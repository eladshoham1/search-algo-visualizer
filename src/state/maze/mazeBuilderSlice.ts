import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import MazeBuilder from "../../maze/MazeBuilder";
import MazeFactory from "../../maze/MazeFactory";

// Define the state interface
interface MazeBuilderState {
  value: MazeBuilder;
  disableButtons: boolean;
}

// Create a single instance of MazeFactory to avoid multiple calls
const mazeFactoryInstance = MazeFactory.getInstance();

// Define the initial state
const initialState: MazeBuilderState = {
  value: mazeFactoryInstance.createMaze("Simple"),
  disableButtons: false,
};

// Create the slice
const mazeBuilderSlice = createSlice({
  name: "mazeBuilder",
  initialState,
  reducers: {
    setMazeBuilder: (state, action: PayloadAction<string>) => {
      state.value = mazeFactoryInstance.createMaze(action.payload);
    },
    setDisableButtons: (state, action: PayloadAction<boolean>) => {
      state.disableButtons = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setMazeBuilder, setDisableButtons } = mazeBuilderSlice.actions;
export default mazeBuilderSlice.reducer;
