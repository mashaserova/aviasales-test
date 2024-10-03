import React from 'react';
import CardTicket from '../CardTicket/CardTicket';

const TicketList = ({ tickets }) => {
    return (
        <div className="ticketsList">
            {tickets.map((ticket) => (
                <CardTicket key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
};

export default TicketList;
