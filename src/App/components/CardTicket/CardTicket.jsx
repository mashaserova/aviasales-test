import React from 'react';
import styles from './CardTicket.module.scss';
import planeLogo from '../../../assets/images/plane-logo.svg';
import { v4 as uuidv4 } from 'uuid';
const CardTicket = ({ ticket }) => {
    const durationFormatting = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration - hours * 60;
        return `${hours}ч ${minutes}м`;
    };
    const timeInFlyFormatting = (date, duration) => {
        const depDate = new Date(date);
        const arrDate = new Date(date);
        arrDate.setMinutes(depDate.getMinutes() + duration);

        const depHours = depDate.getHours();
        const depMinutes = depDate.getMinutes();
        const arrHours = arrDate.getHours();
        const arrMinutes = arrDate.getMinutes();

        const formatTime = (hours, minutes) => {
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            return `${formattedHours}:${formattedMinutes}`;
        };

        const departureTime = formatTime(depHours, depMinutes);
        const arrivalTime = formatTime(arrHours, arrMinutes);

        return `${departureTime}-${arrivalTime}`;
    };
    return (
        <div className={`${styles.ticketsList__item} ${styles.ticketsCard}`}>
            <div className={styles.ticketsCard__header}>
                <div
                    className={styles.ticketsCard__price}
                >{`${ticket.price} ₽`}</div>
                <img
                    className={styles.ticketsCard__image}
                    src={
                        `https://pics.avs.io/110/36/${ticket.carrier}.png` ||
                        planeLogo
                    }
                    alt={`${ticket.carrier} Logo`}
                />
            </div>
            {ticket.segments.map((segment) => {
                const stops = segment.stops.length;
                let stopsString;

                if (stops === 0) {
                    stopsString = 'Без пересадок';
                } else if (stops === 1) {
                    stopsString = '1 пересадка';
                } else {
                    stopsString = `${stops} пересадки`;
                }
                return (
                    <div key={uuidv4()} className={styles.ticketsCard__info}>
                        <div className={styles.ticketsCard__date}>
                            <div>
                                {segment.origin} – {segment.destination}
                            </div>
                            <div>
                                {timeInFlyFormatting(
                                    segment.date,
                                    segment.duration
                                )}
                            </div>
                        </div>
                        <div className={styles.ticketsCard__date}>
                            <div>В ПУТИ</div>
                            <div>{durationFormatting(segment.duration)}</div>
                        </div>
                        <div className={styles.ticketsCard__date}>
                            <div>{stopsString}</div>
                            <div>{segment.stops.join(', ')}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardTicket;
