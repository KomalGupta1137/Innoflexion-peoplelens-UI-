import {
  createStyles,
  Grid,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { COLORS, plTheme } from '../../../plTheme';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LinearProgress from '@material-ui/core/LinearProgress';
import { _t_ } from '../../../utils/translation/translation';

const BorderLinearProgress = withStyles(() =>
  createStyles({
    root: {
      height: '9.61px',
      borderRadius: '100px',
    },
    colorPrimary: {
      backgroundColor: COLORS.MAIN_HOVER_LIGHT,
    },
    bar: {
      borderRadius: '100px',
      backgroundColor: COLORS.PL_PRIMARY,
    },
  }),
)(LinearProgress);

interface ProgressbarProps {
  name: string;
  percentage: number;
  value1: number;
  value2: number;
  benchmarkValue: number;
}

const Progressbar: React.FC<ProgressbarProps> = ({
  name,
  percentage,
  value1,
  value2,
  benchmarkValue,
}: ProgressbarProps) => {
  console.log(value1, value2);
  const customizedValue = name === 'Untouched Opps' ? value1 * 10 : value2;
  const customizedBenchamark =
    name === 'Untouched Opps'
      ? benchmarkValue * 10
      : benchmarkValue > 100
      ? benchmarkValue / 2
      : benchmarkValue;
  const useStyles = makeStyles({
    root: {
      width: '424.62px',
      height: '123px',
      backgroundColor: COLORS.LIGHT_GREY_24_HOVER,
      border: '1px solid rgba(215, 223, 233, 0.2)',
    },
    heading: {
      marginLeft: '20.08px',
      marginTop: '10px',
      fontWeight: plTheme.typography.subtitle1.fontWeight,
    },
    bar: {
      height: '9.61px',
      backgroundColor: COLORS.MAIN_HOVER_LIGHT,
      borderRadius: 7,
      marginTop: 35,
      marginLeft: '20.08px',
      marginRight: '20.08px',
      background:
        'linear-gradient(to right, ' +
        COLORS.PL_PRIMARY +
        ' ' +
        value1.toString() +
        '%, ' +
        COLORS.MAIN_HOVER_LIGHT +
        ' 0%)',
    },
    dataValue: {
      marginLeft:
        customizedValue > 0
          ? customizedValue === 100
            ? `${customizedValue - 4.2}%`
            : `${customizedValue - 3.2}%`
          : `${customizedValue}%`,
      fontWeight: plTheme.typography.h3.fontWeight,
    },
    arrow: {
      height: '20px',
      width: '20px',
      marginRight: '20.08px',
    },
    rightHeading: {
      fontSize: plTheme.typography.subtitle1.fontSize,
    },
    positiveColor: {
      color: COLORS.SUCCESS_PRESSED,
    },
    negativeColor: {
      color: COLORS.ERROR_PRESSED,
    },
    innerSubHeading: {
      marginTop: '1px',
      marginLeft: `${customizedBenchamark}%`,
      color: COLORS.GREY_TEXT_DARKER,
    },
    footerArrow: {
      height: '25px',
      width: '25px',
    },
    footerTypography: {
      fontWeight: plTheme.typography.h4.fontWeight,
      width: '100px',
    },
    footer: {
      marginTop: '-7px',
      marginLeft: `calc(${customizedBenchamark}% - 33px)`,
      marginBottom: '13px',
    },
    borderLinearProgress: {
      marginLeft: '20.08px',
      marginRight: '20.08px',
    },
    gridExample: {
      marginLeft: '20.08px',
      marginRight: '20.08px',
      width: '384px',
    },
    selectRoot: {
      '&:focus': {
        backgroundColor: 'yellow',
      },
    },
  });

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      className={classes.root}
    >
      <Grid item>
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h5" className={classes.heading}>
              {_t_(name)}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  className={
                    percentage && percentage.toString().includes('-')
                      ? `${classes.rightHeading} ${classes.negativeColor}`
                      : `${classes.rightHeading} ${classes.positiveColor}`
                  }
                >
                  {percentage && percentage.toString().replace('-', '')}%
                </Typography>
              </Grid>
              <Grid item>
                {percentage && percentage.toString().includes('-') ? (
                  <ArrowDropDownIcon
                    className={`${classes.arrow} ${classes.negativeColor}`}
                  />
                ) : (
                  <ArrowDropUpIcon
                    className={`${classes.arrow} ${classes.positiveColor}`}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" justify="space-between">
          <Grid item className={classes.gridExample}>
            <Typography variant="h4" className={classes.dataValue}>
              {value1}
            </Typography>
          </Grid>
          <Grid item className={classes.borderLinearProgress}>
            <BorderLinearProgress
              variant="determinate"
              value={customizedValue}
            />
          </Grid>
          <Grid item className={classes.innerSubHeading}>
            <ArrowDropUpIcon className={classes.footerArrow} />
          </Grid>
          <Grid item className={classes.footer}>
            <Typography
              variant="h6"
              className={classes.footerTypography}
              color="textSecondary"
              style={{ width: 'auto' }}
            >
              {_t_('BENCHMARK')}: {benchmarkValue}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Progressbar;
