import { Grid, Icon, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import HelpIcon from '@material-ui/icons/Help';
import CalendarIcon from '../../../assets/calendar.png';
import { _n_ } from '../../../utils/numerals/numerals';

import QuestionMark from '../../../assets/QuestionMark.png';

import { repDashboardData_RepDashboardData_earnings_equity as EquityData } from '../../../gql/types';
interface EquityProps {
  data?: EquityData | null;
  demoMode?: boolean;
}

const Equity: React.FC<EquityProps> = ({ data, demoMode }: EquityProps) => {
  const useStyles = makeStyles({
    root: {
      padding: 16,
      height: 192,
      background: demoMode ? '#D9D9D9' : 'white',
      opacity: demoMode ? 0.6 : 1
    },
    shares: {
      fontSize: 14,
      fontWeight: 300,
      lineHeight: '24px',
      letterSpacing: '0em',
    },

    sharevalue: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '18px',

      letterSpacing: '0em',
      paddingTop: '2%',
      paddingLeft: '5%',
    },
    amount: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: '32px',

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
          <Grid item style={{ width: '100%', paddingBottom: '5%' }}>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_('Equity')}
            </Typography>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Grid container direction="row" spacing={4}>
              <Grid item style={{ width: '50%' }}>
                <Typography className={globalClasses.body1WidgetTitle}>
                  {_t_('Vested')}
                </Typography>
              </Grid>
              <Grid item style={{ width: '50%' }}>
                <Typography className={globalClasses.body1WidgetTitle}>
                  {_t_('remaining')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', paddingTop: '3%' }}>
            <Grid container direction="row" spacing={4}>
              <Grid
                item
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography variant="h6" className={classes.amount}>
                  ${data?.vestedAmount && _n_(data?.vestedAmount, '0,0.0a')}
                </Typography>

                <img
                  hidden={demoMode ? true : false}
                  src={QuestionMark}
                  style={{
                    height: 18,
                    width: 18,
                    marginLeft: '5%',
                    marginTop: '5.5%',
                  }}
                ></img>
              </Grid>
              <Grid
                item
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography variant="h6" className={classes.amount}>
                  $
                  {data?.remainingAmount &&
                    _n_(
                      data?.remainingAmount
                        .toFixed()
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      '0,0[.]0a',
                    )}
                </Typography>

                <img
                  hidden={demoMode ? true : false}
                  src={QuestionMark}
                  style={{
                    marginLeft: '5%',
                    marginTop: '5.5%',
                    height: 18,
                    width: 18,
                  }}
                ></img>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', paddingTop: '3%', height: 0 }}>
            <Grid container direction="row" spacing={4}>
              <Grid
                item
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography variant="h6" className={classes.shares}>
                  {_t_('Shares')}
                  {':  '}{' '}
                </Typography>
                <Typography variant="h6" className={classes.sharevalue}>
                  {data?.vestedShares
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Typography>
              </Grid>
              <Grid
                item
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography variant="h6" className={classes.shares}>
                  {_t_('Shares')}
                  {': '}
                </Typography>
                <Typography variant="h6" className={classes.sharevalue}>
                  {data?.remainingShares
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default Equity;
