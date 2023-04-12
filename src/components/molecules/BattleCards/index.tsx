/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  createStyles,
  Grid,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorIcon from '@material-ui/icons/Error';

interface BattleCardsProps {
  data?: any;
}

const BattleCards: React.FC<BattleCardsProps> = ({
  data,
}: BattleCardsProps) => {
  const useStyles = makeStyles({
    root: {
      width: '441.76px',
      height: '80.42px',
      backgroundColor: COLORS.LIGHT_GREY_20,
      border: '1px solid rgba(215, 223, 233, 0.2)',
      position: 'relative',
    },
    leftHeading: {
      lineHeight: '20px',
      width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'visible',
    },
    borderLinearProgress: {
      marginLeft: '20.08px',
      marginRight: '20.08px',
      marginBottom: '35.97px',
    },
    headingDivNegative: {
      marginBottom: '28.97px',
      marginLeft: '-35px',
    },
    headingDivPositive: {
      marginBottom: '28.97px',
      marginLeft: '24.08px',
    },
    rightPercentageDiv: {
      width: '141.27px',
    },
    rightPercentageValue: {
      marginLeft: data.valueType === 'discrete' ? '145px' : '127px',
      marginBottom: '5px',
    },
    discreteBar: {
      paddingLeft: '3px',
    },
    errorDiv: {
      position: 'relative',
      top: '-70px',
      left: '420px',
      color: COLORS.PORTFOLIO,
      width: '25px',
      height: '25px',
    },
  });
  let barBackgroundColor = '';
  let headingDivClassName = 0;
  if (data.name == 'Activity' && data.value > 69 && data.value < 75) {
    data.value1 = ((data.value - 69) / 6) * 100;
  } else if (
    data.name == 'With Customers' &&
    data.value > 15 &&
    data.value < 48
  ) {
    data.value1 = ((data.value - 15) / 33) * 100;
  } else if (
    data.name == 'Pipeline Discipline' &&
    data.value > 19 &&
    data.value < 41
  ) {
    data.value1 = ((data.value - 19) / 22) * 100;
  }

  if (data.valueType === 'continuous') {
    /* To be removed later */
    if (data.title == 'Activity' || data.title == 'Time Allocation') {
      console.log(data);
      if (data.name == 'Activity') {
        if (data.value1 <= 52) {
          barBackgroundColor = COLORS.AVATARS_RED_2;
          headingDivClassName = 1;
        } else barBackgroundColor = COLORS.SUCCESS_PRESSED;
      } else if (data.name == 'With Customers') {
        if (data.value1 <= 57) {
          barBackgroundColor = COLORS.AVATARS_RED_2;
          headingDivClassName = 1;
        } else barBackgroundColor = COLORS.SUCCESS_PRESSED;
      } else if (data.name == 'Pipeline Discipline') {
        if (data.value1 <= 51) {
          barBackgroundColor = COLORS.AVATARS_RED_2;
          headingDivClassName = 1;
        } else barBackgroundColor = COLORS.SUCCESS_PRESSED;
      } else {
        if (data.value <= 39) {
          barBackgroundColor = COLORS.AVATARS_RED_2;
          // headingDivClassName = 1;
        } else if (data.value >= 40 && data.value <= 79) {
          barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
        } else {
          barBackgroundColor = COLORS.SUCCESS_PRESSED;
        }
      }
    }
  } else {
    if (data.value <= 3) {
      barBackgroundColor = COLORS.AVATARS_RED_2;
      headingDivClassName = 1;
    } else if (data.value == 4) {
      barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
    } else {
      barBackgroundColor = COLORS.SUCCESS_PRESSED;
    }
  }
  const BorderLinearActualValue = withStyles(() =>
    createStyles({
      root: {
        height: '5.79px',
        width: '141.27px',
        borderRadius: 5,
      },
      colorPrimary: {
        backgroundColor: 'rgba(143, 146, 161, 0.2)',
      },
      bar: {
        borderRadius: 5,
        backgroundColor: `${barBackgroundColor}`,
      },
    }),
  )(LinearProgress);

  const BorderLinearDiscreteValue = withStyles(() =>
    createStyles({
      root: {
        height: '5.00px',
        width: '26.34px',
        borderRadius: 10,
      },
      colorPrimary: {
        backgroundColor: 'rgba(143, 146, 161, 0.2)',
      },
      bar: {
        borderRadius: 10,
        backgroundColor: `${barBackgroundColor}`,
      },
    }),
  )(LinearProgress);
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      className={classes.root}
      alignItems="flex-end"
    >
      {data.valueType === 'discrete' && data.value <= 3 ? (
        <ErrorIcon className={classes.errorDiv} />
      ) : (
        ''
      )}
      {/* {data.valueType === 'continuous' && data.value <= 40 ? (
        <ErrorIcon className={classes.errorDiv} />
      ) : (
        ''
      )} */}
      {/* To be removed later */}
      {data.valueType === 'continuous' &&
      data.name == 'Activity' &&
      data.value1 <= 52 ? (
        <ErrorIcon className={classes.errorDiv} />
      ) : (
        ''
      )}
      {data.valueType === 'continuous' &&
      data.name == 'With Customers' &&
      data.value1 <= 57 ? (
        <ErrorIcon className={classes.errorDiv} />
      ) : (
        ''
      )}
      {data.valueType === 'continuous' &&
      data.name == 'Pipeline Discipline' &&
      data.value1 <= 51 ? (
        <ErrorIcon className={classes.errorDiv} />
      ) : (
        ''
      )}
      <Grid
        item
        className={
          headingDivClassName > 0
            ? classes.headingDivNegative
            : classes.headingDivPositive
        }
      >
        <Typography variant="h4" className={classes.leftHeading}>
          {data.name}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" justify="space-between">
          <Grid item className={classes.rightPercentageDiv}>
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.rightPercentageValue}
            >
              {data.valueType === 'discrete'
                ? data.value
                : `${data.value.toFixed(1)}${'%'}`}
            </Typography>
          </Grid>
          <Grid item className={classes.borderLinearProgress}>
            {data.valueType === 'discrete' ? (
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={data.value >= 1 ? 100 : 0}
                  />
                </Grid>
                <Grid item className={classes.discreteBar}>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={data.value >= 2 ? 100 : 0}
                  />
                </Grid>
                <Grid item className={classes.discreteBar}>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={data.value >= 3 ? 100 : 0}
                  />
                </Grid>
                <Grid item className={classes.discreteBar}>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={data.value >= 4 ? 100 : 0}
                  />
                </Grid>
                <Grid item className={classes.discreteBar}>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={data.value >= 5 ? 100 : -2}
                  />
                </Grid>
                {/* If scores are calculated against 10, use the below code */}
                {/* <Grid item>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={
                      data.value && data.value / 2 > 0 && data.value / 2 < 1
                        ? 55
                        : data.value && data.value / 2 >= 1
                        ? 100
                        : 0
                    }
                  />
                </Grid>
                <Grid item className={classes.discreteBar}>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={
                      data.value && data.value / 2 > 1 && data.value / 2 < 2
                        ? 55
                        : data.value && data.value / 2 >= 2
                        ? 100
                        : 0
                    }
                  />
                </Grid>
                <Grid item className={classes.discreteBar}>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={
                      data.value && data.value / 2 > 2 && data.value / 2 < 3
                        ? 55
                        : data.value && data.value / 2 >= 3
                        ? 100
                        : 0
                    }
                  />
                </Grid>
                <Grid item className={classes.discreteBar}>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={
                      data.value && data.value / 2 > 3 && data.value / 2 < 4
                        ? 55
                        : data.value && data.value / 2 >= 4
                        ? 100
                        : 0
                    }
                  />
                </Grid>
                <Grid item className={classes.discreteBar}>
                  <BorderLinearDiscreteValue
                    variant="determinate"
                    value={
                      data.value && data.value / 2 > 4 && data.value / 2 < 5
                        ? 55
                        : data.value && data.value / 2 >= 5
                        ? 100
                        : 0
                    }
                  />
                </Grid> */}
              </Grid>
            ) : (
              <BorderLinearActualValue
                variant="determinate"
                value={
                  data.name == 'Activity' ||
                  data.name == 'With Customers' ||
                  data.name == 'Pipeline Discipline'
                    ? data.value1
                    : data.value
                }
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BattleCards;
