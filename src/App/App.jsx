import React from 'react';
import styles from './App.module.scss';
import logo from '../img/plane-logo.svg';
import logoS7 from '../img/s7-logo.svg';

const App = () => {
    return (
        <>
            <img className={styles.planeLogo} src={logo}></img>
            <div className={styles.container}>
                <aside>
                    <div className={styles.transfersFilter}>
                        <div className={styles.transfersFilter_title}>
                            Количество пересадок
                        </div>
                        <label className={styles.transfersFilter_item}>
                            <input
                                className={styles.transfersFilter_input}
                                type="checkbox"
                                checked
                            ></input>
                            <span className={styles.transfersFilter_label}>
                                Все
                            </span>
                        </label>
                        <label className={styles.transfersFilter_item}>
                            <input
                                className={styles.transfersFilter_input}
                                type="checkbox"
                                checked
                            ></input>
                            <span className={styles.transfersFilter_label}>
                                Без пересадок
                            </span>
                        </label>
                        <label className={styles.transfersFilter_item}>
                            <input
                                className={styles.transfersFilter_input}
                                type="checkbox"
                                checked
                            ></input>
                            <span className={styles.transfersFilter_label}>
                                1 пересадка
                            </span>
                        </label>
                        <label className={styles.transfersFilter_item}>
                            <input
                                className={styles.transfersFilter_input}
                                type="checkbox"
                                checked
                            ></input>
                            <span className={styles.transfersFilter_label}>
                                2 пересадки
                            </span>
                        </label>
                        <label className={styles.transfersFilter_item}>
                            <input
                                className={styles.transfersFilter_input}
                                type="checkbox"
                                checked
                            ></input>
                            <span className={styles.transfersFilter_label}>
                                3 пересадки
                            </span>
                        </label>
                    </div>
                </aside>
                <main>
                    <div className={styles.priceSpeedFilter}>
                        <button className={styles.priceSpeedFilter_item}>
                            Самый дешёвый
                        </button>
                        <button className={styles.priceSpeedFilter_item}>
                            Самый быстрый
                        </button>
                        <button className={styles.priceSpeedFilter_item}>
                            Оптимальный
                        </button>
                    </div>
                    <div className={styles.ticketsList}>
                        <div
                            className={`${styles.ticketsList_item} ${styles.ticketsCard}`}
                        >
                            <div className={styles.ticketsCard_header}>
                                <div className={styles.ticketsCard_price}>
                                    13 400 Р
                                </div>
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
                        </div>
                        <div
                            className={`${styles.ticketsList_item} ${styles.ticketsCard}`}
                        >
                            <div className={styles.ticketsCard_header}>
                                <div className={styles.ticketsCard_price}>
                                    13 400 Р
                                </div>
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
                        </div>
                    </div>
                    <button className={styles.showTicketsButton}>
                        Показать еще 5 билетов!
                    </button>
                </main>
            </div>
        </>
    );
};

export default App;
