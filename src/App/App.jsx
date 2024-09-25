import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import logo from '../assets/images/plane-logo.svg';
// import logoS7 from '../assets/images/s7-logo.svg';
import { store } from '../store/store';
import {
    toggleAll,
    toggleFilter,
    setSortBy,
} from '../store/slices/filterSlice';
import { fetchAllTickets } from '../store/slices/ticketSlice';
import { Provider, useDispatch, useSelector } from 'react-redux';
import CardTicket from './components/CardTicket/CardTicket';

const App = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);
    const tickets = useSelector((state) => state.tickets.tickets);
    const [displayedTickets, setDisplayedTickets] = useState([]);
    const [ticketsToShow, setTicketsToShow] = useState(5);
    const [activeSort, setActiveSort] = useState(null);
    useEffect(() => {
        dispatch(fetchAllTickets());
    }, []);
    useEffect(() => {
        const filteredTickets = tickets.filter((ticket) => {
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
        const sortedTickets = [...filteredTickets].sort((a, b) => {
            if (filters.sortBy === 'cheapest') {
                return a.price - b.price;
            } else if (filters.sortBy === 'fastest') {
                const durationA = a.segments.reduce(
                    (acc, segment) => acc + segment.duration,
                    0
                );
                const durationB = b.segments.reduce(
                    (acc, segment) => acc + segment.duration,
                    0
                );
                return durationA - durationB;
            } else if (filters.sortBy === 'optimal') {
                const durationA = a.segments.reduce(
                    (acc, segment) => acc + segment.duration,
                    0
                );
                const durationB = a.segments.reduce(
                    (acc, segment) => acc + segment.duration,
                    0
                );
                const optimalA = a.price + durationA;
                const optimalB = b.prive + durationB;
                return optimalA - optimalB;
            }
            return 0;
        });
        setDisplayedTickets(sortedTickets.slice(0, ticketsToShow));
    }, [tickets, filters, ticketsToShow]);
    const handleFilterChange = (filterName) => {
        dispatch(toggleFilter(filterName));
    };
    const handleAllChange = () => {
        dispatch(toggleAll());
    };
    const handleSortByChange = (sortType) => {
        dispatch(setSortBy(sortType));
    };
    const handleShowMoreTickets = () => {
        setTicketsToShow(ticketsToShow + 5);
    };
    return (
        <>
            <img className={styles.planeLogo} src={logo}></img>
            <div className={styles.container}>
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
                            <span className={styles.transfersFilter__label}>
                                Все
                            </span>
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
                    <div className={styles.ticketsList}>
                        {displayedTickets.map((ticket) => (
                            <CardTicket key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                    <button
                        className={styles.showTicketsButton}
                        onClick={handleShowMoreTickets}
                    >
                        Показать еще 5 билетов!
                    </button>
                </main>
            </div>
        </>
    );
};

const WrappedApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
export default WrappedApp;

{
    /* <div className={`${styles.ticketsList_item} ${styles.ticketsCard}`}>
    <div className={styles.ticketsCard_header}>
        <div className={styles.ticketsCard_price}>13 400 Р</div>
        <img src={logoS7}></img>
    </div>
    <div className={styles.ticketsCard_info}>
        <div className={styles.ticketsCard_date}>
            <div>MOW – HKT</div>
            <div>10:45 – 08:00</div>
        </div>
        <div className={styles.ticketsCard_date}>
            <div>В ПУТИ</div>
            <div>21ч 15м</div>
        </div>
        <div className={styles.ticketsCard_date}>
            <div>2 ПЕРЕСАДКИ</div>
            <div>HKG, JNB</div>
        </div>
    </div>
    <div className={styles.ticketsCard_info}>
        <div className={styles.ticketsCard_date}>
            <div>MOW – HKT</div>
            <div>11:20 – 00:50</div>
        </div>
        <div className={styles.ticketsCard_date}>
            <div>В ПУТИ</div>
            <div>13ч 30м</div>
        </div>
        <div className={styles.ticketsCard_date}>
            <div>1 ПЕРЕСАДКИ</div>
            <div>HKG</div>
        </div>
    </div>
</div>; */
}
