import { createSlice } from '@reduxjs/toolkit';
import { getSearchId, fetchTickets } from '../../servers/api';
import { v4 as idGenerator } from 'uuid';
import { clearError, setError } from './errorSlice';

const initialState = {
    tickets: [],
    searchId: null,
    isLoading: false,
    error: null,
};

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            const ticketsWithIds = action.payload.tickets.map((ticket) => ({
                ...ticket,
                id: `${ticket.segments[0].date}${ticket.segments[1].date}`,
            }));
            state.tickets = [...state.tickets, ...ticketsWithIds];
            state.searchId = action.payload.searchId;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        addTickets: (state, action) => {
            const ticketsWithIds = action.payload.map((ticket) => ({
                ...ticket,
                id: idGenerator(),
            }));
            state.tickets = state.tickets.concat(ticketsWithIds);
        },
    },
});

export const { setTickets, setIsLoading, addTickets } = ticketSlice.actions;

export const fetchAllTickets = () => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));
        let searchId = getState().tickets.searchId;
        if (!searchId) {
            searchId = await getSearchId();
            if (!searchId) {
                dispatch(setError('Не удалось получить searchId'));
                return;
            }
        }

        let stop = false;
        while (!stop) {
            try {
                const data = await fetchTickets(searchId);
                if (data.error) {
                    dispatch(setError(data.error));
                    if (data.error === 'Ошибка сервера') {
                        dispatch(
                            setError(
                                'Произошла ошибка на сервере, уже делаем повторный запрос'
                            )
                        );
                        await new Promise((resolve) =>
                            setTimeout(resolve, 5000)
                        );
                        continue;
                    } else {
                        dispatch(setError(data.error));
                        stop = true;
                        return;
                    }
                }
                dispatch(addTickets(data.tickets));
                if (data.stop) {
                    stop = true;
                }
            } catch (error) {
                dispatch(setError('Ошибка запроса сервера'));
                return;
            }
        }
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setIsLoading(false));
        if (!getState().tickets.error) {
            dispatch(clearError());
        }
    }
};

export default ticketSlice.reducer;
