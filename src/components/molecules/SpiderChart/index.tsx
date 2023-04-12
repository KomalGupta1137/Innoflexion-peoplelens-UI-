import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import { COLORS, plTheme } from '../../../plTheme';

import { useWindowSize } from '../../../utils/hooks/useWindowSize';

highchartsMore(Highcharts);

interface SpiderChartProps {
  chartDataCategories: any;
  chartData: any;
}

const SpiderChart: React.FC<SpiderChartProps> = ({
  chartDataCategories,
  chartData,
}: SpiderChartProps) => {
  const [width] = useWindowSize();
  const chartHeightLargeScreen = width < 700 ? 700 : 650;
  const chartHeightSmallScreen = 600;
  const chartWidthLargeScreen = width < 700 ? 570 : 1000;
  const chartWidthSmallScreen = width < 700 ? (width < 1240 ? 520 : 560) : 680;
  const paneSizeSmallScreen = width < 700 ? '50%' : '78%';
  const paneSizeLargeScreen = width < 700 ? '50%' : '95%';
  const options = {
    chart: {
      polar: true,
      type: 'area',
      height: width < 1500 ? chartHeightSmallScreen : chartHeightLargeScreen,
      width: width < 1500 ? chartWidthSmallScreen : chartWidthLargeScreen,
    },
    title: {
      text: ' ',
      x: -100,
    },
    pane: {
      size: width < 1500 ? paneSizeSmallScreen : paneSizeLargeScreen,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: chartDataCategories,
      tickmarkPlacement: 'on',
      lineWidth: 0,
      labels: {
        style: {
          fontFamily: plTheme.typography.fontFamily, // "Rubik",
          fontSize: plTheme.typography.h6.fontSize,
          fontWeight: plTheme.typography.h5.fontWeight, // 300,
          color: COLORS.TEXT_HIGH_EMPHASIS, // "#171F46",
          fontStyle: 'normal',
          lineHeight: plTheme.typography.h6.lineHeight,
        },
      },
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 1,
      min: 0,
      max: 200,
      tickInterval: 40,
      tickAmount: 7,
      labels: {
        style: {
          fontFamily: plTheme.typography.fontFamily,
          fontSize: plTheme.typography.h6.fontSize,
          fontWeight: plTheme.typography.h5.fontWeight,
          color: COLORS.TEXT_HIGH_EMPHASIS,
          fontStyle: 'normal',
          lineHeight: plTheme.typography.h6.lineHeight,
        },
        align: 'left',
        x: 2,
      },
    },
    tooltip: {
      shared: true,
      pointFormat: '<span >{point.y:,.0f}%<br/>',
      headerFormat: `<span style="text-transform: uppercase; font-weight: 400;">{point.x}</span></br>`,
      borderWidth: 1,
      borderColor: 'RGBA(126, 133, 142, 0.2)',
      shadow: false,
      color: COLORS.GENERAL_WHITE,
      backgroundColor: '#fff',
      shape: 'rect',
      style: {
        padding: 15,
        fontFamily: 'Rubik',
        fontWeight: 500,
        // fontSize: 12,
        color: COLORS.TEXT_HIGH_EMPHASIS,
        fontSize: 13,
      },
    },
    series: [
      {
        data: chartData,
        pointPlacement: 'on',
        showInLegend: false,
        color: COLORS.PL_PRIMARY,
        fillColor: COLORS.SPIDER_CHART_BACKGROUND,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SpiderChart;
