/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { addYears } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import Loader from '../../atoms/Loader';
const borderRadius = require('highcharts-border-radius');
borderRadius(Highcharts);

interface OutcomeTrackerProps {
  data?: any;
}

const OutcomeTracker: React.FC<OutcomeTrackerProps> = ({
  data,
}: OutcomeTrackerProps) => {
  const [nudges, setNudges] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const useStyles = makeStyles({
    outcomesHead: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      //   paddingTop: 30,
      height: 62,
    },
    heading: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: 500,
    },
    elements: {
      fontFamily: 'Rubik',
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: 14,
    },
    barTitle: {
      width: '100%',
      paddingTop: '2%',
    },
    title: {
      marginLeft: 8,
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontFamily: 'Rubik',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 16,
    },
    container: {
      padding: 20,
      backgroundColor: 'white',
      height: 576,
      overflowX: 'scroll',
      '&::-webkit-scrollbar': {
        width: 6,
        borderRadius: 10,
        marginRight: '10px',
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: '10px',
        marginTop: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        maxHeight: 30,
        backgroundColor: COLORS.GREY_4,
        borderRadius: '10px',
      },
    },
    outcome: {
      color: '#979797',
      width: '100%',
      overflow: 'hidden',
      fontSize: 14,
      fontStyle: 'normal',
      fontFamily: 'Rubik',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      letterSpacing: '0em',
      textTransform: 'uppercase',
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  const json = [
    {
      userId: '270dcabb-ccf4-49eb-9e0e-686543208d4b',
      activity: 'Cortex - Intermediate Level Course',
      due_date: '2020-05-26T15:27:26.281Z',
      nudgeDate: '2020-02-01',
      doneDate: '2020-03-01',
      impact: 'Score Increase: 2 >> 4',
      outcome: 'Quota Attainment',
      outcomeTrackerChartData: [
        {
          xAxis: '2019 Q3',
          value: 50,
          nudge: '',
        },
        {
          xAxis: '2019 Q4',
          value: 50,
          nudge: '',
        },
        {
          xAxis: '2020 Q1',
          value: 55,
          nudge: 'DONE DATE',
        },
        {
          xAxis: '2020 Q2',
          value: 65,
          nudge: '',
        },
        {
          xAxis: '2020 Q3',
          value: 65,
          nudge: '',
        },
        {
          xAxis: '2020 Q4',
          value: 75,
          nudge: '',
        },
      ],
    },
    {
      userId: '270dcabb-ccf4-49eb-9e0e-686543208d4b',
      activity: 'Meeting with Product Teams',
      due_date: '2020-05-26T15:27:26.281Z',
      nudgeDate: '2020-04-10',
      doneDate: '2020-05-25',
      impact: 'Time with product team up by 20%',
      outcome: 'Deal Size',
      outcomeTrackerChartData: [
        {
          xAxis: '2019 Q3',
          value: 60, // $115K
          value1: 115,
          nudge: '',
        },
        {
          xAxis: '2019 Q4',
          value: 60, // $115K
          value1: 115,
          nudge: '',
        },
        {
          xAxis: '2020 Q1',
          value: 64, // $125K
          value1: 125,
          nudge: '',
        },
        {
          xAxis: '2020 Q2',
          value: 64, // $125K
          value1: 125,
          nudge: 'DONE DATE',
        },
        {
          xAxis: '2020 Q3', // $150K
          value: 80,
          value1: 150,
          nudge: '',
        },
        {
          xAxis: '2020 Q4', // $150K
          value: 80,
          value1: 150,
          nudge: '',
        },
      ],
    },
  ];

  const getNudges = async () => {
    setLoading(true);
    // const fetchResponse = await fetch(
    //   `${process.env.REACT_APP_API_BASE || ''}/api/getOutcomes`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       tenantId: localStorage.getItem('tenantId'),
    //       userId: localStorage.getItem('userId'),
    //     }),
    //   },
    // );
    // let jsonData = await fetchResponse.json();
    // jsonData = json;
    const res: any = [];
    json.forEach((element: any) => {
      console.log(element);
      const xAxis: any[] = [];
      const data: any[] = [];
      element.outcomeTrackerChartData.forEach((o: any) => {
        xAxis.push(o.xAxis);
        data.push({ y: o.value, nudge: o.nudge, y1: o.value1 });
      });
      element.showGraph = false;
      element.chartOptions = JSON.parse(JSON.stringify(options));
      element.chartOptions.xAxis.categories = xAxis;
      element.chartOptions.series[0].data = data;
      element.chartOptions.series[0].name = element.outcome.replace(
        'Enhanced',
        '',
      );
      if (element.chartOptions.series[0].name == 'Deal Size') {
        element.chartOptions.series[0].dataLabels[0].format =
          '<div><span style=font-family:Rubik;font-style:normal;font-weight:400;font-size:15px;color:#8D9AA9;z-index:1;position:absolute;top:-10;left:7px;>${point.y1}K</span>' +
          '<span style=font-family:Rubik;font-style:normal;font-weight:400;font-size:15px;color:#8D9AA9;margin-left:50px;z-index:1;position:absolute;top:-10;left:10;>{point.nudge}</span></div>';
      }
      res.push(element);
    });
    setNudges(res);
    setLoading(false);
  };

  const handleClick = (index: number) => {
    nudges.forEach((n, i) => {
      if (i === index) {
        n.showGraph = !n.showGraph;
      }
    });
    const updatedNudges = nudges.map(function (n) {
      return n;
    });
    setNudges(updatedNudges);
  };

  useEffect(() => {
    void getNudges();
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const options = {
    tooltip: { enabled: false },
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      type: 'bar',
      height: 230,
      // width: 700,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      lineColor: 'transparent',
      labels: {
        style: {
          fontSize: '15px',
          fontFamily: 'Rubik',
          fontStyle: 'normal',
          fontWeight: 400,
        },
      },
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: null,
      },
      plotLines: [
        {
          dashStyle: 'dash',
        },
      ],
      gridLineColor: '#458FFF',
      gridLineDashStyle: 'dash',
      labels: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointWidth: 20,
        borderRadiusTopLeft: '50%',
        borderRadiusTopRight: '50%',
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
    },
    series: [
      {
        color: '#458FFF',
        dataLabels: [
          {
            enabled: true,
            format:
              '<div><span style=font-family:Rubik;font-style:normal;font-weight:400;font-size:15px;color:#8D9AA9;z-index:1;position:absolute;top:-10;left:7px;>{point.y}%</span>' +
              '<span style=font-family:Rubik;font-style:normal;font-weight:400;font-size:15px;color:#8D9AA9;margin-left:50px;z-index:1;position:absolute;top:-10;>{point.nudge}</span></div>',
            useHTML: true,
            align: 'left',
          },
        ],
      },
    ],
  };

  return (
    <>
      <Grid container direction="column">
        <Grid>
          <Typography
            variant="h2"
            style={{ transform: 'translateY(25%)' }}
            className={classes.outcomesHead}
          >
            {_t_('Outcome Tracker')}
          </Typography>
        </Grid>
        <Grid className={classes.container}>
          <Grid item style={{ width: '100%' }}>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_('my Completed NUDGES')}
            </Typography>
          </Grid>
          <Grid item style={{ width: '100%', padding: '2%' }}>
            <Grid
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Grid
                className={`${classes.heading}`}
                style={{ width: 10 }}
              ></Grid>
              <Grid
                className={`${classes.heading}`}
                style={{ width: 190, textAlign: 'center', marginLeft: -40 }}
              >
                Activity
              </Grid>
              <Grid
                className={`${classes.heading}`}
                style={{ width: 111.86, textAlign: 'center' }}
              >
                Nudge date
              </Grid>
              <Grid
                className={`${classes.heading}`}
                style={{ width: 111.86, textAlign: 'center' }}
              >
                Done date
              </Grid>
              <Grid
                className={`${classes.heading}`}
                style={{ width: 145, textAlign: 'center' }}
              >
                Activity Progress
              </Grid>
              <Grid
                className={`${classes.heading}`}
                style={{ width: 112.41, textAlign: 'center' }}
              >
                OKR Impact
              </Grid>
              <Grid
                className={`${classes.heading}`}
                style={{ width: 95 }}
              ></Grid>
            </Grid>
            {nudges &&
              nudges.map((element, index) => (
                <>
                  <Grid
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingTop: '2%',
                      alignItems: 'center',
                    }}
                  >
                    <Grid style={{ width: 10 }}>{index + 1}. </Grid>
                    <Grid
                      style={{
                        width: 190,
                        marginLeft: -40,
                        wordBreak: 'break-word',
                        textAlign: 'center',
                      }}
                      className={`${classes.elements}`}
                    >
                      {element.activity}
                    </Grid>
                    <Grid
                      className={`${classes.elements}`}
                      style={{
                        width: 111.86,
                        textAlign: 'center',
                      }}
                    >
                      {new Date(element.nudgeDate).toDateString().slice(4)}
                    </Grid>
                    <Grid
                      className={`${classes.elements}`}
                      style={{
                        width: 111.86,
                        textAlign: 'center',
                      }}
                    >
                      {new Date(element.doneDate).toDateString().slice(4)}
                    </Grid>
                    <Grid
                      className={`${classes.elements}`}
                      style={{
                        // marginLeft: 40,
                        width: 146,
                        wordBreak: 'break-word',
                        textAlignLast: 'center',
                        textAlign: 'center',
                      }}
                    >
                      {element.impact}
                      {/* Score Increases: {element.impact.replaceAll('.0', '')} */}
                    </Grid>
                    <Grid
                      className={`${classes.elements}`}
                      style={{
                        // marginLeft: 40,
                        width: 112.41,
                        wordBreak: 'break-word',
                        textAlignLast: 'center',
                        textAlign: 'center',
                      }}
                    >
                      {element.outcome}
                    </Grid>
                    <Grid
                      style={{
                        color: '#0055DC',
                        fontFamily: 'Rubik',
                        fontWeight: 500,
                        fontSize: 16,
                        width: 95,
                      }}
                    >
                      {element.showGraph ? (
                        <a
                          style={{
                            cursor: 'pointer',
                            color: '#0055DC',
                          }}
                          onClick={() => handleClick(index)}
                        >
                          Hide Graph
                        </a>
                      ) : (
                        <a
                          style={{
                            cursor: 'pointer',
                            color: '#0055DC',
                          }}
                          onClick={() => handleClick(index)}
                        >
                          Show Graph
                        </a>
                      )}
                    </Grid>
                  </Grid>
                  {element.showGraph ? (
                    <>
                      <Grid
                        container
                        style={{
                          width: '60%',
                          margin: '0 auto',
                          marginTop: 15,
                          boxShadow: '0px 0px 4px 4px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <Grid item className={classes.barTitle}>
                          <Typography
                            variant="h5"
                            color="textPrimary"
                            align="center"
                            className={`${classes.outcome}`}
                          >
                            {element.outcome}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          style={{
                            // width: '600',
                            paddingTop: '1%',
                            margin: '0px auto',
                          }}
                        >
                          <HighchartsReact
                            containProps={{ style: { width: 'auto' } }}
                            highcharts={Highcharts}
                            options={element.chartOptions}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OutcomeTracker;
