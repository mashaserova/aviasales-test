import React from 'react';
import styles from './TransfersFilters.module.scss';
import { useSelector } from 'react-redux';

export const TransfersFilter = ({ handleAllChange, handleFilterChange }) => {
    const filters = useSelector((state) => state.filters);
    return (
        <aside>
            <div className={styles.transfersFilter}>
                <div className={styles.transfersFilter__title}>
                    Количество пересадок
                </div>
                <label className={styles.transfersFilter__item}>
                    <input
                        className={styles.transfersFilter__input}
                        type="checkbox"
                        checked={filters.all}
                        onChange={handleAllChange}
                    ></input>
                    <span className={styles.transfersFilter__label}>Все</span>
                </label>
                <label className={styles.transfersFilter__item}>
                    <input
                        className={styles.transfersFilter__input}
                        type="checkbox"
                        checked={filters.none}
                        onChange={() => handleFilterChange('none')}
                    ></input>
                    <span className={styles.transfersFilter__label}>
                        Без пересадок
                    </span>
                </label>
                <label className={styles.transfersFilter__item}>
                    <input
                        className={styles.transfersFilter__input}
                        type="checkbox"
                        checked={filters.one}
                        onChange={() => handleFilterChange('one')}
                    ></input>
                    <span className={styles.transfersFilter__label}>
                        1 пересадка
                    </span>
                </label>
                <label className={styles.transfersFilter__item}>
                    <input
                        className={styles.transfersFilter__input}
                        type="checkbox"
                        checked={filters.two}
                        onChange={() => handleFilterChange('two')}
                    ></input>
                    <span className={styles.transfersFilter__label}>
                        2 пересадки
                    </span>
                </label>
                <label className={styles.transfersFilter__item}>
                    <input
                        className={styles.transfersFilter__input}
                        type="checkbox"
                        checked={filters.three}
                        onChange={() => handleFilterChange('three')}
                    ></input>
                    <span className={styles.transfersFilter__label}>
                        3 пересадки
                    </span>
                </label>
            </div>
        </aside>
    );
};
