import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import { COLORS } from '../../../plTheme';
import { repDashboardData_RepDashboardData_rewards_commissionStructure as CommisionStructureData } from '../../../gql/types';
import { _n_ } from '../../../utils/numerals/numerals';

import { useWindowSize } from '../../../utils/hooks/useWindowSize';
interface CommisionStructureProps {
  data?: (CommisionStructureData | null)[] | null;
}

const CommisionStructure: React.FC<CommisionStructureProps> = ({
  data,
}: CommisionStructureProps) => {
  const [width] = useWindowSize();
  const structure = [{ threshold: '', rate: 0, value: '' }];
  structure.pop();
  if (data) {
    data.forEach((element) => {
      structure.push({
        threshold: element?.threshold ? _n_(element?.threshold, '0.0a') : '',

        rate: element?.rate ? element?.rate : 0,
        value: element?.value
          ? _n_(
              element?.value
                .toFixed()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              '0[.]0a',
            )
          : '',
      });
    });
  }

  const useStyles = makeStyles({
    root: {
      height: 396,
      padding: 16,
      paddingRight: 30,
      background: '#D9D9D9',
      opacity: 0.6,
    },
    data: {
      fontFamily: 'Rubik',
      fontSize: 20,
      fontWeight: 500,
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    percentage: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: 500,
      color: COLORS.TEXT_HIGH_EMPHASIS,
      // marginRight: width < 1500 ? 80 : 140,
      textAlign: 'left',
    },
  });
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const divWidth = 60;
  return (
    <>
      {' '}
      <WidgetCard>
        <Grid container direction="column" className={classes.root}>
          <Grid item style={{ width: '100%', marginBottom: '0.5rem' }}>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_('commission structure')}
            </Typography>
          </Grid>
          <Grid
            direction="row"
            alignItems="center"
            justify="center"
            container
            // key={index}
            style={{
              paddingTop: 0,
              paddingLeft: 5,
              justifyContent: 'flex-start',
              marginBottom: 5,
            }}
          >
            <Grid item style={{ width: '16.5%' }}>
              <Typography
                className={classes.data}
                style={{ fontSize: '14px', marginLeft: 6 }}
              >
                {'Tier'}
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                width: '30%',
              }}
            >
              <Typography
                className={classes.percentage}
                style={{ fontSize: '14px' }}
              >
                {'Variable'}
              </Typography>
            </Grid>

            <Grid item style={{ width: '0%' }}>
              <div>
                <Typography> {/* {'$'} */}</Typography>
              </div>
            </Grid>
          </Grid>
          <Grid
            direction="row"
            alignItems="center"
            justify="center"
            container
            // key={index}
            style={{
              paddingTop: 0,
              paddingLeft: 5,
              justifyContent: 'flex-start',
              marginBottom: -20,
            }}
          >
            <Grid item style={{ width: '19%', marginLeft: 4 }}>
              <Typography className={classes.data} style={{ fontSize: '14px' }}>
                {'($M) '}
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                width: '30%',
              }}
            >
              <Typography
                className={classes.percentage}
                style={{ fontSize: '14px' }}
              >
                {'(%)'}
              </Typography>
            </Grid>

            <Grid item style={{ width: '0%' }}>
              <div>
                <Typography> {/* {'$'} */}</Typography>
              </div>
            </Grid>
          </Grid>
          {structure.map((element, index) => (
            <Grid
              direction="row"
              alignItems="center"
              justify="center"
              container
              key={index}
              style={{ paddingTop: '3rem', paddingLeft: 5 }}
            >
              <Grid item style={{ width: '20%' }}>
                <Typography className={classes.data}>
                  {' '}
                  {element?.threshold}
                  {index + 1 === structure.length && '+'}
                </Typography>
              </Grid>
              <Grid
                item
                style={{
                  width: '30%',
                }}
              >
                <Typography className={classes.percentage} align="right">
                  {element?.rate}
                  {'%'}
                </Typography>
              </Grid>

              <Grid item style={{ width: '50%' }}>
                <div
                  style={{
                    backgroundColor: COLORS.PL_PRIMARY,
                    borderRadius: '0px 10px 10px 0px',
                    minWidth: '40%',
                    width:
                      index === 0
                        ? 'fit-content'
                        : String(Number(divWidth + index * 15)) + '%',
                    height: '120%',
                    alignItems: 'center',
                    display: 'flex',
                    paddingLeft: '2%',
                    color: 'white',
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 400,
                      fontSize: 13,
                    }}
                  >
                    {' '}
                    {'$'}
                    {element?.value === '62.5K' ? '65K' : element?.value}
                    {index + 1 === structure.length && '+'}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </WidgetCard>
    </>
  );
};

export default CommisionStructure;
