/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/prop-types */
import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import hCexporting from 'highcharts/modules/accessibility';

hCexporting(Highcharts);

export interface DeeperInsightsProps {
  title1: string;
  title2: string;
  series: number[][];
  lineSeries: number[][];
  report: boolean | null;
  xaxisRange: number[];
  yaxisRange: number[];
}

const LineGraph: React.FC<DeeperInsightsProps> = ({
  title1,
  title2,
  series,
  report,
  lineSeries,
  xaxisRange,
  yaxisRange,
}) => {
  const useStyles = makeStyles({
    root: {
      height: 400,
      width: 430,
      paddingLeft: 15,
    },
    title: {
      paddingTop: '4%',
      paddingLeft: 9.5,
      paddingBottom: '5%',
      fontWeight: 500,
      fontSize: report ? 12 : 16,
    },
    yaxis: {
      fontWeight: 400,
      fontSize: report ? 12 : 16,
      paddingLeft: 9.5,
      color: COLORS.TEXT_LOW_EMPHASIS,
    },
  });

  const classes = useStyles();

  const options = {
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    tooltip: { enabled: false },

    chart: {
      height: report ? 179 : 290,
      marginRight: 10,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      tickLength: 0,
      min: xaxisRange[0],
      max: xaxisRange[1],
      tickAmount: 5,
      allowDecimals: false,

      title: {
        text:
          title1 === 'Product Knowledge'
            ? title1 + ' (Assessment Score)'
            : title1 === 'Followup Ratio'
            ? 'Pipeline Discipline - ' + title1
            : title1 + ' (%)',
        x: -25,
        y: report ? 0 : 15,

        style: {
          fontFamily: 'Rubik',
          fontWeight: 400,
          fontSize: report ? 12 : 14,
          color: COLORS.TEXT_LOW_EMPHASIS,
        },
      },
      labels: {
        style: {
          fontFamily: 'Rubik',
          fontSize: '12px',
          fontWeight: 500,
          color: COLORS.TEXT_LOW_EMPHASIS,
        },
      },
      lineColor: 'transparent',
    },

    yAxis: {
      min: yaxisRange[0],
      max: yaxisRange[1],
      tickAmount: 7,

      title: {
        text: '',
      },
      labels: {
        style: {
          fontFamily: 'Rubik',
          fontSize: '12px',
          fontWeight: 400,
          color: COLORS.TEXT_LOW_EMPHASIS,
        },
      },
      gridLineDashStyle: 'Dash',
      lineDashStyle: 'Dash',
    },
    plotOptions: {
      series: {
        enableMouseTracking: false,
        stacking: 'normal',
        pointWidth: 50,
        pointPadding: 0,
      },
    },

    series: [
      {
        type: 'line',
        name: 'Regression Line',
        color: COLORS.PEOPLELENS_PRIMARY,
        data: lineSeries,
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 0,
          },
        },
        enableMouseTracking: false,
      },
      // regression: true,
      // regressionSettings: {
      //   type: 'exponential',
      //   color: COLORS.PEOPLELENS_PRIMARY,
      //   showInLegend: false,
      // },

      {
        type: 'scatter',
        name: '',
        color: COLORS.GENERAL_DARK_BLUE,
        data: series,
        showInLegend: false,
        marker: {
          symbol: 'circle',
          radius: 2.5,
        },
      },
    ],
  };
  return (
    <>
      <Typography variant="h5" className={classes.title}>
        {_t_(title1)}
        {' vs. '}
        {_t_(title2)}
        {title2 === 'Deal Size' ? '' : ' (%)'}
      </Typography>
      <Typography variant="h5" className={classes.yaxis}>
        {_t_(title2)}
        {title2 === 'Quota Attainment'
          ? ' (%)'
          : title2 === 'Deal Size'
          ? ' (US$ 000`s)'
          : ' (%)'}
      </Typography>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default LineGraph;
