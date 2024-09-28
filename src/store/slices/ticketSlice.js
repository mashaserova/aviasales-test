import { createSlice } from '@reduxjs/toolkit';
import { getSearchId, fetchTickets } from '../../servers/api';
import { v4 as idGenerator } from 'uuid';
import { setError } from './errorSlice';

const initialState = {
    tickets: [],
    searchId: null,
    isLoading: false,
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
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setTickets, setIsLoading } = ticketSlice.actions;

export const fetchAllTickets = () => async (dispatch, getState) => {
    try {
        let searchId = getState().tickets.searchId;
        if (!searchId) {
            searchId = await getSearchId();
            if (!searchId) return;
        }
        let stop = false;
        while (!stop) {
            const data = await fetchTickets(searchId);
            if (data.error) {
                dispatch(setError(data.error));
                break;
            }
            dispatch(setTickets({ tickets: data.tickets, searchId }));
            stop = data.stop;
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export default ticketSlice.reducer;
