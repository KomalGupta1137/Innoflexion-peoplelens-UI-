import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Loader from '../components/atoms/Loader';
import logger from '../utils/logger/logger';
import { isEmpty } from 'lodash-es';

declare const pendo: any;

function Auth0Callback() {
  const {
    // getAccessTokenSilently,
    getAccessTokenWithPopup,
    loginWithRedirect,
    getIdTokenClaims,
  } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
      try {
        const accessToken = await getAccessTokenWithPopup({
          audience: `https://${domain}/api/v2/`,
          scope: 'openid email profile',
        });
        if (isEmpty(accessToken)) {
          await loginWithRedirect({
            audience: `https://${domain}/api/v2/`,
            scope: 'openid email profile',
          });
        }

        const user = await getIdTokenClaims({
          audience: `https://${domain}/api/v2/`,
        });
        pendo.initialize({
          visitor: {
            id: user.email,
            email: user.email,
            // eslint-disable-next-line camelcase
            full_name: user.name,
          },
          account: {
            id: domain,
          },
        });
        const idToken = user['__raw'];
        const fetchResponse = await fetch(
          `${process.env.REACT_APP_API_BASE || ''}/api/token`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            credentials: 'omit',
          },
        );
        const fetchResponseAsJson = await fetchResponse.json();
        localStorage.setItem(
          'accessToken',
          fetchResponseAsJson ? fetchResponseAsJson.jwtToken : '',
        );
        history.push('/dashboard');
        //history.length <= 1 ? history.push('/dashboard') : history.goBack();
      } catch (e) {
        logger.error(e.message);
      }
    };
    void getUserMetadata();
  }, [getAccessTokenWithPopup, loginWithRedirect, getIdTokenClaims, history]);

  return <Loader />;
}

export default Auth0Callback;
