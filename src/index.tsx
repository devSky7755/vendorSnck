import App from './App';
import ReactDOM from 'react-dom';
import 'src/utils/chart';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'

import 'nprogress/nprogress.css';
import './assets/custom.css'
import { SidebarProvider } from './contexts/SidebarContext';
import configureStore from './reducers/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

const store = configureStore();
const persistor = persistStore(store);


ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SidebarProvider>
      </PersistGate>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
