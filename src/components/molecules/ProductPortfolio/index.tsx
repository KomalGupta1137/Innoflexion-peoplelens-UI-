import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { COLORS, plTheme } from '../../../plTheme';
import WidgetCard from '../../atoms/WidgetCard';
import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';
import { getDashboardData_getDashboardData_salesOutcome_topProductContributors as DashboardTopProductContributors } from '../../../gql/types';
import { useGlobalStyles } from '../../../plStyles';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import PortfolioPieChart from '../PortfolioPieChart';

interface ProductPortfolioProps {
  data?: (DashboardTopProductContributors | null)[] | null;
  salesClosed?: number | null;
  previousYearData?: (DashboardTopProductContributors | null)[] | null;
  previousYearSalesClosed?: number | null;
  isInReport?: boolean;
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

const ProductPortfolio: React.FC<ProductPortfolioProps> = ({
  salesClosed,
  data,
  previousYearData,
  previousYearSalesClosed,
  isInReport,
}: ProductPortfolioProps) => {
  const [width] = useWindowSize();

  const useStyles = makeStyles({
    main: {
      padding: 16,
    },
    horizontalPadding: {
      padding: '0px 16px',
    },
    body1: {
      color: COLORS.GREY_100,
    },
    subElement: {
      marginTop: isInReport ? 15 : 28,
      // marginBottom: 6.82,
      fontWeight: plTheme.typography.h5.fontWeight,
      // width: isInReport ? '200px' : undefined,
    },
    subElement1: {
      marginTop: '5%',
      marginBottom: 6.82,
      fontWeight: plTheme.typography.h5.fontWeight,
    },
    chartElement: {
      // marginTop: 78,
      marginBottom: 10,
      color: COLORS.TEXT_HIGH_EMPHASIS,
      // width: 600,
      // marginRight: '1rem',
    },
    internalSubElement: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    root: {
      height: 303,
      padding: '16px 16px 0px 16px',
    },
    largeScreen: {
      marginLeft: '-150px',
      marginTop: '10px',
      marginBottom: '10px',
    },
    smScreen: {
      marginLeft: width < 1350 ? '-50px' : '-100px',
      // marginRight: "30px"
    },
    chartDiv: {
      marginTop: isInReport ? '2rem' : undefined,
      paddingLeft: isInReport ? '0.2rem' : undefined,
    },
    yyDiv: {
      // marginTop: '0.6rem',
      height: 37,
    },
  });
  const [chartData, setChartData] = useState<InitData[]>([]);
  const [previousChartData, setPreviousChartData] = useState<InitData2[]>([]);
  useEffect(() => {
    const chartColors = [
      COLORS.MAIN_BLUE_PRESSED,
      COLORS.MAIN_HUE_2,
      COLORS.MAIN_BLUE_HOVER,
      COLORS.MAIN_HUE_3,
      COLORS.MAIN_HUE_4,
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
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1500px)');
  const globalClasses = useGlobalStyles();

  return (
    <WidgetCard>
      <Grid
        container
        // direction={isInReport ? 'column' : 'row'}
        direction="column"
        justify="flex-start"
        className={classes.root}
      >
        <Grid item style={{ marginBottom: 20 }}>
          <Typography
            className={globalClasses.body1WidgetTitle}
            style={{ overflow: 'visible' }}
          >
            {_t_('PRODUCT PORTFOLIO')}
          </Typography>
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
                {_t_('OVERALL SALES')}
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
          <Typography className={`${globalClasses.body1Light} `}>
            {_t_('(Y/Y growth)')}
          </Typography>
        </Grid>
        <div
          style={{
            marginTop: isInReport ? '-10px' : '7px',
            marginLeft: isInReport ? '0px' : '-120px',
          }}
        >
          <PortfolioPieChart
            currentData={chartData}
            previousData={previousChartData}
            isReport={isInReport}
          />
        </div>
      </Grid>
    </WidgetCard>
  );
};

export default ProductPortfolio;
