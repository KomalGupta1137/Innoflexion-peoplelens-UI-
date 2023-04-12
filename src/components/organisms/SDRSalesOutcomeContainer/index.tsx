import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';

import { _t_ } from '../../../utils/translation/translation';

import AvgDealSize from '../../molecules/AvgDealSize';
import CircularProgressWidget from '../../molecules/CircularProgressWidget';
import RepProductPortfolio from '../../molecules/RepProductPortfolio';
import ProductPenetrationGraph from '../../molecules/ProductPenetrationGraph';

import ClosedSales from '../../molecules/ClosedSales';

// import ClosedSalesNew from '../../molecules/ClosedSalesNew';
import {
  getDashboardData as DashboardResponse,
  peopleactivityQuery,
} from '../../../gql/types';

import {
  GetDashboardData,
  GetPeopleActivitiesData,
} from '../../../gql/queries/dashboard';
import Loader from '../../atoms/Loader';
import { QueryResult, useQuery } from '@apollo/client';
import { ProductColorContext } from '../../../utils/productColorContext';
import SDRClosedSales from '../../molecules/SDRClosedSales';
import SDRAvgDealSize from '../../molecules/SDRAvgDealSize';

interface SDRSalesOutcomeContainerProps {
  startDate: string;
  endDate: string;
  activeQuarter: number;
}

const useStyles = makeStyles({
  mainDiv: {
    marginTop: '0.8rem',
  },
});

const SDRSalesOutcomeContainer: React.FC<SDRSalesOutcomeContainerProps> = ({
  startDate,
  endDate,
  activeQuarter,
}: SDRSalesOutcomeContainerProps) => {
  const previousStartDate = new Date(startDate);
  const previousEndDate = new Date(endDate);
  const previousStartDateNew = new Date(
    previousStartDate.setMonth(previousStartDate.getMonth() - 12),
  ).toISOString();
  const previousEndDateNew = new Date(
    previousEndDate.setMonth(previousEndDate.getMonth() - 12) - 1000,
  ).toISOString();

  const { ProductColorMap, setProductColorMap } = React.useContext(
    ProductColorContext,
  );

  const classes = useStyles();
  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: startDate,
        endDate: endDate,
        userId: '',
      },
    },
  });

  const {
    loading: loading3,
    error: error3,
    data: data3,
    refetch: refetch3,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: previousStartDateNew,
        endDate: previousEndDateNew,
        userId: '',
      },
    },
  });

  const {
    loading: funnelLoading,
    data: funnelData,
    error: funnelError,
    refetch: funnelRefetch,
  }: QueryResult<peopleactivityQuery> = useQuery(GetPeopleActivitiesData, {
    variables: {
      dashboardInput: {
        startDate: startDate,
        endDate: endDate,
        // quarter: activeQuarter,
        // week: selectedOption,
      },
      userId: localStorage.getItem('userId'),
    },
  });

  useEffect(() => {
    refetch;
  }, [startDate, endDate]);

  useEffect(() => {
    funnelRefetch;
  }, [startDate, endDate]);

  useEffect(() => {
    setProductColorMap(data?.getDashboardData?.productColorMap);
  }, [data]);

  if (loading || funnelLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error || funnelError) return <>`Error! ${error?.message}` </>;
  if (loading3) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error3) return <>`Error! ${error3.message}` </>;
  const dashboardData = data?.getDashboardData;
  const previousYearDashboardData = data3?.getDashboardData;
  const SalesCycle = [];
  dashboardData?.salesOutcome?.totalSalesCycle;
  const SalesCycleLen = dashboardData?.salesOutcome?.totalSalesCycle
    ? dashboardData?.salesOutcome?.totalSalesCycle?.length
    : 0;
  for (let i = 0; i < SalesCycleLen; i++) {
    const name =
      dashboardData?.salesOutcome?.totalSalesCycle &&
      dashboardData?.salesOutcome?.totalSalesCycle[i]?.product?.name;
    const value =
      dashboardData?.salesOutcome?.totalSalesCycle &&
      dashboardData?.salesOutcome?.totalSalesCycle[i]?.productCycle;
    SalesCycle.push([name, value]);
  }

  const avgDealSize =
    dashboardData?.salesOutcome?.totalSalesClosed?.overallTotalSalesClosed &&
    dashboardData?.salesOutcome?.noOfDeals &&
    dashboardData?.salesOutcome?.totalSalesClosed?.overallTotalSalesClosed /
      dashboardData?.salesOutcome?.noOfDeals;

  return (
    <Grid container direction="row" spacing={3} className={classes.mainDiv}>
      <Grid item style={{ flex: 35 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item style={{ flex: '33.3%' }}>
            <div style={{ height: 192 }}>
              <SDRClosedSales
                closed={
                  dashboardData?.salesOutcome?.totalSalesClosed
                    ?.overallTotalSalesClosed
                }
                existingClosed={
                  dashboardData?.salesOutcome?.totalSalesClosed
                    ?.existingTotalSalesClosed
                }
                forecast={dashboardData?.salesOutcome?.totalSalesForecast}
                reportInd={'rep'}
              />
            </div>
          </Grid>
          <Grid item style={{ flex: '33.3%' }}>
            <div style={{ height: 192 }}>
              <SDRAvgDealSize
                avgDealSize={avgDealSize}
                dealsClosed={dashboardData?.salesOutcome?.noOfDeals}
                repInd={true}
                funnelData={funnelData}
              />
            </div>
          </Grid>
          <Grid item style={{ flex: '33.3%' }}>
            <ProductPenetrationGraph
              data={SalesCycle}
              activeQuarter={0}
              reportInd={true}
              repLens={true}
              chartTitle={'Sales cycle (On Opps created)'}
              xAxisTitile={'DAYS'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ flex: 62 }}>
        <Grid container direction="column" spacing={3}>
          <Grid item style={{ flex: '33.3%' }}>
            {' '}
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <div style={{ height: 192 }}>
                  <SDRClosedSales
                    closed={
                      dashboardData?.salesOutcome?.totalSalesClosed
                        ?.overallTotalSalesClosed
                    }
                    existingClosed={
                      dashboardData?.salesOutcome?.totalSalesClosed
                        ?.existingTotalSalesClosed
                    }
                    forecast={dashboardData?.salesOutcome?.totalSalesForecast}
                    reportInd={'rep'}
                    widget={'Profitability'}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ height: 192 }}>
                  <CircularProgressWidget
                    title={_t_('Win Rate (On Opps created)')}
                    percentage={dashboardData?.salesOutcome?.winRate}
                    variant={'large'}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ flex: '66.67%', height: 1000 }}>
            {' '}
            <RepProductPortfolio
              salesClosed={
                dashboardData?.salesOutcome?.totalSalesClosed
                  ?.overallTotalSalesClosed
              }
              portfolioPresented={
                dashboardData?.salesOutcome?.portfolioPresented
              }
              data={dashboardData?.salesOutcome?.topProductContributors}
              previousYearData={
                previousYearDashboardData?.salesOutcome?.topProductContributors
              }
              previousYearSalesClosed={
                previousYearDashboardData?.salesOutcome?.totalSalesClosed
                  ?.overallTotalSalesClosed
              }
              lens={'SDR'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SDRSalesOutcomeContainer;
