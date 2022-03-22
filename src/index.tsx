import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'

import 'nprogress/nprogress.css';
import './assets/custom.css'
import configureStore from './reducers/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const store = configureStore();
const persistor = persistStore(store);

const alertOptions = {
  timeout: 6000,
  position: positions.TOP_RIGHT,
  offset: '10px',
  containerStyle: {
    zIndex: 100,
    marginTop: 50,
    marginRight: 17
  }
};

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AlertProvider>
      </PersistGate>
    </Provider>
  </HelmetProvider >,
  document.getElementById('root')
);

serviceWorker.unregister();
