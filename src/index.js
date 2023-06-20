import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App/index';
// CSS global styles
import './styles/global.css';
// MUI theme
import theme from './styles/themeMUI';
import { ThemeProvider } from '@mui/material/styles';
// Redux store
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
