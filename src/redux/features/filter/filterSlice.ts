import { createSlice } from "@reduxjs/toolkit";

interface IFilterState {
  searchText: string;
  path: string | null;
}

const initialState: IFilterState = {
  searchText: "",
  path: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searched: (state, action) => {
      state.searchText = action.payload;
    },
    changedPath: (state, action) => {
      state.path = action.payload;
    },
    pathChange: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { searched, changedPath ,pathChange} = filterSlice.actions;
export default filterSlice.reducer;
