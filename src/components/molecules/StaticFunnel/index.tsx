import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { COLORS, plTheme } from '../../../plTheme';
import funnelImage1 from '../../../assets/FunnelImages/funnelImage1.png';
import funnelImage2 from '../../../assets/FunnelImages/funnelImage2.png';
import funnelImage3 from '../../../assets/FunnelImages/funnelImage3.png';

import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';

import { useWindowSize } from '../../../utils/hooks/useWindowSize';

interface FunnelProps {
  totalNoOfCandidates: number;
  totalNoOfHired: number;
  totalNoOfInterviewed: number;
}

const StaticFunnel: React.FC<FunnelProps> = ({
  totalNoOfCandidates,
  totalNoOfHired,
  totalNoOfInterviewed,
}: FunnelProps) => {
  const [width] = useWindowSize();

  const useStyles = makeStyles({
    interviewHeading: {
      marginTop: 8,
    },
    hireHeading: {
      marginTop: 10,
    },
    headingSmallScreen: {
      marginLeft: '21.38px',
    },
    headingLargeScreen: {
      marginLeft: '21.38px',
    },
    funnelImage1LargeScreen: {
      height: '74.8px',
      width: width > 1610 ? '380px' : '250px',
      marginRight: '19.34px',
    },
    funnelImage1SmallScreen: {
      height: '74.8px',
      width: '180px',
      marginRight: '19.34px',
    },
    image: {
      position: 'relative',
    },
    funnelImage1Data: {
      left: -10,
      position: 'absolute',
      textAlign: 'center',
      top: '20px',
      width: '100%',
      color: COLORS.GENERAL_WHITE,
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.h3.fontSize,
      fontWeight: plTheme.typography.h3.fontWeight,
      lineHeight: plTheme.typography.h3.lineHeight,
      fontStyle: plTheme.typography.h3.fontStyle,
    },
    funnelImage2DataLargeScreen: {
      left: width > 1610 ? -40 : -30,
      position: 'absolute',
      textAlign: 'center',
      top: '35px',
      width: '100%',
      color: COLORS.GENERAL_WHITE,
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.h3.fontSize,
      fontWeight: plTheme.typography.h3.fontWeight,
      lineHeight: plTheme.typography.h3.lineHeight,
      fontStyle: plTheme.typography.h3.fontStyle,
    },
    funnelImage2DataSmallScreen: {
      left: -25,
      position: 'absolute',
      textAlign: 'center',
      top: '35px',
      width: '100%',
      color: COLORS.GENERAL_WHITE,
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.h3.fontSize,
      fontWeight: plTheme.typography.h3.fontWeight,
      lineHeight: plTheme.typography.h3.lineHeight,
      fontStyle: plTheme.typography.h3.fontStyle,
    },
    funnelImage3DataLargeScreen: {
      left: width > 1610 ? -70 : -50,
      position: 'absolute',
      textAlign: 'center',
      top: '25px',
      width: '100%',
      color: COLORS.GENERAL_WHITE,
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.h3.fontSize,
      fontWeight: plTheme.typography.h3.fontWeight,
      lineHeight: plTheme.typography.h3.lineHeight,
      fontStyle: plTheme.typography.h3.fontStyle,
    },
    funnelImage3DataSmallScreen: {
      left: -40,
      position: 'absolute',
      textAlign: 'center',
      top: '25px',
      width: '100%',
      color: COLORS.GENERAL_WHITE,
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.h3.fontSize,
      fontWeight: plTheme.typography.h3.fontWeight,
      lineHeight: plTheme.typography.h3.lineHeight,
      fontStyle: plTheme.typography.h3.fontStyle,
    },
    funnelImage2LargeScreen: {
      height: '83.3px',
      width: width > 1610 ? '270px' : '170px',
      marginRight: width > 1610 ? '75px' : '60px',
      marginTop: '9.75px',
    },
    funnelImage2SmallScreen: {
      height: '83.3px',
      width: '120px',
      marginRight: '50px',
      marginTop: '9.75px',
    },
    funnelImage3LargeScreen: {
      height: '59.68px',
      width: width > 1610 ? '140px' : '90px',
      marginRight: width > 1610 ? '140px' : '100px',
      marginTop: '9.75px',
    },
    funnelImage3SmallScreen: {
      height: '59.68px',
      width: '60px',
      marginRight: '80px',
      marginTop: '9.75px',
    },
  });
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1300px)');

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid
          container
          justify="space-between"
          direction="row"
          alignItems="center"
        >
          <Grid
            item
            className={
              matches
                ? `${classes.headingLargeScreen}`
                : `${classes.headingSmallScreen}`
            }
          >
            <Typography variant="h5" color="textPrimary">
              {_t_('Candidates')}
            </Typography>
          </Grid>
          <Grid item>
            <div className={classes.image}>
              <img
                data-testid="funnelImage1"
                src={funnelImage1}
                className={classes.funnelImage1LargeScreen}
                alt=" "
              />
              <div
                className={classes.funnelImage1Data}
                data-testid="totalCandidates"
              >
                {_n_(totalNoOfCandidates, '0,0')}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          justify="space-between"
          direction="row"
          alignItems="center"
        >
          <Grid
            item
            className={
              matches
                ? `${classes.headingLargeScreen}`
                : `${classes.headingSmallScreen}`
            }
          >
            <Typography
              variant="h5"
              color="textPrimary"
              className={classes.interviewHeading}
            >
              {_t_('Interviewed')}
            </Typography>
          </Grid>
          <Grid item>
            <div className={classes.image}>
              <img
                data-testid="funnelImage2"
                src={funnelImage2}
                className={classes.funnelImage2LargeScreen}
                alt=" "
              />
              <div
                className={
                  matches
                    ? `${classes.funnelImage2DataLargeScreen}`
                    : `${classes.funnelImage2DataSmallScreen}`
                }
                data-testid="interviewed"
              >
                {_n_(totalNoOfInterviewed, '0,0')}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          justify="space-between"
          direction="row"
          alignItems="center"
        >
          <Grid
            item
            className={
              matches
                ? `${classes.headingLargeScreen}`
                : `${classes.headingSmallScreen}`
            }
          >
            <Typography
              variant="h5"
              color="textPrimary"
              className={classes.hireHeading}
            >
              {_t_('Hires')}
            </Typography>
          </Grid>
          <Grid item>
            <div className={classes.image}>
              <img
                data-testid="funnelImage3"
                src={funnelImage3}
                className={classes.funnelImage3LargeScreen}
                alt=" "
              />
              <div
                data-testid="hires"
                className={
                  matches
                    ? `${classes.funnelImage3DataLargeScreen}`
                    : `${classes.funnelImage3DataSmallScreen}`
                }
              >
                {_n_(totalNoOfHired, '0,0')}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StaticFunnel;
