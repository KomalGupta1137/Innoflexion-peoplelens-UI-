import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import WidgetCard from '../../atoms/WidgetCard';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS, plTheme } from '../../../plTheme';

import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';
import PieChart from '../../atoms/PieChart';
import { getDashboardData_getDashboardData_salesOutcome_topProductContributors as DashboardTopProductContributors } from '../../../gql/types';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import PortfolioPieChart from '../PortfolioPieChart';

interface RepProductPortfolioProps {
  salesClosed?: number | null;
  portfolioPresented?: number | null;
  data?: (DashboardTopProductContributors | null)[] | null;
  previousYearData?: (DashboardTopProductContributors | null)[] | null;
  previousYearSalesClosed?: number | null;
  isInReport?: boolean;
  lens?: string;
}

interface InitData {
  name: string;
  color: string;
  y: number;
}

interface InitData2 {
  name: string;
  y: number;
}

const RepProductPortfolio: React.FC<RepProductPortfolioProps> = ({
  salesClosed,
  portfolioPresented,
  data,
  previousYearData,
  previousYearSalesClosed,
  isInReport,
  lens,
}: RepProductPortfolioProps) => {
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    subElement: {
      marginTop: 14,
      fontWeight: plTheme.typography.h5.fontWeight,
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    internalSubElement: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    pieElement: {
      marginTop: width < 1500 ? '11%' : '10%',
    },
    subElement1: {
      marginTop: '1%',
      marginBottom: 6.82,
      fontWeight: plTheme.typography.h5.fontWeight,
    },
    root: {
      height: 396,
    },
    yyDiv: {
      // marginTop: '1rem',
      height: 37,
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [chartData, setChartData] = useState<InitData[]>([]);
  const [previousChartData, setPreviousChartData] = useState<InitData2[]>([]);

  useEffect(() => {
    const chartColors = [
      COLORS.MAIN_BLUE_PRESSED,
      COLORS.MAIN_HUE_2,
      COLORS.MAIN_BLUE_HOVER,
    ];
    const loadData = () => {
      if (!data) {
        return;
      }
      const tempData: InitData[] = [];

      let percentageOccupied = 0;
      for (let i = 0; i < data?.length; i++) {
        const obj: InitData = {
          name: '',
          color: '',
          y: 0,
        };
        const totalAmount = data[i]?.totalAmount;
        const itemPercentage =
          totalAmount && salesClosed && (totalAmount / salesClosed) * 100;
        const productname = data[i]?.product?.name;
        obj.name = productname ? productname : 'Product' + (i + 1).toString();
        obj.y = totalAmount ? totalAmount : 0;
        obj.color = chartColors[i];
        if (itemPercentage) {
          percentageOccupied += itemPercentage;
        }
        tempData.push(obj);
      }
      if (tempData && Math.round(percentageOccupied) < 100) {
        tempData[3].y = 100 - percentageOccupied;
      } else {
        tempData.splice(3, 1);
      }

      setChartData(tempData);
    };

    data && loadData();
  }, [data, salesClosed]);

  useEffect(() => {
    const loadData2 = () => {
      if (!previousYearData) {
        return;
      }
      const tempData: InitData2[] = [];
      for (let i = 0; i < previousYearData?.length; i++) {
        const obj: InitData2 = {
          name: '',
          y: 0,
        };
        const totalAmount = previousYearData[i]?.totalAmount;
        const productname = previousYearData[i]?.product?.name;
        obj.name = productname ? productname : 'Product' + (i + 1).toString();
        obj.y = totalAmount ? totalAmount : 0;
        tempData.push(obj);
      }
      setPreviousChartData(tempData);
    };

    previousYearData && loadData2();
  }, [previousYearData, previousYearSalesClosed]);

  return (
    <WidgetCard>
      <Grid item container direction="row" className={classes.root}>
        <Grid item style={{ flex: 30 }} xs={4}>
          <Grid container direction="column">
            <Grid item style={{ padding: '16px 0px 0px 16px' }}>
              <Typography className={globalClasses.body1WidgetTitle}>
                {_t_('PRODUCT PORTFOLIO')}
              </Typography>
            </Grid>
            <Grid item style={{ padding: '0px 0px 0px 16px' }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
                className={classes.yyDiv}
              >
                <Grid item>
                  <Typography className={`${globalClasses.body1Light}`}>
                    {lens == 'SDR' ? (
                      <>{_t_('Bookings (Sourced)')}</>
                    ) : (
                      <> {_t_('OVERALL SALES')}</>
                    )}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h3"
                    className={classes.internalSubElement}
                    style={{ marginBottom: '3px' }}
                  >
                    ${salesClosed && _n_(salesClosed, '0,0.0a')}
                  </Typography>
                </Grid>
              </Grid>
              {lens == 'SDR' ? (
                <></>
              ) : (
                <>
                  <Typography className={`${globalClasses.body1Light} `}>
                    {_t_('(Y/Y growth)')}
                  </Typography>
                </>
              )}

              <Grid item>
                <Typography
                  className={`${globalClasses.body1WidgetTitle} ${classes.subElement}`}
                >
                  {_t_('PORTFOLIO PRESENTED')}
                </Typography>
                <Typography variant="h3" className={classes.internalSubElement}>
                  {portfolioPresented &&
                    Math.trunc(portfolioPresented * 10) / 10}
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ flex: 70 }} xs={8}>
          <Grid item className={classes.pieElement}>
            {/* <PieChart
              chartData={chartData}
              previousChartData={previousChartData}
            /> */}
            <PortfolioPieChart
              currentData={chartData}
              previousData={previousChartData}
              large
              isReport={isInReport}
            />
          </Grid>
        </Grid>
      </Grid>
    </WidgetCard>
  );
};

export default RepProductPortfolio;
