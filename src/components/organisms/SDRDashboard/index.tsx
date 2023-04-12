/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prettier/prettier */
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../plTheme';
import Loader from '../../atoms/Loader';
import CustomizedTabs from '../../molecules/CustomisedTabs';
import { _t_ } from '../../../utils/translation/translation';
import jwtDecode from 'jwt-decode';
import Sidebar from '../Sidebar';
import SDRMyselfDashboard from '../SDRMyselfDashboard';
import { subYears } from 'date-fns';
import ReactGA from 'react-ga';
import moment from 'moment';

ReactGA.pageview(window.location.pathname);

const useStyles = makeStyles((theme) => ({
  contentAlignment: {
    padding: '2%',
    backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
    width: 'calc(100% + 59px)',
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

const QUARTER_NAMES = ['2021', 'Q1', 'Q2', 'Q3', 'Q4'];

const SDRDashboard: React.FC = () => {
  ReactGA.event({
    category: 'Rep Lens',
    action: 'Rep Lens',
  });
  const classes = useStyles();
  const [activeQuarter, setActiveQuarter] = useState<number>(0);
  const token = localStorage.getItem('accessToken');
  const decodedToken: any = token && jwtDecode(token);
  const firstName = decodedToken.user.firstName;
  ReactGA.event({
    category: 'Rep Login',
    action: `Rep Login - ${firstName}`,
  });

  const handleActiveQuarterChange = (value: number) => {
    setActiveQuarter(value);
  };

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (num: number) => {};

  useEffect(() => {
    if (window.location.href.endsWith('/myteam')) {
      setActiveTab(0);
    } else if (window.location.href.endsWith('/leaderboard')) {
      setActiveTab(1);
    } else if (window.location.href.endsWith('/myself')) {
      setActiveTab(2);
    } else if (window.location.href.endsWith('/reports')) {
      setActiveTab(3);
    }
  });

  const [currentQuarter, setCurrentQuarter] = React.useState(0);
  const [currentWeekNumber, setCurrentWeekNumber] = React.useState(0);

  useEffect(() => {
    const todaysDate = new Date();
    const now = subYears(todaysDate, 1);
    const quarter = moment().quarter();
    const weekOfQuarter = getWeek() % 13;
    setCurrentQuarter(quarter);
    setActiveQuarter(quarter);
    setCurrentWeekNumber(weekOfQuarter);
  }, []);

  const getWeek = () => {
    const target = new Date(new Date().valueOf());
    const dayNr = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  };

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
            <Grid item className={`${classes.hideWhenPrint}`}>
              <Grid container direction="row" alignItems="center">
                {QUARTER_NAMES.map((quarterName, quarterIndex) => (
                  <Grid item key={quarterIndex}>
                    <Grid container direction="column">
                      <Grid item>
                        <Button
                          key={quarterIndex}
                          variant={
                            activeQuarter === quarterIndex
                              ? 'contained'
                              : 'outlined'
                          }
                          color={
                            activeQuarter === quarterIndex
                              ? 'primary'
                              : 'default'
                          }
                          className={classes.buttonStyles}
                          onClick={() => {
                            handleActiveQuarterChange(quarterIndex);
                          }}
                        >
                          {quarterName}
                        </Button>
                      </Grid>

                      <Grid
                        item
                        style={{ height: '20px', marginLeft: 8, marginTop: 5 }}
                      >
                        {quarterIndex === currentQuarter && (
                          <Typography variant="subtitle1" color="textPrimary">
                            Week {currentWeekNumber}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={`${classes.hideWhenPrint}`}>
          <CustomizedTabs
            tabNames={[
              // _t_('MY TEAM'),
              // _t_('LEADERBOARD'),
              _t_('MYSELF'),
              // _t_('REPORTS'),
            ]}
            primary={true}
            activeTab={activeTab}
            tabName=""
            handleTabChange={handleTabChange}
          />
        </Grid>
        <Grid className={classes.tabAlignment}>
          {activeTab === 0 && (
            <SDRMyselfDashboard
              activeQuarter={activeQuarter}
              currentWeek={currentWeekNumber}
            />
          )}
        </Grid>
        <Grid item className={`${classes.hideWhenPrint}`}>
          <Sidebar />
        </Grid>
      </Grid>
    </>
  );
};

export default SDRDashboard;
