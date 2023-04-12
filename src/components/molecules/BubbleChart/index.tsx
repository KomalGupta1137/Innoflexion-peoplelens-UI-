/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { COLORS, plTheme } from '../../../plTheme';
import {
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';
import PointerIcon from '../../../assets/PointerBlack.png';
import FormControl from '@material-ui/core/FormControl';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';

export interface BubbleChartProps {
  bubbleData: {
    x: number;
    y: number;
    z: number;
    bucketNo: number;
    color: any;
  }[];
  min: number | null | undefined;
  max: number | null | undefined;
  avg: number | null | undefined;
  colorCutoff: number;
  prefix: string;
  suffix: string;
  bubbleOnClick: Function;
  dropdownOnChange: Function;
  dropdownSelection: string;
  activePersonNameLeft?: string | null | undefined;
  activePersonLastNameLeft?: string | null | undefined;
  selectedCount?: number;
  activePersonValueLeft?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const BubbleChart: React.FC<BubbleChartProps> = ({
  bubbleData,
  min,
  max,
  avg,
  colorCutoff,
  prefix,
  suffix,
  bubbleOnClick,
  dropdownOnChange,
  dropdownSelection,
  activePersonNameLeft,
  activePersonLastNameLeft,

  selectedCount,
  activePersonValueLeft,
}: BubbleChartProps) => {
  const [width] = useWindowSize();
  const indicator =
    avg !== null &&
    max !== null &&
    min !== null &&
    avg !== undefined &&
    max !== undefined &&
    min !== undefined &&
    dropdownSelection !== 'Sales Cycle'
      ? ((avg - min) / (max - min)) * 100
      : avg !== null &&
        max !== null &&
        min !== null &&
        avg !== undefined &&
        max !== undefined &&
        min !== undefined &&
        ((avg - max) / (min - max)) * 100;
  const options = {
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      type: 'bubble',
      margin: [0, 0, 0, 15],
      plotBorderWidth: 0,
      zoomType: 'x',
      height: 200,
    },

    legend: {
      enabled: false,
    },

    title: {
      text: null,
    },

    subtitle: {
      text: null,
    },

    accessibility: {
      point: {
        valueDescriptionFormat:
          '{index}. {point.z}, X: {point.x}g, Y: {point.y}g, Z: {point.z}%.',
      },
    },

    xAxis: {
      visible: false,
      title: {
        text: '',
      },
      labels: {
        format: '',
      },
      plotLines: [
        {
          visible: false,
          color: 'black',
        },
      ],
      accessibility: {
        rangeDescription: 'Bubbles from left to right.',
      },
    },

    yAxis: {
      visible: false,
      startOnTick: false,
      endOnTick: false,
      title: {
        text: '',
      },
      labels: {
        visible: false,
        format: '',
      },
      plotLines: [
        {
          visible: false,
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: 50,
          label: {
            align: 'right',
            style: {
              fontStyle: 'italic',
            },
            text: '',
            x: -10,
          },
          zIndex: 3,
        },
      ],
      accessibility: {
        rangeDescription: 'Constant Y value',
      },
    },

    tooltip: {
      enabled: false,
      useHTML: true,
      headerFormat: '<table>',
      pointFormat:
        '<tr><th>BucketNo: </th><td>{point.bucketNo}</td></tr>' +
        '<tr><th>Count: </th><td>{point.z}</td></tr>' +
        '<tr><th>X: </th><td>{point.x}</td></tr>',
      footerFormat: '</table>',
      followPointer: true,
    },

    plotOptions: {
      series: {
        marker: {
          lineWidth: 0,
          lineColor: null, // inherit from series
          fillOpacity: 1,
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
      bubble: {
        minSize: 20,
        maxSize: 110,
        events: {
          click: function (e: any) {
            bubbleOnClick(e);
          },
        },
      },
    },
    series: [
      {
        data: bubbleData,
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
    bar: {
      height: '6.6px',
      backgroundColor: COLORS.MAIN_HOVER_LIGHT,
      borderRadius: 4,
      marginLeft: 10,
      background:
        'linear-gradient(to right, ' +
        'red' +
        ' ' +
        (max !== null &&
        max !== undefined &&
        min !== null &&
        min !== undefined &&
        dropdownSelection !== 'Sales Cycle'
          ? ((colorCutoff - min) / (max - min)) * 100
          : max !== null &&
            max !== undefined &&
            min !== null &&
            min !== undefined &&
            dropdownSelection === 'Sales Cycle'
          ? ((colorCutoff - max) / (min - max)) * 100
          : 0) +
        '%, ' +
        '#2DCA73' +
        ' 0%)',
    },
    pointer: {
      height: 35,
      marginTop: '-13px',
      marginLeft: indicator ? `${indicator - 0.9}%` : 0,
      marginBottom: 3,
    },
    avgValue: {
      marginLeft: indicator ? `${indicator - 3.5}%` : 0,
      marginBottom: 3,
    },
    values: {
      color: COLORS.WIDGET_TITLE,
    },
    footerText: {
      marginTop: width > 1500 ? '.7rem' : '1.4rem',
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    rightSubHeading: {
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.subtitle2.fontSize,
      fontWeight: plTheme.typography.h2.fontWeight,
      lineHeight: plTheme.typography.subtitle1.lineHeight,
      fontStyle: plTheme.typography.h3.fontStyle,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    dropDown: {
      height: 44,
      border: '1px solid #D7DFE9',
      borderRadius: 7,
    },
    quantityRoot: {
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(215, 223, 233, 0.4)',
        borderRadius: '2px',
      },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(215, 223, 233, 0.4)',
        borderRadius: '2px',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(215, 223, 233, 0.4)',
        borderRadius: '2px',
      },
    },
    icon: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    selectRoot: {
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
    chip: {
      marginTop: '20px',
    },
    rightChip: {
      marginLeft: '10px',
    },
    snackBarElement: {
      marginBottom: '300px',
      width: '300px',
      '& .MuiSnackbarContent-root': {
        fontSize: '16px',
        fontWeight: 400,
        fontStyle: 'normal',
        lineHeight: '24px',
        fontFamily: 'Rubik',
        backgroundColor: 'white',
        color: 'black',
      },
    },
    dismissButton: {
      fontSize: '16px',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '24px',
      fontFamily: 'Rubik',
    },
  });

  const classes = useStyles();

  const cutoff = colorCutoff && max ? (colorCutoff / max) * 100 : 'NA';

  const handleChange = (event: any) => {
    dropdownOnChange(event);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={{ width: '100%' }}
        spacing={2}
      >
        <Grid item className={classes.barTitle}>
          <Typography
            variant="h5"
            color="textPrimary"
            align="center"
            className={`${globalClasses.h5Medium} ${classes.title}`}
          >
            <FormControl
              variant="outlined"
              classes={{ root: classes.quantityRoot }}
              style={{ width: '40%' }}
            >
              <Select
                onChange={handleChange}
                defaultValue={dropdownSelection}
                className={`${classes.dropDown} ${classes.rightSubHeading}`}
                style={{ backgroundColor: '#D7DFE9' }}
                disableUnderline={false}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                    root: classes.selectRoot,
                  },
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                }}
              >
                <MenuItem
                  className={classes.rightSubHeading}
                  value={'Quota Attainment'}
                >
                  Outcome Metric: Quota Attainment %
                </MenuItem>
                <MenuItem
                  className={classes.rightSubHeading}
                  value={'Win Rate'}
                >
                  Outcome Metric: Win Rate %
                </MenuItem>
                <MenuItem
                  className={classes.rightSubHeading}
                  value={'Deal Size'}
                >
                  Outcome Metric: Deal Size (Amount)
                </MenuItem>
                <MenuItem
                  className={classes.rightSubHeading}
                  value={'Sales Cycle'}
                >
                  Outcome Metric: Sales Cycle (Days)
                </MenuItem>
              </Select>
            </FormControl>
          </Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6}>
          <Typography
            variant="h5"
            color="textPrimary"
            align="left"
            className={`${globalClasses.h5Medium} ${classes.values}`}
          >
            {prefix}{' '}
            {dropdownSelection !== 'Sales Cycle'
              ? min
                ? _n_(min, '0,0.0a')
                : min
              : max
              ? _n_(max, '0,0.0a')
              : max}{' '}
            {suffix}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            align="right"
            className={`${globalClasses.h5Medium} ${classes.values}`}
          >
            {prefix}{' '}
            {dropdownSelection !== 'Sales Cycle'
              ? max
                ? _n_(max, '0,0.0a')
                : max
              : min
              ? _n_(min, '0,0.0a')
              : min}{' '}
            {suffix}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={{ width: '100%' }}
        spacing={2}
      >
        <Grid
          item
          className={`${classes.bar}`}
          data-testid="salesclosedPointer"
          style={{ width: '100%' }}
        >
          <img
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data-testid="salesclosedimg"
            src={PointerIcon}
            className={`${classes.pointer}`}
            alt="pointer"
          />
          <Typography
            variant="h5"
            className={`${globalClasses.h5Medium} ${classes.values} ${classes.avgValue}`}
          >
            {'AVG - '}
            {prefix} {avg ? _n_(avg, '0,0.0a') : avg} {suffix}
          </Typography>
        </Grid>
        <Grid item style={{ width: '100%', paddingTop: 20 }}>
          <Grid container direction="row" justify="space-between">
            <Grid item className={classes.chip}>
              {selectedCount === 0 && activePersonNameLeft && (
                <Typography variant="h5" style={{ fontSize: '18px' }}>
                  You have selected (
                  <span style={{ fontWeight: 700 }}>
                    {activePersonNameLeft} {activePersonLastNameLeft}
                  </span>
                  &nbsp; {prefix}
                  {activePersonValueLeft && suffix === 'Days'
                    ? _n_(activePersonValueLeft, '0,0a') + ' '
                    : _n_(Number(activePersonValueLeft), '0,0.0a')}
                  {suffix}).
                  <br />
                  Please select another Rep to compare
                </Typography>
              )}
            </Grid>
            <Grid item style={{ marginTop: '2%' }}>
              <Typography
                variant="h4"
                align="right"
                className={`${classes.footerText} ${globalClasses.h4Light}`}
              >
                {_t_('Click a bubble to select your Sales Rep')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BubbleChart;
