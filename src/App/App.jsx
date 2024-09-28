import React, { useState, useEffect } from 'react';
import { clearError, setError } from '../store/slices/errorSlice';
import styles from './App.module.scss';
import logo from '../assets/images/plane-logo.svg';
import { store } from '../store/store';
import { Spin, Alert } from 'antd';
import {
    toggleAll,
    toggleFilter,
    setSortBy,
} from '../store/slices/filterSlice';
import { fetchAllTickets, setIsLoading } from '../store/slices/ticketSlice';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { TransfersFilter } from './components/TransfersFilter/TransfersFilters';
import { PriceSpeedFilter } from './components/PriceSpeedFilter/PriceSpeedFilter';
const App = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.error.message);
    const filters = useSelector((state) => state.filters);
    const { tickets, isLoading } = useSelector((state) => state.tickets);
    const [displayedTickets, setDisplayedTickets] = useState([]);
    const [ticketsToShow, setTicketsToShow] = useState(5);
    useEffect(() => {
        dispatch(fetchAllTickets());
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            dispatch(setIsLoading(true));
            try {
                await dispatch(fetchAllTickets());
                dispatch(clearError());
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setIsLoading(false));
            }
        };
        fetchData();
    }, [dispatch]);
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
                        <Spin size="large" />
                    </div>
                )}
            </div>
            <div className={styles.container}>
                {!isLoading && (
                    <>
                        <TransfersFilter
                            filters={filters}
                            handleAllChange={handleAllChange}
                            handleFilterChange={handleFilterChange}
                        />
                        <PriceSpeedFilter
                            handleSortByChange={handleSortByChange}
                            displayedTickets={displayedTickets}
                            handleShowMoreTickets={handleShowMoreTickets}
                        />
                    </>
                )}
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
