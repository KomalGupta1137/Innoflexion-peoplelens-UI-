import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../plTheme';
import CustomizedTabs from '../../molecules/CustomisedTabs';
import { _t_ } from '../../../utils/translation/translation';
import MyTeamDashboard from '../MyTeamDashboard';
import jwtDecode from 'jwt-decode';
import Leaderboard from '../Leaderboard';
import Sidebar from '../Sidebar';
import ReportBuilder from '../ReportBuilder';
import ReactGA from 'react-ga';
import ComingSoon from '../../../assets/Coming_Soon.png';
ReactGA.pageview(window.location.pathname);

const useStyles = makeStyles((theme) => ({
  contentAlignment: {
    padding: '2%',
    backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
    width: 'calc(100% + 57px)',
  },
  buttonStyles: {
    marginRight: '16px',
    width: '68.08px',
  },
  hideWhenPrint: {},
  [`@media print`]: {
    contentAlignment: {
      padding: 0,
    },
    hideWhenPrint: {
      display: 'none',
    },
    tabAlignment: {
      paddingLeft: '0%',
    },
  },
  tabAlignment: {
    paddingLeft: '1%',
  },
}));

export const dates = [
  {
    startDate: '2020-01-01T00:00:00.000Z',
    endDate: '2020-12-31T23:59:59.999Z',
  },
  {
    startDate: '2020-01-01T00:00:00.000Z',
    endDate: '2020-03-31T23:59:59.999Z',
  },
  {
    startDate: '2020-04-01T00:00:00.000Z',
    endDate: '2020-06-30T23:59:59.999Z',
  },
  {
    startDate: '2020-07-01T00:00:00.000Z',
    endDate: '2020-09-30T23:59:59.999Z',
  },
  {
    startDate: '2020-10-01T00:00:00.000Z',
    endDate: '2020-12-31T23:59:59.999Z',
  },
  {
    startDate: '2020-01-01T00:00:00.000Z',
    endDate: '2020-06-30T23:59:59.999Z',
  },
  {
    startDate: '2020-07-01T00:00:00.000Z',
    endDate: '2020-12-31T23:59:59.999Z',
  },
];

const tabNames = ['MY TEAM', 'LEADERBOARD', 'MYSELF', 'REPORTS'];

const QUARTER_NAMES = ['2021', 'Q1', 'Q2', 'Q3', 'Q4'];

const ManagerDashboard: React.FC = () => {
  ReactGA.event({
    category: 'Manager Lens',
    action: 'Manager Lens',
  });
  const classes = useStyles();
  const [activeQuarter, setActiveQuarter] = useState<number>(0);
  const token = localStorage.getItem('accessToken');
  const decodedToken: any = token && jwtDecode(token);
  const firstName = decodedToken.user.firstName;
  ReactGA.event({
    category: 'Manager Login',
    action: `Manager Login - ${firstName}`,
  });

  const handleActiveQuarterChange = (value: number) => {
    setActiveQuarter(value);
  };

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (num: number) => {
    // alert('The URL of this page is: ' + window.location.href);
    if (num === 0) {
      history.pushState({}, 'null', '/dashboard/myteam');
    } else if (num === 1) {
      history.pushState({}, 'null', '/dashboard/leaderboard');
    } else if (num === 2) {
      history.pushState({}, 'null', '/dashboard/myself');
    } else if (num === 3) {
      history.pushState({}, 'null', '/dashboard/reports');
    }
    setActiveTab(num);
  };

  useEffect(() => {
    //  alert('The URL of this page is: ' + window.location.href);
    if (window.location.href.endsWith('/myteam')) {
      setActiveTab(0);
    } else if (window.location.href.endsWith('/leaderboard')) {
      setActiveTab(1);
    } else if (window.location.href.endsWith('/myself')) {
      setActiveTab(2);
    } else if (window.location.href.endsWith('/reports')) {
      setActiveTab(3);
    }
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={6}
        className={`${classes.contentAlignment}`}
      >
        <Grid item className={`${classes.hideWhenPrint}`}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h1">
                {firstName?.concat("'s lens")}
              </Typography>
            </Grid>
            {activeTab != 3 ? (
              <Grid item className={`${classes.hideWhenPrint}`}>
                {QUARTER_NAMES.map((quarterName, quarterIndex) => (
                  <Button
                    key={quarterIndex}
                    variant={
                      activeQuarter === quarterIndex ? 'contained' : 'outlined'
                    }
                    color={
                      activeQuarter === quarterIndex ? 'primary' : 'default'
                    }
                    className={classes.buttonStyles}
                    onClick={() => {
                      handleActiveQuarterChange(quarterIndex);
                    }}
                  >
                    {quarterName}
                  </Button>
                ))}
              </Grid>
            ) : (
              <Grid item className={`${classes.hideWhenPrint}`}>
                {}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item className={`${classes.hideWhenPrint}`}>
          <CustomizedTabs
            tabNames={tabNames}
            primary={true}
            activeTab={activeTab}
            tabName={tabNames[activeTab]}
            handleTabChange={handleTabChange}
          />
        </Grid>
        <Grid className={classes.tabAlignment}>
          {activeTab === 0 && <MyTeamDashboard activeQuarter={activeQuarter} />}
          {activeTab === 1 && <Leaderboard activeQuarter={activeQuarter} />}
          {activeTab === 2 && (
            <div style={{ textAlign: 'center' }}>
              <img src={ComingSoon} />
            </div>
          )}
          {activeTab === 3 && <ReportBuilder />}
        </Grid>
        <Grid item className={`${classes.hideWhenPrint}`}>
          <Sidebar />
        </Grid>
      </Grid>
    </>
  );
};

export default ManagerDashboard;
