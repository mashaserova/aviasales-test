import React from 'react';
import styles from '../../App.module.scss';
import planeLogo from '../../../assets/images/plane-logo.svg';
const CardTicket = ({ ticket }) => {
    const stops = ticket.segments.reduce(
        (acc, segment) => acc + segment.stops.length,
        0
    );
    let stopsString;

    if (stops === 0) {
        stopsString = 'Без пересадок';
    } else if (stops === 1) {
        stopsString = '1 пересадка';
    } else {
        stopsString = `${stops} пересадки`;
    }
    return (
        <div className={`${styles.ticketsList__item} ${styles.ticketsCard}`}>
            <div className={styles.ticketsCard__header}>
                <div className={styles.ticketsCard__price}>{ticket.price}</div>
                <img
                    className={styles.ticketsCard__image}
                    src={ticket.logoUrl || planeLogo}
                    alt={`${ticket.carrier} Logo`}
                />
            </div>
            {ticket.segments.map((segment, index) => (
                <div key={index} className={styles.ticketsCard__info}>
                    <div className={styles.ticketsCard__date}>
                        <div>
                            {segment.origin} – {segment.destination}
                        </div>
                        <div>{segment.date}</div>
                    </div>
                    <div className={styles.ticketsCard__date}>
                        <div>В ПУТИ</div>
                        <div>{segment.duration}м</div>
                    </div>
                    <div className={styles.ticketsCard__date}>
                        <div>{stopsString}</div>
                        <div>{segment.stops.join(', ')}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardTicket;
