import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getDashboardData_getDashboardData as DashboardData } from '../../../gql/types';
import { COLORS } from '../../../plTheme';
import AvgDealSize from '../../molecules/AvgDealSize';
import CircularProgressWidget from '../../molecules/CircularProgressWidget';
import ClosedSales from '../../molecules/ClosedSales';
import ProductPortfolio from '../../molecules/ProductPortfolio';
import ProductPenetrationWidget from '../ProductPenetrationWidget/index';
import { _t_ } from '../../../utils/translation/translation';
import ProductPenetrationGraph from '../../molecules/ProductPenetrationGraph';

export interface SalesOutcomesProps {
  dashboardData: DashboardData | null | undefined;
  activeQuarter: number;
  previousYearDashboardData: DashboardData | null | undefined;
}

const SalesOutcomes: React.FC<SalesOutcomesProps> = ({
  dashboardData,
  activeQuarter,
  previousYearDashboardData,
}: SalesOutcomesProps) => {
  const { t } = useTranslation();

  const useStyles = makeStyles({
    outcomesHead: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      paddingTop: 30,
    },
    outcomeDiv: {
      padding: '25px 0px',
    },
    item: {
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
    },
    parent: {
      // border: "1px solid black",
      height: 530,
    },
    first: {
      flexGrow: 0,
      maxWidth: '21%',
      flexBasis: '21%',
    },
    second: {
      flexGrow: 0,
      maxWidth: '45%',
      flexBasis: '45%',
    },
    third: {
      flexGrow: 0,
      maxWidth: '34%',
      flexBasis: '34%',
    },
    fullWidth: {
      width: '100%',
    },
    largeCircularProgress: {
      height: 214,
    },
    productPortfolio: {
      paddingTop: 4,
    },
  });

  const avgDealSize =
    dashboardData?.salesOutcome?.totalSalesClosed?.overallTotalSalesClosed &&
    dashboardData?.salesOutcome?.noOfDeals &&
    dashboardData?.salesOutcome?.totalSalesClosed?.overallTotalSalesClosed /
      dashboardData?.salesOutcome?.noOfDeals;

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
      dashboardData?.salesOutcome?.totalSalesCycle[i]?.productCycle
        ?.toString()
        .slice(0, 3);
    SalesCycle.push([name, value]);
  }

  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" className={classes.outcomesHead}>
        {_t_('Sales Outcomes')}
      </Typography>
      <Grid
        container
        direction="row"
        className={classes.outcomeDiv}
        spacing={3}
      >
        <Grid item className={`${classes.parent} ${classes.first}`}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item className={classes.fullWidth}>
              <ClosedSales
                closed={
                  dashboardData?.salesOutcome?.totalSalesClosed
                    ?.overallTotalSalesClosed
                }
                existingClosed={
                  dashboardData?.salesOutcome?.totalSalesClosed
                    ?.existingTotalSalesClosed
                }
                forecast={dashboardData?.salesOutcome?.totalSalesForecast}
                reportInd={'main'}
              />
            </Grid>
            <Grid item className={classes.fullWidth}>
              <AvgDealSize
                avgDealSize={avgDealSize}
                dealsClosed={dashboardData?.salesOutcome?.noOfDeals}
                repInd={false}
              />
            </Grid>
            <Grid item className={classes.fullWidth}>
              <CircularProgressWidget
                title={_t_('Win Rate')}
                percentage={dashboardData?.salesOutcome?.winRate}
                variant={'small'}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} className={`${classes.parent} ${classes.second}`}>
          <Grid container direction="column" spacing={3}>
            <Grid item style={{ height: '219', width: '100%' }}>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={6} className={classes.largeCircularProgress}>
                  <CircularProgressWidget
                    title={_t_('Quota Attainment')}
                    percentage={dashboardData?.salesOutcome?.quotaAttainment}
                    variant={'large'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CircularProgressWidget
                    title={_t_('Portfolio Presented')}
                    percentage={dashboardData?.salesOutcome?.portfolioPresented}
                    variant={'large'}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ paddingTop: 4, width: '100%' }}>
              <ProductPortfolio
                salesClosed={
                  dashboardData?.salesOutcome?.totalSalesClosed
                    ?.overallTotalSalesClosed
                }
                data={dashboardData?.salesOutcome?.topProductContributors}
                previousYearData={
                  previousYearDashboardData?.salesOutcome
                    ?.topProductContributors
                }
                previousYearSalesClosed={
                  previousYearDashboardData?.salesOutcome?.totalSalesClosed
                    ?.overallTotalSalesClosed
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} className={`${classes.parent} ${classes.third}`}>
          <Grid container direction="column" spacing={3}>
            <Grid item style={{ height: 215, width: '100%' }}>
              <ProductPenetrationWidget
                penetrationData={
                  dashboardData?.salesOutcome?.productPenetration
                }
                activeQuarter={activeQuarter}
                totalDeals={dashboardData?.salesOutcome?.noOfDeals}
                reportInd={false}
              />
            </Grid>
            <Grid item style={{ paddingTop: 8, width: '100%' }}>
              <ProductPenetrationGraph
                data={SalesCycle}
                activeQuarter={activeQuarter}
                reportInd={false}
                chartTitle={'Sales cycle'}
                xAxisTitile={'DAYS'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SalesOutcomes;
