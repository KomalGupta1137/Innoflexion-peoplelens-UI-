/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { COLORS, plTheme } from '../../../plTheme';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { sortBy } from 'lodash-es';
import numeral from 'numeral';
import { ProductColorContext } from '../../../utils/productColorContext';
import { _n_ } from '../../../utils/numerals/numerals';

// import {numeral} from 'numeral';

interface PortfolioPieChartProps {
  currentData: any | null;
  previousData: any | null;
  large?: boolean;
  isReport?: boolean;
}

interface dataProps {
  name: string;
  y: number;
  growth?: number;
}

const PortfolioPieChart: React.FC<PortfolioPieChartProps> = ({
  currentData,
  previousData,
  large = false,
  isReport,
}: PortfolioPieChartProps) => {
  const [currentYearData, setCurrentYearData] = React.useState<dataProps[]>([]);
  const [previousYearData, setPreviousYearData] = React.useState<dataProps[]>(
    [],
  );

  useEffect(() => {
    if (currentData && previousData) {
      setCurrentYearData(currentData);
      setPreviousYearData(previousData);
    }
  }, [currentData, previousData]);

  const { ProductColorMap, setProductColorMap } = React.useContext(
    ProductColorContext,
  );

  const [seriesData, setSeriesData] = React.useState<dataProps[]>([]);
  useEffect(() => {
    const tempSeriesData = [];
    for (const product of currentData) {
      const prevValueForProduct = previousData.find(
        (x: dataProps) => x.name === product.name,
      )?.y;

      /**
       * We need to decide what to put for growth value if the last years value
       * is zero. As we can not detrmine the growth from zero value.
       *
       * Here in one possibility:
       *
       * Any time you have to show a rate of increase from zero,
       * output the infinity symbol (∞).
       * That's Alt + 236 on your number pad, in case you're wondering.
       * You could also use negative infinity (-∞) for a negative growth rate from zero.
       *
       *
       * ***** But currently we are displaying as 100% if there is no growth for last year.
       */

      const growth = prevValueForProduct
        ? ((product.y - prevValueForProduct) / prevValueForProduct) * 100
        : 100;

      const smallerName = product.name.toLowerCase();
      const color = ProductColorMap?.find((x) => x?.productName === smallerName)
        ?.color;

      if (product.y !== 0)
        tempSeriesData.push({
          name: product.name,
          y: product.y,
          growth: growth,
          color: color,
        });
    }
    const sortedTempData = sortBy(tempSeriesData, 'y').reverse();
    setSeriesData(sortedTempData);
  }, [currentYearData, previousYearData]);

  const CHART_COLORS = [
    COLORS.MAIN_BLUE_PRESSED,
    COLORS.MAIN_HUE_2,
    COLORS.MAIN_BLUE_HOVER,

    COLORS.MAIN_HOVER_LIGHT,
  ];

  const returnPieSize = () => {
    if (isReport === true) {
      return 205;
    } else if (isReport && large === true) {
      return 205;
    } else if (!isReport && large === false) {
      return 270;
    } else if (!isReport && large === true) {
      return 300;
    }
  };
  const options = {
    chart: {
      type: 'pie',
      plotBackgroundColor: null,
      backgroundColor: 'transparent',
      plotBorderWidth: null,
      plotShadow: false,
      height: returnPieSize(),
      style: {
        fontFamily: plTheme.typography.fontFamily, // "Rubik",
        fontSize: '14px',
        fontWeight: 300,
      },
    },
    title: null,
    tooltip: {
      enabled: false,
      backgroundColor: '#fff',
      borderColor: '#F6F6F6',
      borderWidth: 2,
      borderRadius: 4,
      shadow: false,
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

        const currentYearValue =
          // @ts-ignore
          this && this.point && this.point.y
            ? // @ts-ignore
              this.point.y.toString()
            : '';
        const growth =
          // @ts-ignore
          this && this.point && this.point.growth
            ? // @ts-ignore
              this.point.growth.toString()
            : '';
        // @ts-ignore
        const formattedCurrentYearValue = numeral(
          parseInt(currentYearValue),
        ).format('0a');

        // const formattedCurrentYearValue = _n_(currentYearValue, '0a')

        // @ts-ignore
        let tooltip = ``;
        tooltip +=
          `<span  style="font-family: Rubik; font-size: 12px; font-weight: 500;"> ` +
          name +
          `</span>`;

        tooltip += `<br><table style="width: 100px; margin-top: 6px; margin-left: -3px;">`;
        tooltip +=
          `<tr><td><span style="font-size: 10px;">Current</span></td><td style="text-align: right"><span style="font-size: 10px;">` +
          formattedCurrentYearValue +
          `%.</span></td></tr>`;

        const arrow =
          growth > 0
            ? `<span style="font-size: 12px; color: green;">&#9650;</span>`
            : `	<span style="font-size: 12px; color: red;">&#9660;</span>`;
        tooltip +=
          `<tr><td><span style="font-size: 10px;">Y/Y ` +
          arrow +
          `</span></td><td style="text-align: right"><span style="font-size: 10px;">` +
          Math.round(+growth)
            .toString()
            .replace(/-/g, '') +
          `%</span></td></tr>`;

        tooltip += `</table>`;
        tooltip += ``;
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
        allowPointSelect: false,
        cursor: 'pointer',
        shadow: false,
        borderWidth: 0,
        showInLegend: true,
        dataLabels: {
          padding: 0,
          enabled: true,
          connectorShape: 'straight',
          connectorColor: 'rgba(126, 133, 142, 0.33)',
          distance: isReport ? 15 : 30,
          style: {
            fontWeight: 300,
            fontSize: '1px',
          },
          formatter: function () {
            // @ts-ignore
            const name =
              // @ts-ignore
              this && this.point && this.point.name
                ? // @ts-ignore
                  this.point.name.toString()
                : '';

            const currentYearValue =
              // @ts-ignore
              this && this.point && this.point.y
                ? // @ts-ignore
                  this.point.y.toString()
                : '';
            const growth =
              // @ts-ignore
              this && this.point && this.point.growth
                ? // @ts-ignore
                  this.point.growth.toString()
                : '';

            // @ts-ignore
            const formattedCurrentYearValue = _n_(currentYearValue, '0,0.0a');
            const arrow =
              growth > 0
                ? `<span style="font-size: 14px; color: #2DCA73;">&#9650;</span>`
                : `	<span style="font-size: 14px; color: #ff0000;">&#9660;</span>`;

            const smallerArrow =
              growth > 0
                ? `<span style="font-size: 10px; color: #2DCA73;">&#9650;</span>`
                : `	<span style="font-size: 10px; color: #ff0000;">&#9660;</span>`;

            // @ts-ignore
            let label = ``;
            label +=
              `<span  style="font-family: Rubik; font-size: ` +
              `13px` +
              `; font-weight: 300;">` +
              name +
              ` $` +
              formattedCurrentYearValue +
              `</span> `;

            label +=
              `<br><span  style="font-family: Rubik; font-size: 13px; font-weight: 300;">(` +
              Math.round(+growth) +
              // `20` +
              `%` +
              arrow +
              `)</span>`;

            // @ts-ignore
            let smallerLabel = ``;
            smallerLabel +=
              `<span  style="font-family: Rubik; font-size: 9px; font-weight: 400;">` +
              name +
              ` $` +
              formattedCurrentYearValue +
              `</span> `;

            smallerLabel +=
              `<br><span  style="font-family: Rubik; font-size: 9px; font-weight: 400;">(` +
              Math.round(+growth) +
              // `20` +
              `%` +
              smallerArrow +
              `)</span>`;

            smallerLabel += ``;
            if (seriesData.length > 4) {
              return smallerLabel;
            } else {
              return label;
            }
          },
        },
        states: {
          hover: {
            brightness: 0,
          },
          select: {
            enabled: false,
          },
        },
      },
      series: {
        events: {
          legendItemClick: function () {
            return false;
          },
        },
        states: {
          inactive: {
            opacity: 1,
          },
          active: {
            borderColor: 'transparent',
          },
          hover: {
            halo: {
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
      enabled: false,
      fontSize: 12,
      fontWeight: 400,
      layout: 'horizontal',
      textTransform: 'uppercase',
      alignColumns: false,
      // align: reportInd ? 'right' : 'left',
      verticalAlign: 'top',
      // x: width < 1500 ? (reportInd ? -20 : 0) : reportInd ? -65 : 60,
      // y: reportInd ? -15 : -15,
      symbolHeight: 4,
      symbolWidth: 15,
      symbolBorderRadius: 2,
      symbolRadius: 2,
      squareSymbol: false,
      itemStyle: {
        fontWeight: 400,
        lineHeight: 16,
        // verticalAlign: 'top',
      },
      labelFormat:
        '<span style="font-family: Rubik; text-transform: uppercase;">{name}</span>',
    },
    series: [
      {
        name: 'Product Portfolio',
        data: seriesData,
      },
    ],
  };

  return (
    <>
      {' '}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default PortfolioPieChart;
