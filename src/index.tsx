import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from '@material-ui/core';
import { plTheme } from './plTheme';
import './i18n/i18n';
import ReactGA from 'react-ga';
const TRACKING_ID = 'UA-239895661-1';
ReactGA.initialize(TRACKING_ID);

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_BASE || ''}/api/gql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken');
  // return the headers to the context so httpLink can read them
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const WrappedApp = (
  <ThemeProvider theme={plTheme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>
);
ReactDOM.render(WrappedApp, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
