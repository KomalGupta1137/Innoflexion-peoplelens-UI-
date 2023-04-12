import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../components/atoms/Loader';

function Auth0Logout() {
  const { logout } = useAuth0();

  useEffect(() => {
    logout({ returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL });
  }, [logout]);

  return <Loader />;
}

export default Auth0Logout;
