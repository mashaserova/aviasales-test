import React, { useState } from 'react';
import styles from './PriceSpeedFilter.module.scss';
import TicketList from '../TicketList/TicketList';

export const PriceSpeedFilter = ({
    handleSortByChange,
    displayedTickets,
    handleShowMoreTickets,
}) => {
    const [activeSort, setActiveSort] = useState(null);
    return (
        <main>
            <div className={styles.priceSpeedFilter}>
                <button
                    className={`${styles.priceSpeedFilter__item} ${activeSort === 'cheapest' ? styles.priceSpeedFilter_active : ''}`}
                    onClick={() => {
                        handleSortByChange('cheapest');
                        setActiveSort('cheapest');
                    }}
                >
                    Самый дешёвый
                </button>
                <button
                    className={`${styles.priceSpeedFilter__item} ${activeSort === 'fastest' ? styles.priceSpeedFilter_active : ''}`}
                    onClick={() => {
                        handleSortByChange('fastest');
                        setActiveSort('fastest');
                    }}
                >
                    Самый быстрый
                </button>
                <button
                    className={`${styles.priceSpeedFilter__item} ${activeSort === 'optimal' ? styles.priceSpeedFilter_active : ''}`}
                    onClick={() => {
                        handleSortByChange('optimal');
                        setActiveSort('optimal');
                    }}
                >
                    Оптимальный
                </button>
            </div>
            <TicketList tickets={displayedTickets} />
            <button
                className={styles.showTicketsButton}
                onClick={handleShowMoreTickets}
            >
                Показать еще 5 билетов!
            </button>
        </main>
    );
};
