/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import WidgetCard from '../../atoms/WidgetCard';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';
import { useGlobalStyles } from '../../../plStyles';

export interface SDRAvgDealSizeProps {
  avgDealSize?: number | null;
  dealsClosed?: number | null;
  repInd: boolean;
  funnelData: any;
}

const SDRAvgDealSize: React.FC<SDRAvgDealSizeProps> = ({
  avgDealSize,
  dealsClosed,
  repInd,
  funnelData,
}: SDRAvgDealSizeProps) => {
  const useStyles = makeStyles({
    root: {
      height: '100%',
      // padding: 16,
    },
    heading: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      textTransform: 'uppercase',
    },
    heading1: {
      fontFamily: 'Rubik',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 14,
      color: '#171F46',
    },
    textTransformation: {
      display: 'inline-block',
      width: '250px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
    },
    textcolor: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      fontSize: 18,
      paddingRight: 8,
    },
    productColor: {
      color: COLORS.WIDGET_TITLE,
      fontSize: '14px',
      lineHeight: '24px',
    },

    mainValue: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginTop: 22,
      marginBottom: 14,
    },
    repSpacing: {
      marginTop: repInd ? 10 : 0,
    },
  });

  const classes = useStyles();

  // const getStartDateOfQuery = () => {
  //   const outputDate = new Date(dates[activeQuarter].startDate);
  //   const newDate = addWeeks(outputDate, selectedOption - 1);
  //   const nextDay = addDays(newDate, 1);
  //   return nextDay.toISOString();
  // };

  // const getEndDateOfQuery = () => {
  //   const outputDate = new Date(dates[activeQuarter].startDate);
  //   let newDate = addWeeks(outputDate, selectedOption - 1);
  //   newDate = addDays(newDate, 8);
  //   newDate = addMinutes(newDate, -1);
  //   return newDate.toISOString();
  // };

  // useEffect(() => {
  //   void funnelRefetch();
  // }, [activeQuarter]);

  // if (funnelLoading) {
  //   return (
  //     <>
  //       <Grid style={{ width: '90%', height: 750 }}>
  //         <Loader />
  //       </Grid>
  //     </>
  //   );
  // }

  const avgdealSize = avgDealSize && _n_(avgDealSize, '0,0.0a');

  const globalClasses = useGlobalStyles();

  return (
    <>
      <WidgetCard>
        <Grid
          container
          direction="column"
          className={classes.root}
          data-testid="avgDealSize"
          style={{
            padding: '17px 0 16px 17px',
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.textTransformation}
              style={{ height: 24 }}
            >
              <span className={globalClasses.body1WidgetTitle}>
                {_t_('Activity')}
              </span>
            </Typography>
            <Grid item container direction="row" spacing={3}>
              <Grid item style={{ width: '33.3%', paddingBottom: '2%' }}>
                <Typography className={classes.heading1}>
                  {funnelData?.peopleActivities?.dealFunnel?.meetings}
                </Typography>
              </Grid>
              <Grid item style={{ width: '33.3%', paddingBottom: '2%' }}>
                <Typography className={classes.heading1}>
                  {funnelData?.peopleActivities?.dealFunnel?.opps}
                </Typography>
              </Grid>
              <Grid item style={{ width: '33.3%', paddingBottom: '2%' }}>
                <Typography className={classes.heading1}>
                  {funnelData?.peopleActivities?.dealFunnel?.activeNegotiations}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item style={{ width: '33.3%', paddingBottom: '2%' }}>
                <Typography className={classes.heading1}>
                  {_t_('Meetings')}
                </Typography>
              </Grid>
              <Grid item style={{ width: '33.3%', paddingBottom: '2%' }}>
                <Typography className={classes.heading1}>
                  {_t_('Opps')}
                </Typography>
              </Grid>
              <Grid item style={{ width: '33.3%', paddingBottom: '2%' }}>
                <Typography className={classes.heading1}>
                  {_t_('Pipe')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            style={{
              flexGrow: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></Grid>
          <Grid
            item
            style={{
              flexGrow: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></Grid>
          <Grid
            item
            style={{
              flexGrow: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.textTransformation}
              style={{ height: 24, lineHeight: 'normal', overflow: 'visible' }}
            >
              <span className={globalClasses.body1WidgetTitle}>
                {_t_('avG. deal size (ACV )(On Sourced OPPS)')}
              </span>
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              className={`${classes.textTransformation} ${classes.repSpacing}`}
              style={{ height: 28, lineHeight: 'normal' }}
            >
              <span className={classes.textcolor}>${avgdealSize}</span>
            </Typography>
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default SDRAvgDealSize;
