import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { COLORS } from '../../../plTheme';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import WidgetCard from '../../atoms/WidgetCard';
import { _t_ } from '../../../utils/translation/translation';
import { useGlobalStyles } from '../../../plStyles';
import { ProductColorContext } from '../../../utils/productColorContext';
import { _n_ } from '../../../utils/numerals/numerals';

interface BarGraphProps {
  data?: (string | number | null | undefined)[][];
  activeQuarter: number | null | undefined;
  reportInd: boolean;
  chartTitle: string;
  xAxisTitile: string;
  repLens?: boolean;
}

interface InitData {
  data?: number[];
  name: string;
  color: string;
}

const ProductPenetrationGraph: React.FC<BarGraphProps> = ({
  data,
  activeQuarter,
  reportInd,
  chartTitle,
  xAxisTitile,
  repLens,
}: BarGraphProps) => {
  const displayProductName = (name: string) => {
    return `<span style="font-size: 12px; font-family: Rubik; font-weight: normal;letter-spacing: 0.01em;color: #171F46;text-transform: uppercase;"> ${name} </span>`;
  };

  const [seriesData, setSeriesData] = useState<InitData[]>([]);
  const { ProductColorMap, setProductColorMap } = React.useContext(
    ProductColorContext,
  );

  useEffect(() => {
    if (repLens) options.plotOptions.bar.dataLabels.verticalAlign = 'top';
    const loadData = () => {
      const tempData: InitData[] = [];

      if (data) {
        for (let i = 0; i < data?.length; i++) {
          const obj: InitData = {
            name: '',
            color: '',
            data: [],
          };
          const value: number[] = [];
          const dealCount = data[i]?.[1];
          dealCount &&
            value.push(Number(Math.abs(Number(dealCount)).toFixed()));
          const productName = String(data[i]?.[0]);
          obj.name = displayProductName(
            productName ? productName : `Product ${i}`,
          );
          value[0] = parseInt(value[0].toString().slice(0, 3));
          obj.data = value;
          const smallerName = productName.toLowerCase();
          const color = ProductColorMap?.find(
            (x) => x!.productName === smallerName,
          )?.color;
          obj.color = color ? color : '';
          tempData.push(obj);
        }
      }
      setSeriesData(tempData);
      console.log(tempData);
    };
    loadData();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const useStyles = makeStyles({
    root: {
      paddingLeft: 8,
      paddingRight: 27,
      paddingBottom: 20,
      margin: '0 auto',
      width: 405,
      height: 301,
    },
    main: {
      padding: 16,
      opacity: chartTitle.includes('gross margin') ? 0.6 : 1,
      background: chartTitle.includes('gross margin')
        ? 'rgb(217, 217, 217)'
        : 'white',
    },
  });

  const classes = useStyles();

  const [width] = useWindowSize();

  const options: any = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: reportInd ? 135 : 245,
      // width: '100%',
      reflow: true,
      marginLeft: 0,
      marginRight: 50,
    },
    title: {
      text: ' ',
    },
    xAxis: {
      labels: {
        style: {
          fontFamily: 'Rubik',
          fontSize: '12px',
          fontWeight: 500,
          color: COLORS.BARGRAPH_LABEL,
        },
      },
      categories: [' '],
      gridLineWidth: reportInd ? 0 : 1,
      lineColor: COLORS.GENERAL_WHITE,
      gridLineDashStyle: reportInd ? '' : 'Dash',
    },

    yAxis: {
      labels: {
        style: {
          fontFamily: 'Rubik',
          fontSize: '12px',
          fontWeight: 500,
          color: COLORS.BARGRAPH_LABEL,
        },
      },

      title: {
        text: `<span style="font-size: 12px; font-family: Rubik; font-weight: normal;text-transform: uppercase;fill:#171F46" >${_t_(
          xAxisTitile,
        )}</span> `,
        align: 'low',
        x: 0,
        y: 10,
      },
      gridLineDashStyle: 'Dash',

      gridLineColor: 'transparent',
      lineColor: 'transparent',
    },

    plotOptions: {
      series: {
        events: {
          legendItemClick: function () {
            return false;
          },
        },
        // groupPadding: reportInd ? 1 : 0.1,
        // pointWidth: reportInd ? 15 : repLens ? 15 : 20,
        // borderRadius: reportInd ? 8 : repLens ? 8 : 15,
        groupPadding: reportInd ? 1 : 0.1,
        pointWidth: reportInd ? 11 : 26,
        borderRadius: reportInd ? 5 : 15,
        states: {
          inactive: {
            opacity: 1,
            borderColor: 'transparent',
          },
          active: {
            borderColor: 'transparent',
          },
          hover: {
            enabled: false,
          },
        },
      },
      point: {
        events: {
          legendItemClick: function () {
            // this.slice(null);
            return false;
          },
        },
      },
      bar: {
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: 'Rubik',
            fontSize: repLens ? '10px' : '14px',
            fontWeight: 300,
            lineHeight: '14px',
          },
          // verticalAlign: reportInd ? 'top' : 'bottom',
          // verticalAlign: seriesData.length > 3 ? 'bottom' : 'top',
          y: repLens ? -6 : -1,
          crop: false,
          inside: false,
          overflow: 'allow',
          position: 'right',
          formatter: function () {
            return xAxisTitile.toLocaleUpperCase() === 'PERCENTAGE'
              ? _n_(this.y / 100, '0.0%')
              : _n_(this.y, '0,0');
          },
        },
        states: {
          hover: {
            brightness: 0,
          },
        },
        point: {
          events: {
            legendItemClick: function () {
              // this.slice(null);
              return false;
            },
          },
        },
      },
    },

    tooltip: {
      valueSuffix: '%',
      backgroundColor: COLORS.GENERAL_WHITE,
      borderWidth: 0,
      shadow: false,
      color: COLORS.GENERAL_WHITE,

      style: {
        padding: 15,
        fontFamily: 'Rubik',
        fontWeight: 500,
        // fontSize: 12,
        color: COLORS.TEXT_HIGH_EMPHASIS,
        fontSize: 13,
      },
      positioner: function (width: any, height: any, point: any) {
        return {
          x:
            Number(point.plotX) -
            Number(point.plotX) / 2 -
            Number(point.plotX) / 8,
          y: point.plotY - Number(height) / 4,
        };
      },
      pointFormat:
        xAxisTitile.toLocaleUpperCase() === 'PERCENTAGE'
          ? `<span style="font-size: 12px; font-family: Rubik; font-weight: bold;text-transform: uppercase;fill:#171F46" >{series.name}</span> ` +
            '</br>' +
            '{point.y:.1f}' +
            '%'
          : `<span style="font-size: 12px; font-family: Rubik; font-weight: bold;text-transform: uppercase;fill:#171F46" >{series.name}</span> ` +
            '</br>' +
            '{point.y:.0f} ' +
            ' ' +
            xAxisTitile.toLocaleUpperCase(),
    },

    legend: {
      useHTML: true,
      itemStyle: { lineHeight: '20px' },
      fontSize: 12,
      layout: 'horizontal',
      align: 'left',
      verticalAlign: 'top',
      x: width < 1500 ? -20 : reportInd ? -18 : -20,
      y: reportInd ? -15 : -15,
      symbolHeight: 5,
      symbolWidth: width < 1500 ? (reportInd ? 12 : 15) : 15,
      symbolBorderRadius: 2,
      symbolRadius: 2,
      squareSymbol: false,
    },
    credits: {
      enabled: false,
    },

    series: seriesData,
  };
  const globalClasses = useGlobalStyles();

  return (
    <>
      <WidgetCard>
        <Grid container direction="column" className={classes.main}>
          <Grid item>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_(chartTitle)}
            </Typography>
          </Grid>
          <Grid item style={{ paddingLeft: 1, width: '100%' }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default ProductPenetrationGraph;
