import { createSlice } from '@reduxjs/toolkit';
import { getSearchId, fetchTickets } from '../../servers/api';
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
            state.tickets = action.payload.tickets;
            state.searchId = action.payload.searchId;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        addTickets: (state, action) => {
            state.tickets = state.tickets.concat(action.payload);
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
        if (!getState().error.message) {
            dispatch(clearError());
        }
    }
};

export default ticketSlice.reducer;
