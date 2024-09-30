import { setError } from '../store/slices/errorSlice';

//https://front-test.dev.aviasales.ru/search
const baseAviasalesUrl = 'https://aviasales-test-api.kata.academy/';
export const getSearchId = async () => {
    try {
        const response = await fetch(`${baseAviasalesUrl}search`);
        if (!response.ok) {
            throw new Error(
                `Error while requesting for searchId: ${response.status}`
            );
        }
        const data = await response.json();
        return data.searchId;
    } catch (error) {
        console.error(`Error:`, error);
        return null;
    }
};

export const fetchTickets = async (searchId) => {
    try {
        const response = await fetch(
            `${baseAviasalesUrl}tickets?searchId=${searchId}`
        );
        if (response.status === 500) {
            return { tickets: [], stop: true, error: 'Ошибка сервера' };
        } else if (!response.ok) {
            return { tickets: [], stop: true, error: response.status };
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return { tickets: [], stop: true };
    }
};
export const getAllTickets = async (dispatch, searchId) => {
    let allTickets = [];
    let stop = false;
    while (!stop) {
        try {
            const data = await fetchTickets(searchId);
            allTickets = [...allTickets, ...data.tickets];
            stop = data.stop;
        } catch (error) {
            dispatch(setError(error.message));
        }
    }
    return allTickets;
};
