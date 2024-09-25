import { createSlice } from '@reduxjs/toolkit';
import { getSearchId, fetchTickets } from '../../servers/api';
import { v4 as idGenerator } from 'uuid';

const initialState = {
    tickets: [],
    searchId: null,
};

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            const ticketsWithIds = action.payload.tickets.map((ticket) => ({
                ...ticket,
                id: idGenerator(),
            }));
            state.tickets = [...state.tickets, ...ticketsWithIds];
            state.searchId = action.payload.searchId;
            console.log('тикеты:', state.tickets);
            console.log('айдишка:', state.searchId);
        },
    },
});

export const { setTickets } = ticketSlice.actions;

export const fetchAllTickets = () => async (dispatch, getState) => {
    let searchId = getState().tickets.searchId;
    if (!searchId) {
        searchId = await getSearchId();
        if (!searchId) return;
    }
    let stop = false;
    while (!stop) {
        const data = await fetchTickets(searchId);
        dispatch(setTickets({ tickets: data.tickets, searchId }));
        stop = data.stop;
    }
};

export default ticketSlice.reducer;
