/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Button,
  Grid,
  Icon,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import Loader from '../../atoms/Loader';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import close from '../../../../src/assets/close.png';

interface OutcomeScalesProps {
  onClose?: any;
}

const OutcomeScales: React.FC<OutcomeScalesProps> = ({
  onClose,
}: OutcomeScalesProps) => {
  const [nudges, setNudges] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [salesClosed, setSalesClosed] = useState<any>({ min: 400, max: 1500 });
  const [dealsClosed, setDealsClosed] = useState<any>({ min: 1, max: 20 });
  const [dealsSize, setDealsSize] = useState<any>({ min: 10, max: 250 });
  const [quotaAttainment, setQuotaAttainment] = useState<any>({
    min: 5,
    max: 150,
  });
  const [winRate, setWinRate] = useState<any>({ min: 10, max: 40 });
  const [salesCycle, setSalesCycle] = useState<any>({ min: 30, max: 365 });

  const useStyles = makeStyles({
    outcomesHead: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      //   paddingTop: 30,
      height: 62,
    },
    heading: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: 300,
    },
    heading1: {
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
      fontWeight: 400,
      fontSize: 24,
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
    buttonFont: {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: 14,
      textTransform: 'none',
      height: 40,
      width: 154,
    },
  });

  const classes = useStyles();

  const saveUserSettings = async () => {
    setLoading(true);
    await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/setSalesOutcomeScale`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [
            {
              outcome: 'DealsClosed',
              min: dealsClosed.min,
              max: dealsClosed.max,
            },
            { outcome: 'DealSize', min: dealsSize.min, max: dealsSize.max },
            {
              outcome: 'QuotaAttainment',
              min: quotaAttainment.min,
              max: quotaAttainment.max,
            },
            { outcome: 'WinRate', min: winRate.min, max: winRate.max },
            { outcome: 'SalesCycle', min: salesCycle.min, max: salesCycle.max },
            {
              outcome: 'SalesClosed',
              min: salesClosed.min,
              max: salesClosed.max,
            },
          ],
        }),
      },
    );
    // const jsonData = await fetchResponse.json();
    setLoading(false);
  };

  const getSalesOutcomeScale = async () => {
    setLoading(true);
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getSalesOutcomeScale`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const jsonData = await fetchResponse.json();
    jsonData.forEach((element: any) => {
      if (element.outcome == 'SalesClosed')
        setSalesClosed({ min: element.minimum, max: element.maximum });
      else if (element.outcome == 'DealSize')
        setDealsSize({ min: element.minimum, max: element.maximum });
      else if (element.outcome == 'QuotaAttainment')
        setQuotaAttainment({ min: element.minimum, max: element.maximum });
      else if (element.outcome == 'WinRate')
        setWinRate({ min: element.minimum, max: element.maximum });
      else if (element.outcome == 'SalesCycle')
        setSalesCycle({ min: element.minimum, max: element.maximum });
      else if (element.outcome == 'DealsClosed')
        setDealsClosed({ min: element.minimum, max: element.maximum });
    });
    setLoading(false);
  };

  const setsalesClosedMin = (e: any) => {
    salesClosed.min = parseInt(e.target.value);
  };
  const setsalesClosedMax = (e: any) => {
    salesClosed.max = parseInt(e.target.value);
  };
  const setDealsClosedMin = (e: any) => {
    dealsClosed.min = parseInt(e.target.value);
  };
  const setDealsClosedMax = (e: any) => {
    dealsClosed.max = parseInt(e.target.value);
  };
  const setDealSizeMin = (e: any) => {
    dealsSize.min = parseInt(e.target.value);
  };
  const setDealSizeMax = (e: any) => {
    dealsSize.max = parseInt(e.target.value);
  };
  const setQAMin = (e: any) => {
    quotaAttainment.min = parseInt(e.target.value);
  };
  const setQAMax = (e: any) => {
    quotaAttainment.max = parseInt(e.target.value);
  };
  const setWRMin = (e: any) => {
    winRate.min = parseInt(e.target.value);
  };
  const setWRMax = (e: any) => {
    winRate.max = parseInt(e.target.value);
  };
  const setSCMin = (e: any) => {
    salesCycle.min = parseInt(e.target.value);
  };
  const setSCMax = (e: any) => {
    salesCycle.max = parseInt(e.target.value);
  };

  useEffect(() => {
    void getSalesOutcomeScale();
  }, []);

  const imageClick = () => {
    onClose();
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Grid container direction="column">
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              variant="h2"
              style={{
                transform: 'translateY(25%)',
                textAlign: 'center',
                marginLeft: 125,
              }}
              className={classes.outcomesHead}
            >
              Report: Sales Outcome Scale
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <img
              src={close}
              alt="close"
              style={{ width: 23, height: 23 }}
              onClick={() => imageClick()}
            />
          </Grid>
        </Grid>
        <Grid className={classes.container}>
          <Grid item style={{ width: '95%', padding: '2%' }}>
            <Grid
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Grid className={`${classes.heading1}`}>Sales Outcome</Grid>
              <Grid
                className={`${classes.heading1}`}
                style={{ marginLeft: -6 }}
              ></Grid>
              <Grid className={`${classes.heading1}`}>Min</Grid>
              <Grid
                className={`${classes.heading1}`}
                style={{ marginRight: -4 }}
              >
                Max
              </Grid>
            </Grid>
            <Grid
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '104%',
                height: 350,
                marginTop: 25,
                marginBottom: 25,
              }}
            >
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Grid className={`${classes.heading}`} style={{ width: 200 }}>
                  1. Sales Closed ($ 000)
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ marginLeft: -70, width: 20 }}
                >
                  <Tooltip
                    title={
                      <p
                        style={{
                          fontSize: 10,
                          margin: 0,
                          fontWeight: 'normal',
                        }}
                      >
                        For individuals, the summation amount of all
                        Opportunities that have been marked “Closed Won” with a
                        Close Date in a given time interval where that
                        individual is the current opportunity owner. At a team
                        level, the average or total, per rep on that team.
                      </p>
                    }
                    placement="top"
                    arrow
                  >
                    <Icon
                      component={InfoOutlinedIcon}
                      style={{ color: '#65789B' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ width: 60, textAlign: 'center' }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setsalesClosedMin}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={salesClosed.min}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
                <Grid className={`${classes.heading}`} style={{ width: 63 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setsalesClosedMax}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={salesClosed.max}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Grid className={`${classes.heading}`} style={{ width: 200 }}>
                  2. Deals Closed
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ marginLeft: -70, width: 20 }}
                >
                  <Tooltip
                    title={
                      <p
                        style={{
                          fontSize: 10,
                          margin: 0,
                          fontWeight: 'normal',
                        }}
                      >
                        For individuals, the number of all Opportunities that
                        have been marked “Closed Won” with a Close Date in a
                        given time interval where that individual is the current
                        opportunity owner. At a team level, the total, per rep
                        on that team.
                      </p>
                    }
                    placement="top"
                    arrow
                  >
                    <Icon
                      component={InfoOutlinedIcon}
                      style={{ color: '#65789B' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ width: 60, textAlign: 'center', fontSize: 'medium' }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setDealsClosedMin}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={dealsClosed.min}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
                <Grid className={`${classes.heading}`} style={{ width: 63 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setDealsClosedMax}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={dealsClosed.max}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Grid className={`${classes.heading}`} style={{ width: 200 }}>
                  3. Deal Size ($ 000)
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ marginLeft: -70, width: 20 }}
                >
                  <Tooltip
                    title={
                      <p
                        style={{
                          fontSize: 10,
                          margin: 0,
                          fontWeight: 'normal',
                        }}
                      >
                        For individuals, the average of bookings of per
                        Opportunitiy that have been marked “Closed Won” with a
                        Close Date in a given time interval where that
                        individual is the current opportunity owner. At a team
                        level, the average, per rep on that team.
                      </p>
                    }
                    placement="top"
                    arrow
                  >
                    <Icon
                      component={InfoOutlinedIcon}
                      style={{ color: '#65789B' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ width: 60, textAlign: 'center' }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setDealSizeMin}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={dealsSize.min}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
                <Grid className={`${classes.heading}`} style={{ width: 63 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setDealSizeMax}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={dealsSize.max}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Grid className={`${classes.heading}`} style={{ width: 200 }}>
                  4. Quota Attainment (%)
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ marginLeft: -70, width: 20 }}
                >
                  <Tooltip
                    title={
                      <p
                        style={{
                          fontSize: 10,
                          margin: 0,
                          fontWeight: 'normal',
                        }}
                      >
                        For individuals measures a their sales closed, as a
                        percentage of their quota for that period. It is a
                        measure of how close they were to reaching their goal
                        for a given time interval.
                      </p>
                    }
                    placement="top"
                    arrow
                  >
                    <Icon
                      component={InfoOutlinedIcon}
                      style={{ color: '#65789B' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ width: 60, textAlign: 'center' }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setQAMin}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={quotaAttainment.min}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
                <Grid className={`${classes.heading}`} style={{ width: 63 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setQAMax}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={quotaAttainment.max}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Grid className={`${classes.heading}`} style={{ width: 200 }}>
                  5. Win Rate (%)
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ marginLeft: -70, width: 20 }}
                >
                  <Tooltip
                    title={
                      <p
                        style={{
                          fontSize: 10,
                          margin: 0,
                          fontWeight: 'normal',
                        }}
                      >
                        It is the percentage of total new business opportunities
                        closed that were won in the given time period. It is
                        calculated by dividing the number of opportunities
                        closed won in a given period over the total number of
                        opportunities closed won and closed lost during that
                        period.
                      </p>
                    }
                    placement="top"
                    arrow
                  >
                    <Icon
                      component={InfoOutlinedIcon}
                      style={{ color: '#65789B' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ width: 60, textAlign: 'center' }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setWRMin}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={winRate.min}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
                <Grid className={`${classes.heading}`} style={{ width: 63 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setWRMax}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={winRate.max}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Grid className={`${classes.heading}`} style={{ width: 200 }}>
                  6. Sales Cycle (Days)
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ marginLeft: -70, width: 20 }}
                >
                  <Tooltip
                    title={
                      <p
                        style={{
                          fontSize: 10,
                          margin: 0,
                          fontWeight: 'normal',
                        }}
                      >
                        It is measured by the average number of days from an
                        opportunity's creation to Closed Won.
                      </p>
                    }
                    placement="top"
                    arrow
                  >
                    <Icon
                      component={InfoOutlinedIcon}
                      style={{ color: '#65789B' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid
                  className={`${classes.heading}`}
                  style={{ width: 60, textAlign: 'center' }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setSCMin}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={salesCycle.min}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
                <Grid className={`${classes.heading}`} style={{ width: 63 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={setSCMax}
                    type="text"
                    style={{
                      width: 72,
                      textAlign: 'center',
                      background: 'rgba(246, 246, 246, 1)',
                    }}
                    defaultValue={salesCycle.max}
                    inputProps={{
                      style: {
                        textAlign: 'center',
                        marginTop: 3,
                        fontSize: 'medium',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            style={{
              marginTop: 12,
              textAlign: 'center',
            }}
          >
            <Button
              size="large"
              color="primary"
              variant="contained"
              style={{
                width: 249,
                height: 46,
                fontSize: 20,
              }}
              classes={{ containedSizeLarge: classes.buttonFont }}
              onClick={() => saveUserSettings()}
            >
              {_t_('Save Changes')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OutcomeScales;
