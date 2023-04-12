import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';
import { useGlobalStyles } from '../../../plStyles';

export interface AttritionRateProps {
  currVal?: number | null;
  prevVal?: number | null;
}

const AttritionRate: React.FC<AttritionRateProps> = ({
  currVal,
  prevVal,
}: AttritionRateProps) => {
  const isPositive =
    currVal !== null &&
    currVal !== undefined &&
    prevVal !== null &&
    prevVal !== undefined &&
    prevVal - currVal >= 0
      ? true
      : false;

  const useStyles = makeStyles({
    root: {
      height: '100%',
      // padding: matches ? '20px 0px 0px 14px' : '20px 0px 0px 14px',
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
    prevValue: {
      color: isPositive
        ? COLORS.GENERAL_CHART_GREEN
        : COLORS.ARROW_PRIMARY_COLOR,
      marginTop: 40,
      marginBottom: 14,
      fontWeight: 400,
    },
    arrow: {
      fontSize: 20,
      color: isPositive ? '#2DCA73' : '#FF0B37',
    },
    arrowGrid: {
      marginTop: 30,
      marginLeft: 12, // matches ? 5 : 12,
      transform: 'translateY(8px)',
    },
    titleDiv: {
      width: 120,
    },
  });

  const classes = useStyles();

  const currRate =
    currVal !== null && currVal !== undefined && _n_(currVal, '0.0');

  const diffRate =
    currVal !== null &&
    currVal !== undefined &&
    prevVal !== null &&
    prevVal !== undefined &&
    _n_(Math.abs(currVal - prevVal), '0.0');

  const diff =
    currVal !== null &&
    currVal !== undefined &&
    prevVal !== null &&
    prevVal !== undefined &&
    _n_(Math.abs(currVal - prevVal), '0.0');

  const globalClasses = useGlobalStyles();
  return (
    <>
      <Box flexWrap="wrap">
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          className={classes.root}
          data-testid="attritionRate"
        >
          <Grid item className={classes.titleDiv}>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_('Attrition Rate')}
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item>
              <Typography
                variant="h1"
                className={classes.currValue}
                data-testid="Attrition_currentRate"
              >
                {currRate}%
              </Typography>
            </Grid>
            <Grid item className={classes.arrowGrid}>
              {Number(diff) > 0 &&
                (isPositive ? (
                  <span className={classes.arrow}>&#9660;</span>
                ) : (
                  <span className={classes.arrow}>&#9652;</span>
                ))}
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                className={classes.prevValue}
                data-testid="Attrition_diffRate"
              >
                {diffRate}%
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AttritionRate;
