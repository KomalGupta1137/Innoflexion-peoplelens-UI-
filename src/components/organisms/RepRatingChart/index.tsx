import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles } from '@material-ui/core';
import { _t_ } from '../../../utils/translation/translation';
import { COLORS } from '../../../plTheme';
import WidgetCard from '../../atoms/WidgetCard';
import RatingChart from '../../molecules/RatingChart';
import { useGlobalStyles } from '../../../plStyles';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import { RepDashboardData_RepDashboardData_okrSummary as competenciesData } from '../../../gql/types';
import { dates } from '../ManagerDashboard';
import { QueryResult, useQuery } from '@apollo/client';
import { RepDashboardData as DashboardData } from '../../../gql/types';
import { GetSalesOKR } from '../../../gql/queries/salesOKR';
import Loader from '../../atoms/Loader';

interface RepRatingChartWidgetProps {
  startDate?: string;
  endDate?: string;
}

const RepRatingChartWidget: React.FC<RepRatingChartWidgetProps> = ({
  startDate,
  endDate,
}: RepRatingChartWidgetProps) => {
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    ratingElement: {},
    reportsratingElement: {},
    subHeading: {
      // marginTop: 30,
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    root: {
      height: 410,
      padding: 15,
      backgroundColor: 'white',
    },
    heading: {
      // marginLeft: width < 1500 ? (width < 1300 ? -170 : -205) : -320,
    },
    chartElement1: {
      // marginRight: width < 1500 ? 60 : 40,
      marginTop: 20,
    },
    chartElement2: {
      // marginRight: width < 1500 ? 60 : 40,
      marginTop: width < 1500 ? -8 : -10,
    },
    subHeading1: {
      // marginTop: -10,
      // color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    subElement1: {},
    subElement2: {},
  });
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  // const [width] = useWindowSize();
  const {
    loading: loading2,
    error: error2,
    data: data2,
    refetch: refetch2,
  }: QueryResult<DashboardData> = useQuery(GetSalesOKR, {
    variables: {
      repDashboardInput: {
        startDate: startDate,
        endDate: endDate,
      },
    },
  });
  useEffect(() => {
    void refetch2();
  }, [refetch2]);

  if (loading2) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error2) return <>`Error! ${error2.message}` </>;
  const competencies = data2?.RepDashboardData?.okrSummary;
  return (
    <>
      <Grid container className={classes.root}>
        <Typography className={`${globalClasses.body1WidgetTitle}`}>
          {_t_('COMPETENCIES')}
        </Typography>
        <Grid container direction="column" data-testid="RatingChart">
          <Grid item>
            <Grid container direction="column" style={{ paddingLeft: 15 }}>
              {competencies &&
                competencies?.competency &&
                competencies?.competency?.map((element, index) =>
                  index === 0 ? (
                    <>
                      {element &&
                        element.values &&
                        element.values?.map((innerElement, index) => (
                          <Grid
                            key={index}
                            container
                            direction="row"
                            justify="space-between"
                            style={{ marginTop: '2.2rem' }}
                          >
                            <Grid item className={classes.heading} xs={6}>
                              <Typography
                                className={
                                  index === 0
                                    ? `${classes.subHeading}`
                                    : `${classes.subHeading1}`
                                }
                                variant="h5"
                              >
                                {innerElement?.title}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              className={
                                index === 0
                                  ? `${classes.chartElement2}`
                                  : `${classes.chartElement2}`
                              }
                              xs={6}
                            >
                              {' '}
                              <RatingChart
                                value={Math.ceil(
                                  innerElement?.managerScore
                                    ? innerElement?.managerScore
                                    : 0,
                                )}
                                indicator={'customized'}
                              />
                            </Grid>
                          </Grid>
                        ))}
                    </>
                  ) : (
                    <></>
                  ),
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RepRatingChartWidget;
