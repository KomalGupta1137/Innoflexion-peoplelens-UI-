import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import OKRStat from '../../molecules/OKRStat';
import { RepDashboardData_RepDashboardData_okrName as dashboardData } from '../../../gql/types';
interface SalesOKRProps {
  salesokr: (dashboardData | null)[] | null | undefined;
}

const SalesOKR: React.FC<SalesOKRProps> = ({ salesokr }: SalesOKRProps) => {
  const useStyles = makeStyles({
    root: {
      padding: 16,
      height: 560,
    },
    mainDiv: {
      marginTop: '2.03rem',
      borderBottom: '0.125rem solid ' + COLORS.BORDER_PRIMARY,
      paddingBottom: '0.2rem',
    },
    activityScore: {
      fontWeight: 500,
    },
    value: {
      backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
      lineHeight: '28px',
      padding: '0 16px',
      width: 92,
      textAlign: 'center',
    },
    insideDiv: {
      marginTop: '1.2rem',
    },
    stats: {
      marginTop: '0.4rem',
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <>
      <WidgetCard>
        <Grid className={classes.root}>
          <Typography className={globalClasses.body1WidgetTitle}>
            {_t_('Sales OKR')}
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.mainDiv}
          >
            <Grid item style={{ flex: 55 }}>
              <Typography className={globalClasses.h5Bold} color="textPrimary">
                OKR
              </Typography>
            </Grid>
            <Grid item style={{ flex: 35 }}>
              <Typography className={globalClasses.h5Bold} color="textPrimary">
                Key Result
              </Typography>
            </Grid>
          </Grid>
          {salesokr?.map((element, index) => (
            <>
              {element?.title === 'Activity' && element.value?.length === 1 ? (
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="flex-start"
                  className={classes.insideDiv}
                >
                  <Grid item style={{ width: '61%' }}>
                    <Typography
                      color="textPrimary"
                      className={`${globalClasses.body1Light} ${classes.activityScore}`}
                    >
                      {index + 1}
                      {'. '} {element?.title}{' '}
                    </Typography>
                  </Grid>

                  <Grid item style={{ flex: '29%' }}>
                    <Typography
                      color="textPrimary"
                      className={`${globalClasses.body1Light} ${classes.value}`}
                    >
                      {element && element.value && element.value[0]?.value}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <div className={classes.insideDiv}>
                  <Typography
                    color="textPrimary"
                    className={`${globalClasses.body1Light} ${classes.activityScore}`}
                  >
                    {index + 1}
                    {'. '} {element?.title}
                  </Typography>
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    className={classes.stats}
                  >
                    {element?.value &&
                      element?.value?.map((element) => (
                        <Grid item key={element?.title}>
                          <OKRStat
                            title={element?.title ? element?.title : ''}
                            value={element?.value ? element?.value : ''}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </div>
              )}
            </>
          ))}
        </Grid>
      </WidgetCard>
    </>
  );
};

export default SalesOKR;
