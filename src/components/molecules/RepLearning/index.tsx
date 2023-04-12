import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';

import { repDashboardData_RepDashboardData_myLearning as MyLearningData } from '../../../gql/types';
import { QueryResult, useQuery } from '@apollo/client';
import { GetRepDashboardData } from '../../../gql/queries/repDashboard';

import { repDashboardData as RepDashboardData } from '../../../gql/types';
import Loader from '../../atoms/Loader';
import moment from 'moment';
import { addDays, addYears } from 'date-fns';

interface RepLearningProps {
  startDate?: string;
  endDate?: string;
}
const RepLearning: React.FC<RepLearningProps> = ({
  startDate,
  endDate,
}: RepLearningProps) => {
  const useStyles = makeStyles({
    root: {
      padding: 14,
      height: 410,
    },
    mainDiv: {
      borderBottom: '1px solid ' + COLORS.BORDER_PRIMARY,
      paddingBottom: '0.5rem',
      marginTop: '1.9rem',
    },
    mainDiv2: {
      marginTop: '1.2rem',
      borderBottom: '1px solid ' + COLORS.BORDER_PRIMARY,
      paddingBottom: '0.5rem',
    },
    activityScore: {
      fontWeight: 500,
    },
    value: {
      backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
      lineHeight: '28px',
      padding: '0 16px',
      width: 92,
    },
    insideDiv: {
      marginTop: '1.2rem',
    },
    stats: {
      marginTop: '0.4rem',
    },
    subHeading: {
      fontFamily: 'Rubik',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 400,

      letterSpacing: '0em',
    },
    innertext: {
      fontFamily: 'Rubik',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 300,
      lineHeight: '21px',
      letterSpacing: '0em',
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const completed = [{ course: '', courseDate: '', score: 0 }];
  const upcoming = [{ course: '', courseDate: '' }];

  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<RepDashboardData> = useQuery(GetRepDashboardData, {
    variables: {
      repDashboardInput: {
        startDate: startDate,
        endDate: endDate,
        thresholdValue: 1,
      },
    },
  });

  useEffect(() => {
    void refetch();
  }, [startDate, endDate]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  completed.pop();
  upcoming.pop();

  if (error) return <>`Error! ${error.message}` </>;
  data?.RepDashboardData?.myLearning &&
    data?.RepDashboardData?.myLearning.forEach(
      (r: MyLearningData | null, index: number) => {
        if (
          r?.courseStatus === 'completed' &&
          r?.course !== '' &&
          r?.courseDate !== ''
        ) {
          completed.push({
            course: r?.course ? r?.course : '',
            courseDate: r?.courseDate ? r?.courseDate : '',
            score: r?.assessmentScore ? r?.assessmentScore : 0,
          });
        }
      },
    );
  // To be removed
  completed.forEach((c) => {
    c.courseDate = addYears(new Date(c.courseDate), +1).toString();
    c.courseDate = addDays(new Date(c.courseDate), +1).toString();
  });
  data?.RepDashboardData?.myLearning &&
    data?.RepDashboardData?.myLearning.forEach((r: MyLearningData | null) => {
      if (
        r?.courseStatus === 'upcoming' &&
        r?.course !== '' &&
        r?.courseDate !== ''
      ) {
        upcoming.push({
          course: r?.course ? r?.course : '',
          courseDate: r?.courseDate ? r?.courseDate : '',
        });
      }
    });
  upcoming.forEach((c) => {
    c.courseDate = addYears(new Date(c.courseDate), +1).toString();
  });

  return (
    <>
      <WidgetCard>
        <Grid className={classes.root}>
          <Typography className={`${globalClasses.body1WidgetTitle}`}>
            {_t_('my LEARNING')}
          </Typography>
          <Grid
            container
            direction="row"
            spacing={2}
            style={{ paddingTop: '2.2rem' }}
          >
            <Grid item style={{ flex: 40 }}>
              <Typography className={globalClasses.h5Bold} color="textPrimary">
                Module
              </Typography>
            </Grid>
            <Grid item style={{ flex: 30, textAlign: 'center' }}>
              <Typography className={globalClasses.h5Bold} color="textPrimary">
                Date
              </Typography>
            </Grid>
            <Grid item style={{ flex: 30, textAlign: 'center' }}>
              <Typography className={globalClasses.h5Bold} color="textPrimary">
                Assessment Score
              </Typography>
            </Grid>
          </Grid>
          <Typography className={`${classes.subHeading} ${classes.mainDiv}`}>
            {_t_('Completed')}
          </Typography>
          <Grid container direction="column">
            {completed.length === 0 ? (
              <Typography
                variant="h4"
                align="center"
                style={{ marginTop: '5%' }}
              >
                No modules to be completed
              </Typography>
            ) : (
              completed.map((element, index) => (
                <Grid
                  key={index}
                  container
                  direction="row"
                  spacing={2}
                  style={{ marginTop: '0.8rem' }}
                >
                  <Grid item style={{ flex: 40 }}>
                    <Typography className={classes.innertext}>
                      {element.course}
                    </Typography>
                  </Grid>
                  <Grid item style={{ flex: 30, textAlign: 'center' }}>
                    <Typography className={classes.innertext}>
                      {_t_(
                        moment(element?.courseDate).utc().format('MMM DD YYYY'),
                      )}
                      {/* {element.courseDate.replace(',', '')} */}
                    </Typography>
                  </Grid>
                  <Grid item style={{ flex: 30, textAlign: 'center' }}>
                    <Typography className={classes.innertext}>
                      {element.courseDate === '' && element.course === ''
                        ? ''
                        : element.score.toFixed(1)}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
          <Typography className={`${classes.subHeading} ${classes.mainDiv2}`}>
            {_t_('Upcoming')}
          </Typography>
          <Grid container direction="column">
            {upcoming.length === 0 ? (
              <Typography
                variant="h4"
                align="center"
                style={{ marginTop: '5%' }}
              >
                {' '}
                No upcoming modules{' '}
              </Typography>
            ) : (
              upcoming.map((element, index) => (
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  style={{ marginTop: '0.8rem' }}
                  key={index}
                >
                  <Grid item style={{ flex: 40 }}>
                    <Typography className={classes.innertext}>
                      {element.course}
                    </Typography>
                  </Grid>
                  <Grid item style={{ flex: 30, textAlign: 'center' }}>
                    <Typography className={classes.innertext}>
                      {_t_(
                        moment(element?.courseDate).utc().format('MMM DD YYYY'),
                      )}
                    </Typography>
                  </Grid>
                  <Grid item style={{ flex: 30, textAlign: 'center' }}>
                    <Typography className={classes.innertext}></Typography>
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default RepLearning;
