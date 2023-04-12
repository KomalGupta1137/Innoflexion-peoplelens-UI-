import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppState, Auth0Provider } from '@auth0/auth0-react';

interface AuthProps {
  children: React.ReactChild | React.ReactChildren;
}

const Auth0ProviderWithHistory: React.FC<AuthProps> = ({
  children,
}: AuthProps) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  const history = useHistory();

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain ? domain : ''}
      clientId={clientId ? clientId : ''}
      redirectUri={redUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
