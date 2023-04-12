/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React from 'react';
import './index.css';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import { COLORS, plTheme } from '../../../plTheme';

interface PieChartProps {
  chartData?: any | null;
  previousChartData?: any | null;
}

const PieChart: React.FC<PieChartProps> = ({
  chartData,
  previousChartData,
}: PieChartProps) => {
  const [width] = useWindowSize();
  const returnWidth = () => {
    if (width < 1350) {
      return 300;
    } else if (width > 1350 && width < 1800) {
      return 450;
    } else if (width > 1800) {
      return 700;
    }
  };

  const chartWidth = returnWidth();

  // @ts-ignore
  const options = {
    chart: {
      type: 'pie',
      height: 301,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    series: [
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: chartData,
      },
    ],
    tooltip: {
      enabled: false,
      pointFormat: '{point.percentage:.2f} %',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        states: {
          inactive: {
            opacity: 1,
            borderColor: 'transparent',
          },
          active: {
            opacity: 1,
            borderColor: 'transparent',
          },
          hover: {
            halo: {
              attributes: {
                fill: 'lightgray',
                'stroke-width': 0,
                stroke: 'gray',
              },
            },
          },
        },
      },
      pie: {
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          paddingLeft: 100,
          // @ts-ignore
          formatter: function () {
            // @ts-ignore

            // @ts-ignore
            const name =
              // @ts-ignore
              this && this.point && this.point.name
                ? // @ts-ignore
                  this.point.name.toString()
                : '';
            // @ts-ignore
            // @ts-ignore
            const index: number =
              // @ts-ignore
              this && this.point && this.point.index
                ? // @ts-ignore
                  this.point.index
                : 0;
            // @ts-ignore
            const value =
              // @ts-ignore
              this && this.point && this.point.index
                ? // @ts-ignore
                  this.point.y
                : 0;
            // @ts-ignore
            let datalabelName = '';

            datalabelName =
              name.length > 18 ? name.substr(0, 15) + '...' : name;
            let formattedLabel = datalabelName;
            if (index < 3) {
              const diff: number =
                Number(chartData[index].y) - Number(previousChartData[index].y);
              const percentageStyle =
                diff >= 0
                  ? 'color:green;font-size:10pt; font-family: Rubik; font-family:bold;'
                  : 'color:red;font-size:10pt; font-family: Rubik; font-family:bold;';
              const arrow = diff >= 0 ? '&#9650' : '&#9660';
              formattedLabel =
                '<span style="font-size:12pt"> ' +
                datalabelName +
                '</span> ' +
                '<br> <span style="margin-left:50">' +
                '( ' +
                Math.abs(Number(diff.toFixed(1))) +
                '</span>' +
                '<span>' +
                '<span style="' +
                percentageStyle +
                '">' +
                arrow +
                '</span>' +
                '<span>)</span>';
            }

            // name.length > 18 ? name.substr(0, 15) + '...' : name;
            // name.length > 18 ? name.substr(0, 15) + '...' : name + '\u25bc';
            // return name.length > 18 ? name.substr(0, 15) + '...' : name;

            return formattedLabel;
            // return name.length > 18 ? name.substr(0, 15) + '...' : name;
          },
          connectorColor: COLORS.GREY_100, // "#7E858E",
          connectorShape: 'straight',
          softConnector: false,
          style: {
            fontFamily: plTheme.typography.fontFamily, // "Rubik",
            fontSize: '12px',
            fontWeight: plTheme.typography.h5.fontWeight, // 300,
            color: COLORS.TEXT_HIGH_EMPHASIS, // "#171F46",
            fontStyle: 'normal',
            lineHeight: '24px',
          },
          // useHTML: true,
        },
      },
    },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
