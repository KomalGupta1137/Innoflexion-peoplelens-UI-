import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import RepProgressBar from '../../atoms/RepProgressBar';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';

interface RepComparisonSalesOutcomeProps {
  type?: string;
  headingName: string;
  firstPersonValue?: number | null | undefined;
  secondPersonValue?: number | null | undefined;
  // totalSalesClosed?: number | null | undefined;
  maxValue?: number | null | undefined;
  minValue?: number | null | undefined;

  avgValue?: number | null | undefined;
  index: number;
}

const RepComparisonSalesOutcome: React.FC<RepComparisonSalesOutcomeProps> = ({
  type,
  headingName,
  firstPersonValue,
  secondPersonValue,
  maxValue,
  minValue,
  avgValue,
  index,
}: RepComparisonSalesOutcomeProps) => {
  let avg =
    secondPersonValue &&
    avgValue &&
    _n_(secondPersonValue - Math.round(avgValue), '0a');
  if (type === 'percentage' || type === 'winRatePercentage') {
    avg = avg?.toString() + '%';
  }

  const useStyles = makeStyles({
    root: {
      width: '90%',

      height: '45px',
      backgroundColor: COLORS.REPORTPAGE6BACKGROUNDCOLOR,
      border:
        index == 3 ? '1px solid #2E6FF2' : '1px solid rgba(215, 223, 233, 0.2)',
      // border: '1px solid rgba(215, 223, 233, 0.2)',
      position: 'relative',
      marginLeft: 50,
      marginRight: 50,
    },
    heading: {
      lineHeight: '20px',
      color: COLORS.REPCOMPARISONHEADINGCOLOR,
      marginLeft: -5,
      width: '172px',
      marginTop: 10,
      fontWeight: 400,
    },

    progressBarDiv: {
      width: '150px',
    },
    progressBarValue: {
      marginTop: '1px',
      marginLeft: '110px',
      marginBottom: '1px',
      width: '38px',
    },

    footerElement: {
      marginTop: '3px',
    },
    // errorDiv: {
    //   position: 'relative',
    //   top: '-15px',
    //   left: '460px',
    //   color: 'COLORS.PORTFOLIO',
    //   width: '25px',
    //   height: '25px',
    // },
  });

  const classes = useStyles();

  const firstPersonData = firstPersonValue && _n_(firstPersonValue, '0a');

  const secondPersonData = secondPersonValue && _n_(secondPersonValue, '0a');
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      className={classes.root}
    >
      {/* {barBackgroundColor === COLORS.AVATARS_RED_2 ? (
        <ErrorIcon className={classes.errorDiv} />
      ) : (
        ''
      )} */}
      <Grid item>
        <Typography variant="h5" className={classes.heading}>
          {_t_(headingName)}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" justify="space-between">
          <Grid item className={classes.progressBarDiv}>
            <Typography
              variant="h6"
              className={classes.progressBarValue}
              align="right"
            >
              {type === 'percentage' || type === 'winRatePercentage'
                ? `${firstPersonValue ? firstPersonValue.toString() : 0}%`
                : type === 'amount' ||
                  type === 'dealsClosed' ||
                  type === 'dealSizeAmount'
                ? // ? firstPersonValue && Math.round(firstPersonValue / 1000)
                  firstPersonData
                : firstPersonValue}
            </Typography>
          </Grid>
          <Grid item>
            <RepProgressBar
              value={firstPersonValue}
              type={type}
              maxValue={maxValue}
              minValue={minValue}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" justify="space-between">
          <Grid item className={classes.progressBarDiv}>
            <Typography
              variant="h6"
              className={classes.progressBarValue}
              align="right"
            >
              {type === 'percentage' || type === 'winRatePercentage'
                ? `${secondPersonValue ? secondPersonValue.toString() : 0}%`
                : type === 'amount' ||
                  type === 'dealsClosed' ||
                  type === 'dealSizeAmount'
                ? // ? secondPersonValue && Math.round(secondPersonValue / 1000)
                  secondPersonData
                : secondPersonValue}
            </Typography>
          </Grid>
          <Grid item>
            <RepProgressBar
              value={secondPersonValue}
              type={type}
              maxValue={maxValue}
              minValue={minValue}
            />
          </Grid>
          <Grid item className={classes.footerElement}>
            <Typography variant="h6">
              {avg && avg.toString().includes('-')
                ? `${avg} avg`
                : `+ ${avg && avg.toString()} avg`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RepComparisonSalesOutcome;
