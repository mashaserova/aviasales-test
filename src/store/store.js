import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import ticketReducer from './slices/ticketSlice';
import errorReducer from './slices/errorSlice';
import { thunk } from 'redux-thunk';

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        tickets: ticketReducer,
        error: errorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});
