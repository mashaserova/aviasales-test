import React, { useState, useEffect, useMemo } from 'react';
import { clearError } from '../store/slices/errorSlice';
import styles from './App.module.scss';
import logo from '../assets/images/plane-logo.svg';
import { Spin, Alert } from 'antd';
import TicketList from './components/TicketList/TicketList';
import {
    toggleAll,
    toggleFilter,
    setSortBy,
} from '../store/slices/filterSlice';
import { fetchAllTickets } from '../store/slices/ticketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TransfersFilter } from './components/TransfersFilter/TransfersFilters';
import { PriceSpeedFilter } from './components/PriceSpeedFilter/PriceSpeedFilter';
import { filterTicketsByTransfers, sortTickets } from '../utils/ticketUtils';
const App = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.error.message);
    const filters = useSelector((state) => state.filters);
    const { tickets, isLoading } = useSelector((state) => state.tickets);
    const [ticketsToShow, setTicketsToShow] = useState(5);
    useEffect(() => {
        dispatch(fetchAllTickets());
    }, []);
    const displayedTickets = useMemo(() => {
        const filteredTickets = filterTicketsByTransfers(tickets, filters);
        const sortedTickets = sortTickets(filteredTickets, filters.sortBy);
        return sortedTickets.slice(0, ticketsToShow);
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
            <div className={styles.antdContainer}>
                {errorMessage && (
                    <div className={styles.alertContainer}>
                        <Alert
                            message="Ошибка"
                            description={errorMessage}
                            type="error"
                            showIconc
                            closable
                            onClose={() => dispatch(clearError())}
                        />
                    </div>
                )}
                {isLoading && (
                    <div className={styles.spinnerContainer}>
                        Загружаем билеты...
                        <Spin size="large" />
                    </div>
                )}
            </div>
            <div className={styles.container}>
                <>
                    <TransfersFilter
                        handleAllChange={handleAllChange}
                        handleFilterChange={handleFilterChange}
                    />
                    <main className={styles.mainContainer}>
                        <PriceSpeedFilter
                            handleSortByChange={handleSortByChange}
                            handleShowMoreTickets={handleShowMoreTickets}
                        />
                        <TicketList tickets={displayedTickets} />
                        <button
                            className={styles.showTicketsButton}
                            onClick={handleShowMoreTickets}
                        >
                            Показать еще 5 билетов!
                        </button>
                    </main>
                </>
            </div>
        </>
    );
};
export default App;
