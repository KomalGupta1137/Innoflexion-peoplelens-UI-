import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PointerIcon from '../../../assets/Pointer.png';
import { COLORS } from '../../../plTheme';
import WidgetCard from '../../atoms/WidgetCard';
import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';
import { useGlobalStyles } from '../../../plStyles';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';

interface ClosedSalesProps {
  closed?: number | null;
  existingClosed?: number | null;
  forecast?: number | null;
  reportInd: string;
}

const ClosedSales: React.FC<ClosedSalesProps> = ({
  closed,
  existingClosed,
  forecast,
  reportInd,
}: ClosedSalesProps) => {
  const [width] = useWindowSize();
  const indicator =
    forecast && closed && closed > forecast ? (forecast / closed) * 100 : 99.8;
  const colorGradientIndicator =
    forecast && closed && closed < forecast ? (closed / forecast) * 100 : 100;

  const useStyles = makeStyles({
    main: {
      padding: reportInd == 'main' ? 19 : reportInd == 'report1' ? 17 : 16,
    },
    footer: {
      backgroundColor: COLORS.ALPHA_BACKGROUND_COLOR,
      width: '100%',
      height: reportInd == 'rep' ? '40' : '35',
      borderRadius: 4,
    },
    heading: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      textTransform: 'uppercase',
    },
    bar: {
      height: '3.6px',
      marginTop:
        width < 1500
          ? reportInd === 'main'
            ? 22
            : 10
          : reportInd === 'report2'
          ? 7
          : reportInd === 'main'
          ? 20
          : reportInd === 'report1'
          ? 15
          : 10,
      // width: reportInd === 'report1' ? '90%' : '100%',
      backgroundColor: COLORS.MAIN_HOVER_LIGHT,
      borderRadius: 4,
      marginBottom:
        width < 1500
          ? reportInd === 'rep'
            ? 5
            : reportInd === 'report2'
            ? -10
            : reportInd === 'main'
            ? 5
            : 7
          : reportInd === 'report2'
          ? -10
          : reportInd === 'report1'
          ? -1
          : 1,
      background:
        'linear-gradient(to right, ' +
        COLORS.PL_PRIMARY +
        ' ' +
        colorGradientIndicator.toString() +
        '%, ' +
        COLORS.MAIN_HOVER_LIGHT +
        ' 0%)',
    },
    pointer: {
      height: 17,
      marginTop: '-5px',
      marginLeft: `${indicator}%`,
      marginBottom: 3,
    },
    footerText: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      textTransform: 'uppercase',
    },
    footerValue: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    mainValue: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginTop: width < 1500 ? 10 : 12,
      marginLeft: -10,
      marginRight: 10,
    },
    footerDiv: {
      height: '100%',
      padding: '0 18px',
    },
    existingValue: {
      fontWeight: 500,
      lineHeight: '18px',
      fontSize: '14px',
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginTop: '7%',
    },
    existingValue1: {
      fontWeight: 500,
      lineHeight: '18px',
      fontSize: '14px',
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginTop: '-10%',
    },
    existingValueText: {
      fontSize: '14px',
      marginTop: '5%',
      marginLeft:
        width < 1500
          ? width < 1300
            ? reportInd === 'rep'
              ? '-5%'
              : '5%'
            : reportInd === 'rep'
            ? '-20%'
            : '-10%'
          : reportInd === 'report1' || reportInd === 'report2'
          ? '-20%'
          : '-40%',
    },
    existingValueText1: {
      fontSize: '14px',
      marginTop: '-13%',
      marginLeft:
        width < 1500
          ? width < 1300
            ? reportInd === 'rep'
              ? '-5%'
              : '5%'
            : reportInd === 'rep'
            ? '-20%'
            : '-10%'
          : reportInd === 'report1' || reportInd === 'report2'
          ? '-20%'
          : '-40%',
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  let newValue = existingClosed ? existingClosed : 0;
  newValue = closed ? closed - newValue : 0;

  return (
    <>
      <WidgetCard>
        <Grid
          container
          direction="column"
          justify="space-between"
          data-testid="TotalSalesColsed"
        >
          <Grid item className={classes.main}>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_('Total Sales Closed')}
            </Typography>
            <Grid item style={{ marginTop: 20 }}>
              <Grid container direction="row" justify="space-between">
                <Grid item xs={4}>
                  <Typography variant="h5" className={classes.existingValue}>
                    ${_n_(newValue, '0,0.0a')}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="h5"
                    className={classes.existingValueText}
                  >
                    {' '}
                    NEW{' '}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant={
                      width > 1500
                        ? reportInd === 'report2'
                          ? 'h3'
                          : 'h2'
                        : reportInd === 'rep'
                        ? 'h2'
                        : 'h3'
                    }
                    className={classes.mainValue}
                    data-testid="SalesClosedValue"
                    align="right"
                  >
                    ${closed && _n_(closed, '0,0.0a')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="space-between">
                <Grid item xs={4}>
                  <Typography variant="h5" className={classes.existingValue1}>
                    ${existingClosed && _n_(existingClosed, '0,0.0a')}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="h5"
                    className={classes.existingValueText1}
                  >
                    {' '}
                    EXISTING{' '}
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
              <Grid className={classes.bar} data-testid="salesclosedPointer">
                {closed && forecast && closed < forecast ? null : (
                  <img
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    data-testid="salesclosedimg"
                    src={PointerIcon}
                    className={classes.pointer}
                    alt="pointer"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.footer}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.footerDiv}
            >
              <Grid item>
                <Typography variant="h6" className={classes.footerText}>
                  {_t_('Forecast')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  className={classes.footerValue}
                  data-testid="foreCastValue"
                >
                  ${forecast && _n_(forecast, '0,0.0a')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default ClosedSales;
