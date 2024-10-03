import { React, Provider } from 'react-redux';
import { store } from '../store/store';
import App from './App';

const WrappedApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default WrappedApp;
