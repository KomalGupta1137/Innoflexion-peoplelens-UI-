import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import PLChip from '../../atoms/PLChip/index';
import WidgetCard from '../../atoms/WidgetCard';

import { repDashboardData_RepDashboardData_rewards_commissionCases as CommisionCasesData } from '../../../gql/types';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';

interface CommisionCasesProps {
  data?: CommisionCasesData | null;
}

const CommisionCases: React.FC<CommisionCasesProps> = ({
  data,
}: CommisionCasesProps) => {
  const [width] = useWindowSize();
  const returnWidth = () => {
    if (width < 1350) {
      return 300;
    } else if (width > 1350 && width < 1800) {
      return 450;
    } else if (width > 1800) {
      return 700;
    }
  };
  const myDeals = [
    {
      deals: '',
      label: '',
    },
    {
      deals: '',
      label: '',
    },
  ];
  const jointSelling = [
    {
      selling: ' ',
      label: '',
    },
    {
      selling: '',
      label: '',
    },
  ];
  data?.myDeals?.forEach((element, index) => {
    myDeals[index].deals = element?.name ? element?.name : '';
    myDeals[index].label = element?.label ? element?.label : '';
  });
  data?.jointSelling?.forEach((element, index) => {
    jointSelling[index].selling = element?.name ? element?.name : '';
    jointSelling[index].label = element?.label ? element?.label : '';
  });

  const useStyles = makeStyles({
    root: {
      height:
        width == 1920
          ? 396
          : width == 2133
          ? 354
          : width == 2400
          ? 376
          : 'auto',
      padding: 16,
      background: '#D9D9D9',
      opacity: 0.6,
    },
    text: {
      fontFamily: 'Rubik',
      fontSize: 14,
      fontWeight: 300,
    },
    heading: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: 500,
      paddingBottom: 7,
    },
  });
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  return (
    <>
      {' '}
      <WidgetCard>
        <Grid
          container
          direction="column"
          className={classes.root}
          alignContent="center"
        >
          <Grid item style={{ width: '100%' }}>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_('Commission cases')} - {_t_('open')}
            </Typography>
          </Grid>
          <Grid
            item
            style={{ width: '100%', marginTop: '0.5em' }}
            direction="column"
          >
            <Typography className={classes.heading}>My Deals</Typography>
            {myDeals.map((element, index) => (
              <Grid
                container
                style={{ width: '100%', paddingTop: '4%' }}
                direction="row"
                key={index}
                spacing={1}
              >
                <Grid item style={{ width: '70%' }}>
                  <Typography className={classes.text}>
                    {index + 1}
                    {'. '}
                    {_t_(element.deals)}
                  </Typography>
                </Grid>
                <Grid item style={{ width: '30%' }}>
                  <Typography className={classes.text}>
                    {' '}
                    {element.label}
                  </Typography>
                  {/* <PLChip
                    label={element.label}
                    fixed={true}
                    variant={
                      element.label === 'In Progress' ? 'success' : 'primary'
                    }
                    dropDown={false}
                    width={'fixed'}
                  ></PLChip> */}
                </Grid>
              </Grid>
            ))}
            <Typography
              className={classes.heading}
              style={{ paddingTop: '4%' }}
            >
              {_t_('Joint Selling')}
            </Typography>
            {jointSelling.map((element, index) => (
              <Grid
                container
                style={{ width: '100%', paddingTop: '3%' }}
                direction="row"
                key={index}
                spacing={1}
              >
                <Grid item style={{ width: '70%' }}>
                  <Typography className={classes.text}>
                    {index + 1}
                    {'. '}
                    {_t_(element.selling)}
                  </Typography>
                </Grid>
                <Grid item style={{ width: '30%' }}>
                  <Typography className={classes.text}>
                    {_t_(element.label)}
                  </Typography>
                  {/* <PLChip
                    label={element.label}
                    fixed={true}
                    variant={
                      element.label === 'In Progress' ? 'success' : 'primary'
                    }
                    dropDown={false}
                    width={'fixed'}
                  ></PLChip> */}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default CommisionCases;
