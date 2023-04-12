import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';
import { useGlobalStyles } from '../../../plStyles';

export interface AvgTimeToHireProps {
  value?: number | null;
}

const AvgTimeToHire: React.FC<AvgTimeToHireProps> = ({
  value,
}: AvgTimeToHireProps) => {
  const useStyles = makeStyles({
    root: {
      height: '100%',
      // padding: matches ? '20px 0px 0px 14px' : '16px 23px 20px 23px',
      padding: '20px 0px 0px 14px',
      // width: matches ? 110 : 190,
    },
    heading: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      textTransform: 'uppercase',
    },
    currValue: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginTop: 30,
      marginBottom: 14,
      fontWeight: 400,
    },
    typo: {
      display: 'flex',
    },
    daysClass: {
      marginTop: 43,
      paddingLeft: 8,
      fontWeight: 400,
    },
  });

  const classes = useStyles();

  const avgTime = value && _n_(value, '0');

  const globalClasses = useGlobalStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        className={classes.root}
        data-testid="AvgTimetoHireWidget"
      >
        <Grid item>
          <Typography className={globalClasses.body1WidgetTitle}>
            {_t_('AVG Time To Hire')}
          </Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item className={classes.typo}>
            <Typography
              variant="h1"
              className={classes.currValue}
              data-testid="avgTime"
            >
              {avgTime?.toString().replace('-', '')}
            </Typography>
            <Typography variant="h5" className={classes.daysClass}>
              DAYS
              {/* {_t_('DAYS')} */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AvgTimeToHire;
