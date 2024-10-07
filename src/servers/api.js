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
            if (response.status === 404) {
                return { error: 'Ресурс не найден.' };
            } else if (response.status === 429) {
                return { error: 'Слишком много запросов. Попробуйте позже.' };
            } else if (response.status >= 500 && response.status < 600) {
                return { error: 'Ошибка сервера' };
            }
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (
            error instanceof TypeError &&
            error.message.includes('NetworkError')
        ) {
            return { error: error.message };
        }
        return { error: error.message };
    }
};
