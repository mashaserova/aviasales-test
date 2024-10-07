import React from 'react';
import CardTicket from '../CardTicket/CardTicket';

const TicketList = ({ tickets }) => {
    return (
        <div className="ticketsList">
            {tickets.map((ticket) => (
                <CardTicket
                    key={`${ticket.segments[0].date}${ticket.segments[1].date}`}
                    ticket={ticket}
                />
            ))}
        </div>
    );
};

export default TicketList;
