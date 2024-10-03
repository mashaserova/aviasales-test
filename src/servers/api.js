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
        return null;
    }
};

export const fetchTickets = async (searchId) => {
    try {
        const response = await fetch(
            `${baseAviasalesUrl}tickets?searchId=${searchId}`
        );
        if (!response.ok) {
            if (response.status === 500) {
                return { error: 'Ошибка сервера' };
            } else {
                const errorText = `Ошибка запроса: ${response.status} ${response.statusText}`;
                return { error: errorText };
            }
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: error.message };
    }
};
