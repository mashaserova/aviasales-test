import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    all: true,
    none: true,
    one: true,
    two: true,
    three: true,
    sortBy: null, //нет сортировки
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleAll: (state) => {
            state.all = !state.all;
            state.none = state.all;
            state.one = state.all;
            state.two = state.all;
            state.three = state.all;
        },
        toggleFilter: (state, action) => {
            //action.payload -> имя фильтра
            state[action.payload] = !state[action.payload];
            if (state.all && !state[action.payload]) {
                state.all = false;
            }
            if (
                !state.all &&
                state.none &&
                state.one &&
                state.two &&
                state.three
            ) {
                state.all = true;
            }
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload; //action.payload -> cheapest/fastest/optimal
        },
    },
});

export const { toggleAll, toggleFilter, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;
