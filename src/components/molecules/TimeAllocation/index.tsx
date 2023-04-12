/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable camelcase */
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect } from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS, plTheme } from '../../../plTheme';
import WidgetCard from '../../atoms/WidgetCard';
import { sortBy } from 'lodash-es';
import moment from 'moment';

interface TimeAllocationProps {
  startDate: string;
  endDate: string;
  height: number;
  week: number;
}

const TimeAllocation: React.FC<TimeAllocationProps> = ({
  startDate,
  endDate,
  height,
  week,
}: TimeAllocationProps) => {
  const [chartData, setChartData] = React.useState<
    { name: string; y: number | null }[]
  >([]);

  const [, setIncomingData] = React.useState<any>([]);
  const [data, setData] = React.useState<any>([]);

  const getTimeAllocation = async () => {
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getTimeAllocation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantId: localStorage.getItem('tenantId'),
          userId: localStorage.getItem('userId'),
          startDate: new Date(
            new Date(startDate).setUTCHours(0, 0, 0, 0),
          ).toUTCString(),
          endDate: new Date(
            new Date(endDate).setUTCHours(23, 59, 59, 999),
          ).toUTCString(),
          week: week,
        }),
      },
    );
    const jsonData = await fetchResponse.json();
    setData(jsonData);
  };

  useEffect(() => {
    void getTimeAllocation();
  }, [startDate, endDate]);

  useEffect(() => {
    if (data) {
      setIncomingData(data);
    }
  }, [data]);
  useEffect(() => {
    let productMeetings = null;
    let customerMeetings = null;
    let total = null;
    let internalTeamMeetings = null;
    let productPercentage = null;
    let customerPercentage = null;
    let teamMeetingsPercentage = null;
    let othersPercentage = null;

    if (data != null) {
      productMeetings = data?.productMeetings as number;
      total = data?.total as number;
      customerMeetings = data?.customerMeetings as number;
      internalTeamMeetings = data?.internalTeamMeetings as number;
      productPercentage = ((productMeetings / total) * 100) as number;
      customerPercentage = ((customerMeetings / total) * 100) as number;
      teamMeetingsPercentage = ((internalTeamMeetings / total) * 100) as number;
      othersPercentage = (100 -
        productPercentage -
        customerPercentage -
        teamMeetingsPercentage) as number;
    }

    const tempChartData: { name: string; y: number | null }[] = [];
    productPercentage !== 0 &&
      tempChartData.push({
        name: 'Product Team ',
        y: productPercentage,
      });
    teamMeetingsPercentage !== 0 &&
      tempChartData.push({
        name: 'Internal Team Meetings',
        y: teamMeetingsPercentage,
      });
    customerPercentage !== 0 &&
      tempChartData.push({
        name: 'Customers',
        y: customerPercentage,
      });
    othersPercentage !== 0 &&
      tempChartData.push({
        name: 'Others',
        y: othersPercentage,
      });

    const sortedTempData = sortBy(tempChartData, 'y').reverse();

    setChartData(sortedTempData);
  }, [data]);
  const useStyles = makeStyles({
    root: {
      padding: 16,
      height: height,
    },
    chartDiv: {
      marginTop: '0.2rem',
    },
  });
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  const CHART_COLORS = [
    COLORS.MAIN_BLUE_PRESSED,
    COLORS.MAIN_HUE_2,
    COLORS.MAIN_BLUE_HOVER,
    COLORS.MAIN_HOVER_LIGHT,
  ];

  const options = {
    chart: {
      type: 'pie',
      plotBackgroundColor: null,
      backgroundColor: 'transparent',
      plotBorderWidth: null,
      plotShadow: false,
      height: 220,
      events: function click() {
        return;
      },
      style: {
        fontFamily: plTheme.typography.fontFamily, // "Rubik",
        fontSize: '14px',
        fontWeight: 300,
      },
      marginRight: -30,
      marginLeft: -60,
    },
    title: null,
    tooltip: {
      backgroundColor: '#fff',
      borderColor: '#F6F6F6',
      borderWidth: 2,
      borderRadius: 4,
      shadow: false,
      shape: 'rect',
      enabled: true,
      pointFormat: '<b>{series.name}</b>: <b>{point.percentage:.1f}%</b>',
      useHTML: true,
      followPointer: false,
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
          `<span  style="font-family: Rubik; font-size: 12px; text-transform: uppercase;"> ` +
          name +
          `</span>`;

        tooltip += `<br>`;
        tooltip +=
          '<span style="font-family: Rubik; font-size: 12px; font-weight: 500; text-transform: uppercase;">' +
          Math.round(+value) +
          `% time</span>`;
        return tooltip;
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        colors: CHART_COLORS,
        allowPointSelect: false,
        cursor: 'pointer',
        shadow: false,
        borderWidth: 0,
        showInLegend: true,
        states: {
          hover: {
            brightness: 0,
          },
        },
        dataLabels: {
          enabled: false,
        },
        point: {
          events: {
            legendItemClick: function () {
              // this.slice(null);
              return false;
            },
          },
        },
        series: {
          select: {
            enabled: false,
          },
          events: {
            legendItemClick: function () {
              return false;
            },
          },
        },
      },

      series: {
        allowPointSelect: false,
        states: {
          inactive: {
            opacity: 1,
          },
          active: {
            opacity: '100%',
            borderColor: 'transparent',
          },
          hover: {
            halo: {
              opacity: 1,
              attributes: {
                fill: 'transparent',
                'stroke-width': 0,
                stroke: 'transparent',
              },
            },
          },
        },
      },
    },
    legend: {
      margin: 0,
      fontSize: 12,
      fontWeight: 300,
      layout: 'vertical',
      alignColumns: false,
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 10,
      // symbolHeight: ,
      // symbolWidth: 24,
      itemStyle: {
        fontWeight: 300,
        lineHeight: 16,
        // verticalAlign: 'top',
      },

      labelFormat:
        '<span style="font-family: Rubik; font-size: 16px;">{name}</span>',
    },
    series: [
      {
        innerSize: '65%',
        name: 'Time Allocation',
        dataSorting: {
          enabled: true,
          sortKey: 'y',
        },
        data: chartData,
      },
    ],
  };
  return (
    <>
      <WidgetCard>
        <Grid className={classes.root}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}
          >
            <Grid item>
              <Typography className={globalClasses.body1WidgetTitle}>
                Time Allocation
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="textPrimary">
                {moment(startDate).utc().format('MMM D')} -{' '}
                {moment(endDate).utc().format('MMM D')}
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.chartDiv}>
            {data?.total === 0 ? (
              <p>No data</p>
            ) : (
              <HighchartsReact highcharts={Highcharts} options={options} />
            )}
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default TimeAllocation;
