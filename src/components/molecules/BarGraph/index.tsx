import { makeStyles } from '@material-ui/core';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarGraph: React.FC<any> = () => {
  const prisma = 'PRISMA';
  const Cortex = 'CORTEX';
  const Strata = 'STRATA';
  const useStyles = makeStyles({
    root: {
      paddingLeft: 8,
      paddingRight: 27,
    },
  });

  const classes = useStyles();
  const options = {
    chart: {
      type: 'bar',
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
          color: '#8D9AA9',
        },
      },
      categories: ['Q1'],
      gridLineWidth: 1,
      lineColor: '#ffffff',

      gridLineDashStyle: 'Dash',
    },

    yAxis: {
      labels: {
        style: {
          fontFamily: 'Rubik',
          fontSize: '12px',
          fontWeight: 500,
          color: '#8D9AA9',
        },
      },

      title: {
        text:
          '<span style="font-size: 12px; font-family: Rubik; font-weight: normal;text-transform: uppercase;fill:#171F46" >DEALS %</span> ',
        align: 'low',
        x: -5,
        y: 10,
      },
      gridLineDashStyle: 'Dash',

      gridLineColor: 'transparent',
      lineColor: 'transparent',
    },

    plotOptions: {
      series: {
        pointWidth: 50,

        pointPadding: 0,
      },
    },

    tooltip: {
      valueSuffix: '%',
      backgroundColor: '#ffffff',
      borderWidth: 0,
      shadow: true,
      color: '#ffffff',
      style: {
        padding: 15,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        color: '#262626',
        fontSize: 13,
      },
    },

    legend: {
      fontSize: 12,
      layout: 'horizontal',
      align: 'right',
      verticalAlign: 'top',
      x: -62,
      y: 20,
      symbolHeight: 5,
      symbolWidth: 15,
      symbolBorderRadius: 2,
      symbolRadius: 2,
      squareSymbol: false,
    },
    credits: {
      enabled: false,
    },

    series: [
      {
        name:
          '<span style="font-size: 12px; font-family: Rubik; font-weight: normal;letter-spacing: 0.01em;color: #171F46;text-transform: uppercase;" >' +
          prisma +
          '</span>',
        color: '#0751C8',
        data: [90],
      },

      {
        name:
          '<span style="font-size: 12px; font-family: Rubik; font-weight: normal;letter-spacing: 0.01em;color: #171F46;text-transform: uppercase;" >' +
          Cortex +
          '</span>',
        color: '#68A2FF',
        data: [80],
      },
      {
        name:
          '<span style="font-size: 12px; font-family: Rubik; font-weight: normal;letter-spacing: 0.01em;color: #171F46;text-transform: uppercase;" >' +
          Strata +
          '</span>',
        color: '#D7E6FF',
        data: [30],
      },
    ],
  };
  return (
    <div className={classes.root}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarGraph;
