import { useAuth0 } from '@auth0/auth0-react';
import { Redirect, Route } from 'react-router';
import React from 'react';
import Loader from '../components/atoms/Loader';

type Props = {
  component: React.FC;
  path: string;
  exact: boolean;
};
const PrivateRoute: React.FC<Props> = (props: Props) => {
  const { isAuthenticated, isLoading } = useAuth0();
  // to make the contents appear below the fixed navbar

  return isLoading ? (
    <Loader />
  ) : isAuthenticated ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
