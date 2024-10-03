export const filterTicketsByTransfers = (tickets, filters) => {
    return tickets.filter((ticket) => {
        const stops = ticket.segments.reduce((accumulator, segment) => {
            return accumulator + segment.stops.length;
        }, 0);
        if (filters.all) return true;
        if (filters.none && stops === 0) return true;
        if (filters.one && stops === 1) return true;
        if (filters.two && stops === 2) return true;
        if (filters.three && stops === 3) return true;
        return false;
    });
};

export const sortTickets = (tickets, sortBy) => {
    return [...tickets].sort((a, b) => {
        if (sortBy === 'cheapest') {
            return a.price - b.price;
        } else if (sortBy === 'fastest') {
            const durationA = a.segments.reduce(
                (acc, segment) => acc + segment.duration,
                0
            );
            const durationB = b.segments.reduce(
                (acc, segment) => acc + segment.duration,
                0
            );
            return durationA - durationB;
        } else if (sortBy === 'optimal') {
            const durationA = a.segments.reduce(
                (acc, segment) => acc + segment.duration,
                0
            );
            const durationB = b.segments.reduce(
                (acc, segment) => acc + segment.duration,
                0
            );
            const optimalA = a.price + durationA;
            const optimalB = b.price + durationB;
            return optimalA - optimalB;
        }
        return 0;
    });
};
