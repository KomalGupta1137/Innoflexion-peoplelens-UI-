import React from 'react';

import Routes from './routes/Routes';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductColorProvider } from './utils/productColorContext';

export default function App() {
  return (
    <ProductColorProvider>
      <Auth0ProviderWithHistory>
        <Router basename={process.env.PUBLIC_URL}>
          <Routes />
        </Router>
      </Auth0ProviderWithHistory>
    </ProductColorProvider>
  );
}
