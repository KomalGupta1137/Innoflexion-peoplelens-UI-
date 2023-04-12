import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import { COLORS } from '../../../plTheme';
import { _n_ } from '../../../utils/numerals/numerals';
import { repDashboardData_RepDashboardData_earnings_annualComp as ComparisonData } from '../../../gql/types';

interface TotalComparisionProps {
  data?: ComparisonData | null;
  demoMode?: boolean;
}

const TotalComparision: React.FC<TotalComparisionProps> = ({
  data,
  demoMode,
}: TotalComparisionProps) => {
  const useStyles = makeStyles({
    root: {
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      height: 192,
      background: demoMode ? '#D9D9D9' : 'white',
      opacity: demoMode ? 0.6 : 1,
    },
    text: {
      fontFamily: 'Rubik',
      fontSize: 14,
      fontWeight: 300,
    },

    total: {
      fontFamily: 'Rubik',
      fontSize: 20,
      fontWeight: 500,
      // lineHeight: '32px',
      letterSpacing: '0em',
    },
    name: {
      fontSize: 14,
      fontWeight: 300,
      lineHeight: '24px',

      letterSpacing: '0em',
    },
    amount: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '24px',
      letterSpacing: '0em',
    },
  });
  const globalClasses = useGlobalStyles();
  const classes = useStyles();

  return (
    <>
      {' '}
      <WidgetCard>
        <Grid container direction="column" className={classes.root}>
          <Grid item style={{ width: '100%' }}>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_('current annualized total comp')}
            </Typography>
          </Grid>
          <Grid item style={{ paddingTop: '3%' }}>
            <Grid container direction="row">
              <Grid
                item
                style={{
                  flexGrow: 1,
                  alignContent: 'center',
                  paddingTop: '1%',
                }}
              >
                <Typography variant="h6" className={classes.total}>
                  $
                  {data?.base &&
                    data?.commission &&
                    data?.vestedEquity !== null &&
                    data?.vestedEquity !== undefined &&
                    _n_(
                      data?.base + data?.commission + data?.vestedEquity,
                      '0,0.0a',
                    )}
                </Typography>
              </Grid>
              <Grid item style={{ width: '35%' }}>
                <Typography
                  variant="h6"
                  style={{
                    backgroundColor: demoMode ? '#D9D9D9' : COLORS.PL_PRIMARY,
                    color: 'white',
                    height: 22,
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: 'Rubik',
                    fontSize: 13,
                    fontWeight: 400,
                    alignContent: 'center',
                    alignItems: 'center',
                    lineHeight: '21px',
                    letterSpacing: '0em',
                    borderRadius: 4,
                  }}
                >
                  Club Rank {data?.rank}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', paddingTop: '3%' }}>
            <Grid container>
              <Grid item style={{ width: '37%' }}>
                <Typography variant="h6" className={classes.name}>
                  Base:
                </Typography>
              </Grid>
              <Grid item style={{ width: '63%' }}>
                <Typography variant="h6" className={classes.amount}>
                  ${data?.base && _n_(data?.base, '0,0.0a')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', paddingTop: '1%' }}>
            <Grid container>
              <Grid item style={{ width: '37%' }}>
                <Typography variant="h6" className={classes.name}>
                  Commission:
                </Typography>
              </Grid>
              <Grid item style={{ width: '63%' }}>
                <Grid container direction="row" spacing={1}>
                  <Grid item>
                    <Typography variant="h6" className={classes.amount}>
                      ${data?.commission && _n_(data?.commission, '0,0.0a')}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      className={classes.name}
                      style={{ marginLeft: '1rem' }}
                    >
                      Rate:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      className={classes.amount}
                      style={{ paddingLeft: 1 }}
                    >
                      {' '}
                      {data?.rate}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', paddingTop: '1%' }}>
            <Grid container>
              <Grid item style={{ width: '37%' }}>
                <Typography variant="h6" className={classes.name}>
                  Vested Equity:
                </Typography>
              </Grid>
              <Grid item style={{ width: '63%' }}>
                <Typography variant="h6" className={classes.amount}>
                  ${data?.vestedEquity && _n_(data?.vestedEquity, '0,0.0a')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default TotalComparision;
