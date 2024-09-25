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
        if (!response.ok) {
            throw new Error(
                `Error while requesting for tickets: ${response.status}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return { tickets: [], stop: true };
    }
};
export const getAllTickets = async (searchId) => {
    let allTickets = [];
    let stop = false;
    while (!stop) {
        const data = await fetchTickets(searchId);
        allTickets = [...allTickets, ...data.tickets];
        stop = data.stop;
    }
    return allTickets;
};
