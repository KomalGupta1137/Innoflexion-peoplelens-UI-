import { useAuth0 } from '@auth0/auth0-react';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Loader from '../../atoms/Loader';

function Home() {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    const queryParams = queryString.parse(location.search);

    // navigate to auth0 login
    if (isLoading) return;

    if (queryParams.token) {
      localStorage.setItem('accessToken', queryParams.token[0]);
      history.length <= 1 ? history.push('/reports') : history.goBack();
    } else if (isAuthenticated) {
      history.length <= 1
        ? history.push('/dashboard')
        : history.push('/dashboard');
    } else {
      void loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, history, loginWithRedirect]);

  return <div>{isLoading && <Loader />}</div>;
}

export default Home;
