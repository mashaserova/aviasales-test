import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import ticketReducer from './slices/ticketSlice';

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        tickets: ticketReducer,
    },
});
