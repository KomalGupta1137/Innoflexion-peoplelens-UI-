/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { COLORS } from '../../../plTheme';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useGlobalStyles } from '../../../plStyles';
import { getLearningData_getLearningData_learningParticipation } from '../../../gql/types';
import { _t_ } from '../../../utils/translation/translation';

export interface ChartSeriesProps {
  name?: string;
  value?: number;
}

export interface LearningBarGraphProps {
  data: // eslint-disable-next-line camelcase
  | (getLearningData_getLearningData_learningParticipation | null)[]
    | null
    | undefined
    | ChartSeriesProps[];
  title: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const LearningBarGraph: React.FC<LearningBarGraphProps> = ({
  data,
  title,
}: LearningBarGraphProps) => {
  const [receivedData, setReceivedData] = React.useState(data);

  useEffect(() => {
    setReceivedData(data);
  }, [data]);
  const [chartSeriesData, setChartSeriesData] = React.useState<
    [string, number | null][]
  >([]);
  useEffect(() => {
    const seriesData: [string, number | null][] = [];
    if (data) {
      for (const item of data) {
        item?.name &&
          item?.value !== undefined &&
          seriesData.push([_t_(item?.name), item?.value && item?.value]);
      }
    }
    setChartSeriesData(seriesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, receivedData]);

  const options = {
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      type: 'column',
      height: 230,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      type: 'category',
      labels: {
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
      title: {
        text: null,
      },
      plotLines: [
        {
          dashStyle: 'dash',
        },
      ],
      gridLineColor: COLORS.GREY_40,
      gridLineDashStyle: 'dash',
      labels: {
        rotation: 0,
        style: {
          fontFamily: 'Helvetica',
          fontSize: '11px',
          fontWeight: 200,
          lineHeight: 15,
          letterSpacing: 0.1,
          color: COLORS.BARGRAPH_LABEL,
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      // pointFormat:
      //   `<span style="font-size: 12px; font-family: Rubik; font-weight: bold;text-transform: uppercase;fill:#171F46" >{point.x}</span> ` +
      //   '</br>' + '{point.y:.1f}' + '%',
      //   `{point.y:.1f}`,
      backgroundColor: COLORS.GENERAL_WHITE,
      borderWidth: 1,
      borderColor: 'RGBA(126, 133, 142, 0.2)',
      shape: 'rect',
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
      formatter: function () {
        // @ts-ignore
        const name =
          // @ts-ignore
          this && this.point && this.point.name
            ? // @ts-ignore
              this.point.name.toString()
            : '';

        const value =
          // @ts-ignore
          this && this.point && this.point.y
            ? // @ts-ignore
              this.point.y.toString()
            : '';

        // @ts-ignore
        let tooltip = ``;

        tooltip +=
          `<span style="text-transform: uppercase; font-weight: 400 ">` +
          name +
          `</span></br>`;
        tooltip +=
          `<span style="text-transform: uppercase;">` + value + `</span>`;

        tooltip += ``;
        return tooltip;
      },
    },
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
        dashStyle: 'longdash',
      },
    },

    series: [
      {
        name: 'Participation',
        data: chartSeriesData,
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
        spacing={5}
      >
        <Grid item className={classes.barTitle}>
          <Typography
            variant="h5"
            color="textPrimary"
            align="center"
            className={`${globalClasses.h5Medium} ${classes.title}`}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Grid>
      </Grid>
    </>
  );
};

export default LearningBarGraph;
