import React, { useState, useEffect, useMemo } from 'react';
import { clearError, setError } from '../store/slices/errorSlice';
import styles from './App.module.scss';
import logo from '../assets/images/plane-logo.svg';
import { Spin, Alert } from 'antd';
import {
    toggleAll,
    toggleFilter,
    setSortBy,
} from '../store/slices/filterSlice';
import { fetchAllTickets, setIsLoading } from '../store/slices/ticketSlice';
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
        const fetchData = async () => {
            dispatch(setIsLoading(true));
            try {
                await dispatch(fetchAllTickets());
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setIsLoading(false));
            }
        };
        fetchData();
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
                    <PriceSpeedFilter
                        handleSortByChange={handleSortByChange}
                        displayedTickets={displayedTickets}
                        handleShowMoreTickets={handleShowMoreTickets}
                    />
                </>
            </div>
        </>
    );
};
export default App;
