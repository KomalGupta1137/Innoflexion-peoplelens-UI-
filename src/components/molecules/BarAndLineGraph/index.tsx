/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { COLORS } from '../../../plTheme';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useGlobalStyles } from '../../../plStyles';
import { getLearningData_getLearningData_learningParticipation } from '../../../gql/types';
import { _t_ } from '../../../utils/translation/translation';

export interface BarAndLineGraphProps {
  title1: string | null | undefined;
  title2: string | null | undefined;
  legend1: string | null | undefined;
  legend2: string | null | undefined;
  series1Data:
    | (number | { x: number; y: number | null; label: string | null } | null)[]
    | null
    | undefined;
  series2Data:
    | (number | { x: number; y: number | null; label: string | null } | null)[]
    | null
    | undefined;
}

// const series1Data = [1.0, 1.0, 3.0, 2.0];
// const series2Data = [3.0, 4.0, 3.0, 2.0];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const BarAndLineGraph: React.FC<BarAndLineGraphProps> = ({
  title1,
  title2,
  legend1,
  legend2,
  series1Data,
  series2Data,
}: BarAndLineGraphProps) => {
  const [chart1Data, setChart1Data] = React.useState(series1Data);
  const [chart2Data, setChart2Data] = React.useState(series2Data);

  const data1 = [
    {
      y: 2,
      description: '2',
    },
    {
      y: 3,
      description: '3',
    },
    {
      y: 4,
      description: '4',
    },
  ];

  const data2 = [
    {
      y: 2,
      description: '2',
    },
    {
      y: 3,
      description: '3',
    },
    {
      y: 4,
      description: 'Lola',
    },
  ];

  useEffect(() => {
    setChart1Data(series1Data);
    setChart2Data(series2Data);
  }, [series1Data, series2Data]);

  const options = {
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      type: 'column',
      height: '70%',
      width: '350',
    },
    tooltip: {
      backgroundColor: COLORS.GENERAL_WHITE,
      borderWidth: 1,
      borderColor: 'RGBA(126, 133, 142, 0.2)',
      shadow: false,
      color: COLORS.GENERAL_WHITE,
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
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      type: 'category',
      visible: false,
      labels: {
        enabled: false,
        rotation: 0,
        y: 35,
        style: {
          fontFamily: 'Mulish',
          fontSize: '11px',
          fontWeight: 600,
          lineHeight: 15,
          letterSpacing: 0.1,
          color: COLORS.LEARNER_BAR_LABEL,
        },
      },
    },
    yAxis: {
      min: 0,
      // max: 5,
      visible: true,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      plotLines: [
        {
          dashStyle: 'dash',
        },
      ],
      gridLineColor: COLORS.LIGHT_GREY_50,
      gridLineDashStyle: 'dash',
    },
    legend: {
      enabled: true,
      verticalAlign: 'top',
      align: 'center',
      symbolRadius: 0,
      // x: -25,
      squareSymbol: false,
      itemStyle: {
        fontFamily: 'Rubik',
        fontSize: '12px',
        fontWeight: 300,
        lineHeight: 9.48,
        letterSpacing: -0.13,
        color: '#171F46',
      },
    },
    labels: {
      enabled: false,
    },
    minorTickLength: 0,
    tickLength: 0,
    plotOptions: {
      series: {
        borderRadius: 3,
        groupPadding: 0.5,
        states: {
          inactive: {
            opacity: 1,
          },
          active: {
            opacity: 1,
          },
          hover: {
            enabled: false,
            halo: null,
          },
        },
      },
      column: {
        pointWidth: 27,
      },
      line: {
        dashStyle: 'solid',
      },
    },

    series: [
      {
        name: legend1,
        data: series1Data,
        tooltip: {
          headerFormat:
            '<span style="text-transform: uppercase; font-weight: 400;">' +
            legend1 +
            '</span><br>',
          pointFormat: '<span> {point.label:.1f }</span>',
          backgroundColor: COLORS.GENERAL_WHITE,
          borderWidth: 1,
          borderColor: 'RGBA(126, 133, 142, 0.2)',
          shadow: false,
          color: COLORS.GENERAL_WHITE,
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
        color: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, '#80CBF1'],
            [1, '#29B695'],
          ],
        },
        dataLabels: {
          enabled: false,
        },
      },
      {
        name: legend2,
        type: 'line',
        data: series2Data,
        tooltip: {
          headerFormat:
            '<span style="text-transform: uppercase; font-weight: 400;">' +
            legend2 +
            '</span><br>',
          pointFormat: '<span> {point.label:.1f }</span>',
          backgroundColor: COLORS.GENERAL_WHITE,
          borderWidth: 1,
          borderColor: 'RGBA(126, 133, 142, 0.2)',
          shadow: false,
          color: COLORS.GENERAL_WHITE,
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
        marker: {
          fillColor: '#FFFFFF',
          radius: 3.5,
          lineWidth: 1,
          lineColor: null,
        },
        color: '#0055DC',
        lineWidth: 1,
      },
    ],
  };

  const globalClasses = useGlobalStyles();

  const useStyles = makeStyles({
    barTitle: {
      width: '100%',
    },
    title: {
      marginLeft: 8,
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    graph: {
      marginLeft: 10,
    },
  });

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={{ width: '100%' }}
        spacing={1}
      >
        <Grid item className={classes.barTitle}>
          <Typography
            variant="h5"
            color="textPrimary"
            align="center"
            className={`${globalClasses.h5Medium} ${classes.title}`}
          >
            {title1 + ' vs. ' + title2}
          </Typography>
        </Grid>
        <Grid item>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Grid>
      </Grid>
    </>
  );
};

export default BarAndLineGraph;
