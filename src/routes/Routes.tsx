import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Loader from '../components/atoms/Loader';
import Reports from '../components/organisms/Reports';
import queryString from 'query-string';
import ReportBuilder from '../components/organisms/ReportBuilder';
import OutcomeTracker from '../components/organisms/OutcomeTracker';

const Home = lazy(() => import('../components/pages/home/Home'));
const Callback = lazy(() => import('../auth/Auth0Callback'));
const Logout = lazy(() => import('../auth/Auth0Logout'));
const Dashboard = lazy(() => import('../components/pages/home/HomePage'));
const SettingsPage = lazy(
  () => import('../components/pages/settings/SettingsPage'),
);

const queryParams = queryString.parse(location.search);
let quarterValue = 0;
if (queryParams.quarter === 'q1') {
  quarterValue = 1;
} else if (queryParams.quarter === 'q2') {
  quarterValue = 2;
} else if (queryParams.quarter === 'q3') {
  quarterValue = 3;
} else if (queryParams.quarter === 'q4') {
  quarterValue = 4;
}

function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/callback" component={Callback} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/myteam" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/leaderboard"
          component={Dashboard}
        />
        <PrivateRoute exact path="/dashboard/myself" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/reports" component={Dashboard} />
        <Route exact path="/reports" render={() => <ReportBuilder />} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/settings" component={SettingsPage} />
        <PrivateRoute exact path="/outcomeTracker" component={OutcomeTracker} />

      </Switch>
    </Suspense>
  );
}

export default Routes;
