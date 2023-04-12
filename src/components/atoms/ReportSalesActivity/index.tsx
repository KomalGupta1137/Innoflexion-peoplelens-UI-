import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS, plTheme } from '../../../plTheme';

import { _t_ } from '../../../utils/translation/translation';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import RepProgressBar from '../RepProgressBar';

interface ReportSalesActivityProps {
  value?: number;
  benchmarkValue: number;
}

const ReportSalesActivity: React.FC<ReportSalesActivityProps> = ({
  value,
  benchmarkValue,
}: ReportSalesActivityProps) => {
  value = value ? value : 0;
  const useStyles = makeStyles({
    gridExample: {
      width: '150px',
    },
    innerSubHeading: {
      marginTop: '-7px',
      color: COLORS.GREY_TEXT_DARKER,
      width: '150px',
    },
    footerArrow: {
      height: '25px',
      width: '25px',
      marginLeft:
        benchmarkValue > 0 && benchmarkValue <= 100
          ? `${benchmarkValue - 10}%`
          : benchmarkValue > 100
          ? `${benchmarkValue / 2 - 10}%`
          : `${benchmarkValue - 7}%`,
    },
    footer: {
      marginLeft:
        benchmarkValue > 0 && benchmarkValue <= 89
          ? `${benchmarkValue - 30}%`
          : benchmarkValue >= 90 && benchmarkValue < 100
          ? `${benchmarkValue - 50}%`
          : benchmarkValue > 100
          ? benchmarkValue / 2 > 0 && benchmarkValue / 2 <= 89
            ? `${benchmarkValue / 2 - 30}%`
            : benchmarkValue / 2 >= 90
            ? `${benchmarkValue / 2 - 50}%`
            : `${benchmarkValue / 2 - 10}%`
          : `${benchmarkValue - 10}%`,
      marginTop: '-10px',
      marginBottom: '13px',
      width: '150px',
    },
    footerTypography: {
      fontWeight: plTheme.typography.h4.fontWeight,
      fontSize: '70%',
    },
    dataValue: {
      width: '150px',
      marginTop: '0px',
    },
  });

  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item className={classes.gridExample}>
        <Typography variant="h6" className={classes.dataValue} align="right">
          {value}
        </Typography>
      </Grid>
      <Grid item>
        <RepProgressBar
          value={value}
          type="salesActivity"
          maxValue={benchmarkValue}
          minValue={0}
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
        >
          {_t_('BENCHMARK')}: {benchmarkValue}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReportSalesActivity;
