import { createSlice } from "@reduxjs/toolkit";

export const VisibilityFilters = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETED: "SHOW_COMPLETED",
    SHOW_ACTIVE: "SHOW_ACTIVE",
};

const filtersSlice = createSlice({
    name: "visibilityFilter",
    initialState: VisibilityFilters.SHOW_ALL,
    reducers: {
        setVisibilityFilter: (state, action) => {
            return action.payload || VisibilityFilters.SHOW_ALL;
        },
    },
});

export const { setVisibilityFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
