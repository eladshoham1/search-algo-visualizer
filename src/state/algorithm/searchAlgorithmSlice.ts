import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import BreadthFirstSearch from "../../algorithms/BreadthFirstSearch";
import SearchAlgorithm from "../../algorithms/SearchAlgorithm";

interface SearchAlgorithmState {
  value: SearchAlgorithm;
}

const initialState: SearchAlgorithmState = {
  value: new BreadthFirstSearch(),
};

const searchAlgorithmSlice = createSlice({
  name: "searchAlgorithm",
  initialState,
  reducers: {
    setSearchAlgorithm: (state, action: PayloadAction<SearchAlgorithm>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchAlgorithm } = searchAlgorithmSlice.actions;

export default searchAlgorithmSlice.reducer;
