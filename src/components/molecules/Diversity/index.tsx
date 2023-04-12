/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Box, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import FemaleIcon from '../../../assets/female_pink.png';
import { COLORS } from '../../../plTheme';
import MaleIcon from '../../../assets/men.png';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import { _t_ } from '../../../utils/translation/translation';
import { useGlobalStyles } from '../../../plStyles';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

export interface DiversityProps {
  male?: number | null;
  female?: number | null;
  target?: number | null;
  quarter: number;
  targetYear?: number | null;
  total?: number | null;
  reports: boolean | null;
}

const Diversity: React.FC<DiversityProps> = ({
  male,
  female,
  target,
  quarter,
  targetYear,
  total,
  reports,
  ...props
}: DiversityProps) => {
  // const footerMargin = female && total && (female / total) * 100 + target && female && target - female;
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    root: {
      height: 154,
      padding: 16,
      boxSizing: 'border-box',
    },
    mainDiv: {
      height: 110,
      padding: '0 10px 0 14px',
    },
    genderIcon: {
      width: 12,
      height: 24,
    },
    quarter: {
      marginRight: 6,
      marginTop: 10,
    },
    barDiv: {
      marginTop: '10px',
    },
    diversityBar: {
      width: '100%',
      height: 8,
      borderRadius: '1px',
      background: `linear-gradient(90deg, ${COLORS.PINK_FEMALE_INDICATOR} ${
        female && total && (female / total) * 100
      }%, ${COLORS.BLUE_MALE_INDICATOR} ${
        female && total && (female / total) * 100
      }%, ${COLORS.BLUE_MALE_INDICATOR} ${
        male && female && total && ((male + female) / total) * 100
      }%,  ${COLORS.NEUTRAL_INDICATOR} ${
        male && female && total && ((male + female) / total) * 100
      }%)`,
      marginTop: '-30px',
    },
    ratio: {
      fontWeight: 300,
    },
    targetDiv: {
      fontWeight: 400,
      paddingRight: 10,
    },
    target: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    title: {
      textTransform: 'uppercase',
    },
    arrowDiv: {
      width: '100%',
      marginLeft:
        target && target > 0 ? `${target - 4}%` : `${target && target - 3}%`,
      marginTop: '-30px',
    },
    maleIcon: {
      width: 10,
      height: 25,
    },
    footer: {
      width: '100%',
      marginLeft:
        target && target > 0 ? `${target - 15}%` : `${target && target - 10}%`,
      marginTop: '-5px',
    },
    topHeading: {
      marginBottom: '23px',
      paddingLeft: 5,
    },
    footerArrow: {
      height: 25,
      width: 25,
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <>
      <Box flexWrap="wrap">
        <Grid className={classes.root}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={globalClasses.body1WidgetTitle}
          >
            {_t_('Diversity')}
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.mainDiv}
            spacing={2}
          >
            <Grid item style={{ width: '8%' }}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.quarter}
              >
                Q{quarter + 1}
              </Typography>
            </Grid>
            <Grid item style={{ width: '8%' }}>
              <img src={FemaleIcon} className={classes.genderIcon} />
            </Grid>
            <Grid item style={{ width: '75%' }}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                className={classes.barDiv}
              >
                <Grid item>
                  {/* <Typography
                  variant="h2"
                  color="textPrimary"
                  className={classes.ratio}
                >
                  {female && total && Math.round((female / total) * 100)} (F) :{' '}
                  {male && total && Math.round((male / total) * 100)} (M)
                </Typography> */}
                  <Grid container direction="row" alignItems="center">
                    <Grid item className={classes.topHeading}>
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        className={classes.ratio}
                        data-testid="diversity_F_Ratio"
                      >
                        {female && total && Math.round((female / total) * 100)}%
                        (F) :{' '}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.topHeading}>
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        className={classes.ratio}
                        data-testid="diversity_M_Ratio"
                      >
                        {male && total && Math.round((male / total) * 100)}% (M)
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <div id="bar" className={classes.diversityBar}></div>
                </Grid>
                <Grid item>
                  <Grid container justify="space-between" direction="column">
                    <Grid item className={classes.arrowDiv}>
                      <ArrowDropUpIcon className={classes.footerArrow} />
                    </Grid>
                    <Grid item className={classes.footer}>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        className={classes.targetDiv}
                      >
                        <span className={classes.target}>{target + '%'} </span>
                        (Target {targetYear})
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ width: '8%' }}>
              <img src={MaleIcon} className={classes.maleIcon} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Diversity;
