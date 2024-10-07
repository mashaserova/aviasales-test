import React, { useState } from 'react';
import styles from './PriceSpeedFilter.module.scss';

export const PriceSpeedFilter = ({ handleSortByChange }) => {
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
        </main>
    );
};
