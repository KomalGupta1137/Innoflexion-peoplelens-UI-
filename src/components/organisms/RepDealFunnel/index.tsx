/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useGlobalStyles } from '../../../plStyles';
import WidgetCard from '../../atoms/WidgetCard';
import FirstImage from '../../../assets/RepFunneImages/first.png';
import SecondImage from '../../../assets/RepFunneImages/second.png';
import ThirdImage from '../../../assets/RepFunneImages/third.png';
import FourthImage from '../../../assets/RepFunneImages/fourth.png';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';

interface DealFunnelProps {
  activeNegotiations?: number | null;
  opps?: number | null;
  meetings?: number | null;
  proposals?: number | null;
  deals?: number | null;
}

const RepDealFunnel: React.FC<DealFunnelProps> = ({
  activeNegotiations,
  opps,
  meetings,
  proposals,
  deals,
}: DealFunnelProps) => {
  const [width] = useWindowSize();

  const useStyles = makeStyles({
    root: {
      height: 372,
      padding: 16,
    },
    funnelDiv: {
      marginTop: '1.5rem',
    },
    textItem: {
      height: 60,
      marginBottom: 10,
      paddingTop: 18,
    },
    secondaryTextItem: {
      height: 60,
      marginBottom: 10,
      paddingTop: 6,
    },
    imageItem: {
      height: 70,
    },
    firstImage: {
      height: 60,
      width: width < 1700 ? 345 : 430,
    },
    secondImage: {
      height: 60,
      width: width < 1700 ? 264 : 332,
    },
    thirdImage: {
      height: 60,
      width: width < 1700 ? 184 : 230,
    },
    forthImage: {
      height: 60,
      width: width < 1700 ? 104 : 134,
    },
    imageContainer: {
      position: 'relative',
      textAlign: 'center',
      color: 'white',
    },
    textCentered: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    subtitle: {
      fontWeight: 300,
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <>
      <WidgetCard>
        <Grid className={classes.root}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography className={globalClasses.body1WidgetTitle}>
                Deal Funnel
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={globalClasses.h4Bold} color="textPrimary">
                Active Negotiations: {activeNegotiations}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.funnelDiv}
          >
            <Grid item style={{ flex: 25, height: 300 }}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item className={classes.textItem}>
                  <Typography variant="h5" color="textPrimary">
                    Opps
                  </Typography>
                </Grid>
                <Grid item className={classes.secondaryTextItem}>
                  <Typography variant="h5" color="textPrimary">
                    Meetings
                  </Typography>
                  <Typography
                    variant="h6"
                    className={classes.subtitle}
                    color="textPrimary"
                  >
                    (Discovery, Demo, Decision Maker)
                  </Typography>
                </Grid>
                <Grid item className={classes.textItem}>
                  <Typography variant="h5" color="textPrimary">
                    Proposals
                  </Typography>
                </Grid>
                <Grid item className={classes.textItem}>
                  <Typography variant="h5" color="textPrimary">
                    Deals
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ flex: 55, height: 300 }}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item className={classes.imageItem}>
                  <div className={classes.imageContainer}>
                    <img src={FirstImage} className={classes.firstImage} />
                    <div className={classes.textCentered}>
                      <Typography variant="h3">{opps}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item className={classes.imageItem}>
                  <div className={classes.imageContainer}>
                    <img src={SecondImage} className={classes.secondImage} />
                    <div className={classes.textCentered}>
                      <Typography variant="h3">{meetings}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item className={classes.imageItem}>
                  <div className={classes.imageContainer}>
                    <img src={ThirdImage} className={classes.thirdImage} />
                    <div className={classes.textCentered}>
                      <Typography variant="h3">{proposals}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item className={classes.imageItem}>
                  <div className={classes.imageContainer}>
                    <img src={FourthImage} className={classes.forthImage} />
                    <div className={classes.textCentered}>
                      <Typography variant="h3">{deals}</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ flex: 20 }}></Grid>
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default RepDealFunnel;
