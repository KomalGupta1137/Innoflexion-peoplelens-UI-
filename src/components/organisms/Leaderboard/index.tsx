/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Divider,
  Grid,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import KeyInputDriverBattleCards from '../KeyInputDriverBattleCards';

import HighPerformer from '../../../../src/assets/BattleCardsImages/highperformer.png';

import HighPotential from '../../../../src/assets/BattleCardsImages/highpotential.png';
import { QueryResult, useQuery } from '@apollo/client';
import { dates } from '../ManagerDashboard';

import {
  battleCard as BattleCardResponse,
  battleCard_battleCard_battleCardActions,
  leaderBoard as LeaderBoardResponse,
  rangeData as RangeDataResponse,
} from '../../../gql/types';
import Loader from '../../atoms/Loader';
import { GetBattleCards } from '../../../gql/queries/battleCards';
import BubbleChart from '../../molecules/BubbleChart';
import {
  GetLeaderBoardData,
  GetRangeData,
} from '../../../gql/queries/leaderBoard';
import { _n_ } from '../../../utils/numerals/numerals';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import BubbleChartPopup from '../BubbleChartPopup';
import { PersonProps } from '../BubbleChartPopup/index';
import { _t_ } from '../../../utils/translation/translation';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import ReactGA from 'react-ga';
ReactGA.pageview(window.location.pathname);

export interface LeaderboardProps {
  activeQuarter: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  activeQuarter,
}: LeaderboardProps) => {
  ReactGA.event({
    category: 'Manager Lens',
    action: 'Manager Leaderboard',
  });
  const bubbleData: {
    x: number;
    y: number;
    z: number;
    bucketNo: number;
    color: any;
  }[] = [];

  const [battleCardActions, setBattleCardActions] = useState<
    battleCard_battleCard_battleCardActions[]
  >([]);

  const personData: PersonProps[] = [];
  const [selectedCount, setSelectedCount] = useState<number>(-1);

  const [width] = useWindowSize();

  const returnWidth = () => {
    if (width < 1500) {
      return '510px';
    } else if (width > 1500) {
      return '600px';
    }
  };
  const useStyles = makeStyles({
    bubbleChartContainer: {
      height: 420,
      backgroundColor: COLORS.GAMMA_WHITE,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
    },
    battleCardsTitle: {
      marginTop: 36,
    },
    battleCardTitleText: {
      marginBottom: 24,
    },
    battlecard: {
      height: '628px',
      width: returnWidth,
      backgroundColor: COLORS.GAMMA_WHITE,
      borderRadius: 4,
      border: '2px solid ' + COLORS.GAMMA_WHITE,
      boxShadow: '0px 0px 18px ' + COLORS.BATTLECARD_BOX_SHADOW,
    },
    battleCardDiv: {
      marginTop: 23,
    },
    topHeading: {
      paddingTop: '37px',
      lineHeight: '20px',
      paddingLeft: '40px',
    },
    divider: {
      backgroundColor: COLORS.BATTLECARD_DIVIDER_COLOR,
      borderRadius: '4px',
      marginTop: '30px',
    },
    verticalDivider: {
      backgroundColor: COLORS.BORDER_PRIMARY,
      height: '620px',
    },
    avatar: {
      width: '116.78px',
      height: '127.38px',
    },
    avatar1: {
      width: '121px',
      height: '113.06px',
    },
    image: {
      paddingTop: '180px',
      paddingBottom: '180px',
      marginLeft: width < 1500 ? 200 : 250,
    },
    bubbleChartWidget: {
      padding: '2% 5% 2% 5%',
    },
  });
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [bucketNum, setBucketNum] = useState(0);
  const [popOverCoordinates, setPopOverCoordinates] = useState({ x: 0, y: 0 });

  let [activePersonLeft, setActivePersonLeft] = useState<
    PersonProps | undefined
  >({});
  let [activePersonRight, setActivePersonRight] = useState<
    PersonProps | undefined
  >({});
  let [data, setBattleCardData] = useState<any>([]);
  let [data1, setBattleCardData1] = useState<any>([]);
  const [dropDownOption, setDropDownOption] = useState('Quota Attainment');

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    setSelectedCount(-1);
  }, [activeQuarter]);

  const selectPerson = async (person: PersonProps) => {
    setBattleCardActions([]);
    let isCountUpdate = true;
    if (selectedCount === 0) {
      if (
        activePersonLeft?.id &&
        person?.id &&
        person?.id !== activePersonLeft?.id
      ) {
        if (dropDownOption.toLowerCase().includes('sales cycle')) {
          if (
            person?.value &&
            activePersonLeft?.value &&
            person?.value >= activePersonLeft?.value
          ) {
            activePersonRight = activePersonLeft;
            setActivePersonRight && setActivePersonRight(activePersonLeft);
            activePersonLeft = person;
            setActivePersonLeft && setActivePersonLeft(person);
          } else {
            activePersonRight = person;
            setActivePersonRight && setActivePersonRight(person);
          }
        } else {
          if (
            person?.value &&
            activePersonLeft?.value &&
            person?.value >= activePersonLeft?.value
          ) {
            activePersonRight = person;
            setActivePersonRight && setActivePersonRight(person);
          } else {
            activePersonRight = activePersonLeft;
            setActivePersonRight && setActivePersonRight(activePersonLeft);
            activePersonLeft = person;
            setActivePersonLeft && setActivePersonLeft(person);
          }
        }
      } else {
        setActivePersonRight && setActivePersonRight({ id: '' });
        isCountUpdate = false;
      }
    } else if (selectedCount === -1 || selectedCount === 1) {
      activePersonLeft = person;
      setActivePersonLeft && setActivePersonLeft(person);
    }
    if (isCountUpdate) {
      setSelectedCount &&
        (selectedCount === -1 || selectedCount
          ? setSelectedCount(0)
          : setSelectedCount(1));
    }
    if (
      activePersonLeft?.id != undefined &&
      activePersonRight?.id != undefined
    ) {
      getBattleCards(activePersonLeft?.id, activePersonRight?.id);
    }
    handleClose && handleClose();
  };

  // let jsonData: battleCard;

  const getBattleCards = async (
    leftPersonId: string,
    rightPersonId: string,
  ) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getBattleCards`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: dates?.[activeQuarter].startDate,
          endDate: dates?.[activeQuarter].endDate,
          outcome: dropDownOption,
          product: localStorage.getItem('productSelected'),
          quarter: activeQuarter,
          userId1: leftPersonId,
          userId2: rightPersonId,
        }),
      },
    ).then(async (response) => {
      var jsonData = await response.json();
      data = jsonData;
      setBattleCardData && setBattleCardData(jsonData);
      setBattleCardData1 && setBattleCardData1(jsonData);
    });
  };

  const {
    data: data2,
    error: error2,
    loading: loading2,
  }: QueryResult<LeaderBoardResponse> = useQuery(GetLeaderBoardData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter].startDate,
        endDate: dates?.[activeQuarter].endDate,
      },
      outComeType: dropDownOption,
    },
  });

  const { data: data3 }: QueryResult<RangeDataResponse> = useQuery(
    GetRangeData,
    {
      variables: {
        dashboardInput: {
          startDate: dates?.[activeQuarter].startDate,
          endDate: dates?.[activeQuarter].endDate,
        },
        rangeNo: bucketNum,
        outComeType: dropDownOption,
      },
    },
  );

  data3?.rangeData?.map((d) => {
    personData.push({
      avatar: '',
      name: d?.user?.firstName,
      lastName: d?.user?.lastName,
      value: d?.metricValue
        ? parseInt(parseFloat(d?.metricValue).toFixed())
        : 0,
      id: d?.user?.userId,
    });
  });

  if (loading2) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error2) return <>`Error! ${error2?.message}` </>;

  let color = 0;
  let colorChangeInd = false;
  let prevColor = 0;
  const colorCutoffAt =
    data2?.leaderBoard?.avgMetricVal != null &&
    data2?.leaderBoard?.avgMetricVal != undefined &&
    data2?.leaderBoard?.maxMetricVal != null &&
    data2?.leaderBoard?.maxMetricVal != undefined &&
    data2?.leaderBoard?.minMetricVal != null &&
    data2?.leaderBoard?.minMetricVal != undefined &&
    dropDownOption !== 'Sales Cycle'
      ? data2.leaderBoard.avgMetricVal -
        (data2.leaderBoard.maxMetricVal - data2.leaderBoard.minMetricVal) / 10
      : data2?.leaderBoard?.avgMetricVal != null &&
        data2?.leaderBoard?.avgMetricVal != undefined &&
        data2?.leaderBoard?.maxMetricVal != null &&
        data2?.leaderBoard?.maxMetricVal != undefined &&
        data2?.leaderBoard?.minMetricVal != null &&
        data2?.leaderBoard?.minMetricVal != undefined &&
        dropDownOption === 'Sales Cycle'
      ? data2.leaderBoard.avgMetricVal -
        (data2.leaderBoard.minMetricVal - data2.leaderBoard.maxMetricVal) / 10
      : 0;
  const minRangeValue =
    data2?.leaderBoard?.minMetricVal != null &&
    data2?.leaderBoard?.minMetricVal != undefined
      ? data2.leaderBoard.minMetricVal
      : 0;

  data2?.leaderBoard?.rangeCount?.forEach(function (item, index) {
    if (
      data2.leaderBoard?.minMetricVal != null &&
      data2.leaderBoard?.maxMetricVal != null &&
      item?.maxRangeVal != null &&
      item?.minRangeVal != null &&
      item?.avgRangeVal != null &&
      dropDownOption !== 'Sales Cycle'
    ) {
      if (item?.avgRangeVal < colorCutoffAt) {
        color = Math.max(
          (0.3 - 0.1) *
            ((item?.avgRangeVal - data2.leaderBoard?.minMetricVal) /
              (colorCutoffAt - data2.leaderBoard?.minMetricVal)) +
            0.1,
          0.05,
        );
      } else if (
        item?.avgRangeVal >= colorCutoffAt &&
        item?.minRangeVal <= colorCutoffAt
      ) {
        prevColor = color;
        color = -1;
        colorChangeInd = true;
      } else {
        color = item?.bucketNo
          ? (1.0 - 0.65) *
              ((item?.avgRangeVal - colorCutoffAt) /
                (data2.leaderBoard?.maxMetricVal - colorCutoffAt)) +
            0.65
          : 0.65;
      }
    } else if (
      data2.leaderBoard?.minMetricVal != null &&
      data2.leaderBoard?.maxMetricVal != null &&
      item?.maxRangeVal != null &&
      item?.minRangeVal != null &&
      item?.avgRangeVal != null &&
      dropDownOption === 'Sales Cycle'
    ) {
      if (item?.avgRangeVal > colorCutoffAt) {
        color = Math.max(
          (0.3 - 0.1) *
            ((item?.avgRangeVal - data2.leaderBoard?.maxMetricVal) /
              (colorCutoffAt - data2.leaderBoard?.maxMetricVal)) +
            0.1,
          0.05,
        );
      } else if (
        item?.avgRangeVal <= colorCutoffAt &&
        item?.maxRangeVal >= colorCutoffAt
      ) {
        prevColor = color;
        color = -1;
        colorChangeInd = true;
      } else {
        color = item?.bucketNo
          ? (1.0 - 0.65) *
              ((item?.avgRangeVal - colorCutoffAt) /
                (data2.leaderBoard?.minMetricVal - colorCutoffAt)) +
            0.65
          : 0.65;
      }
    }

    let conditionalX = 0;
    if (dropDownOption === 'Sales Cycle') {
      conditionalX =
        item?.bucketNo !== null &&
        item?.bucketNo !== undefined &&
        item?.bucketNo
          ? item?.bucketNo
          : 0;
    }

    if (dropDownOption === 'Quota Attainment') {
      conditionalX = index;
    }
    bubbleData.push({
      x:
        item?.bucketNo !== null &&
        item?.bucketNo !== undefined &&
        (dropDownOption === 'Sales Cycle' ||
          dropDownOption === 'Quota Attainment')
          ? conditionalX
          : item?.avgRangeVal
          ? item?.avgRangeVal - minRangeValue
          : 0,
      y: 1,
      z: item?.bucketCount ? item?.bucketCount : 0,
      bucketNo: item?.bucketNo ? item?.bucketNo : 0,
      // bucketNo: item?.avgRangeVal ? item?.avgRangeVal : 0,
      color:
        color < 0
          ? {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, d3ScaleChromatic.interpolateRdYlGn(prevColor + 0.05)],
                [1, d3ScaleChromatic.interpolateRdYlGn(0.65)],
              ],
            }
          : d3ScaleChromatic.interpolateRdYlGn(color),
    });
  });

  const bubbleOnClick = (e: any) => {
    setBucketNum(e.point.bucketNo);
    setAnchorEl(e.currentTarget);
    setPopOverCoordinates({ x: e.clientX, y: e.clientY });
  };

  const dropdownOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setDropDownOption(e.target.value);
    setSelectedCount(-1);
    setActivePersonLeft({});
    setActivePersonRight({});
  };

  const userName1 =
    data?.battleCard &&
    data?.battleCard[0]?.name &&
    `${data?.battleCard[0]?.name}`;

  const userId1 =
    data?.battleCard &&
    data?.battleCard[0]?.userId &&
    `${data?.battleCard[0]?.userId}`;

  const userName2 =
    data1?.battleCard &&
    data1?.battleCard[1]?.name &&
    `${data1?.battleCard[1]?.name}`;

  const userId2 =
    data?.battleCard &&
    data?.battleCard[1]?.userId &&
    `${data?.battleCard[1]?.userId}`;

  const prefix = data2?.leaderBoard?.metricDimension
    ? data2?.leaderBoard?.metricDimension === ('Amount' || 'Days')
      ? data2?.leaderBoard?.metricDimension === 'Amount'
        ? '$'
        : 'Days'
      : ''
    : '';
  const suffix = data2?.leaderBoard?.metricDimension
    ? data2?.leaderBoard?.metricDimension === ('Amount' || 'Days')
      ? ''
      : data2?.leaderBoard?.metricDimension
    : '';

  return (
    <>
      <Grid
        data-testid="bubble-chart-container"
        className={classes.bubbleChartContainer}
      >
        <Grid item className={classes.bubbleChartWidget}>
          <BubbleChart
            min={
              data2?.leaderBoard?.minMetricVal
                ? parseFloat(_n_(data2?.leaderBoard?.minMetricVal, '0.0'))
                : 0
            }
            max={
              data2?.leaderBoard?.maxMetricVal
                ? parseFloat(_n_(data2?.leaderBoard?.maxMetricVal, '0.0'))
                : 0
            }
            avg={
              data2?.leaderBoard?.avgMetricVal
                ? parseFloat(_n_(data2?.leaderBoard?.avgMetricVal, '0.0'))
                : 0
            }
            colorCutoff={colorCutoffAt}
            prefix={
              data2?.leaderBoard?.metricDimension
                ? data2?.leaderBoard?.metricDimension === ('Amount' || 'Days')
                  ? data2?.leaderBoard?.metricDimension === 'Amount'
                    ? '$'
                    : 'Days'
                  : ''
                : ''
            }
            suffix={
              data2?.leaderBoard?.metricDimension
                ? data2?.leaderBoard?.metricDimension === ('Amount' || 'Days')
                  ? ''
                  : data2?.leaderBoard?.metricDimension
                : ''
            }
            bubbleData={bubbleData}
            bubbleOnClick={bubbleOnClick}
            dropdownOnChange={dropdownOnChange}
            dropdownSelection={dropDownOption}
            activePersonNameLeft={
              activePersonLeft?.name && activePersonLeft?.name
            }
            activePersonLastNameLeft={
              activePersonLeft?.lastName && activePersonLeft?.lastName
            }
            selectedCount={selectedCount}
            activePersonValueLeft={
              activePersonLeft?.value && activePersonLeft?.value
            }
          />
        </Grid>
      </Grid>
      <Grid
        data-testid="battlecards-header"
        className={classes.battleCardsTitle}
      >
        <>
          {selectedCount === -1 || selectedCount === 0 ? (
            <Grid item>
              <Typography
                variant="h2"
                color="textPrimary"
                className={classes.battleCardTitleText}
              >
                {_t_('Key Input Driver Battlecards')}
              </Typography>
              <Typography
                className={globalClasses.h2Light}
                color="textSecondary"
              >
                {' '}
                {_t_('The battlecards provide deeper insights on key')}{' '}
                <span style={{ fontWeight: 500 }}>
                  {_t_('organization, people and customer')}
                </span>{' '}
                {_t_('drivers impacting every reps’ sales outcomes.')}
              </Typography>
            </Grid>
          ) : (
            <Typography
              variant="h2"
              color="textPrimary"
              className={classes.battleCardTitleText}
            >
              {data?.battleCard && data?.battleCard[0]?.battleCardType}
            </Typography>
          )}
        </>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.battleCardDiv}
      >
        <Grid item>
          {
            selectedCount === 1 ? (
              <KeyInputDriverBattleCards
                battleCardData={
                  data?.battleCard && data?.battleCard[0]?.battleCardData
                }
                battleCardActions={
                  data?.battleCard && data?.battleCard[0]?.battleCardActions
                }
                name={userName1}
                userId={userId1}
                image={activePersonLeft?.avatar}
                heading={selectedCount === 1 ? 'High Potential' : ''}
                trainingName={data?.battleCard && data?.battleCard[0]?.title}
              />
            ) : (
              <Grid container direction="column" className={classes.battlecard}>
                <Grid item>
                  <Typography
                    variant="h2"
                    className={classes.topHeading}
                    color="textSecondary"
                  >
                    {_t_('High Potential')}
                  </Typography>
                </Grid>
                <Grid item>
                  {/* style={{ border: '1px solid red' }} */}
                  <Divider className={classes.divider}></Divider>
                </Grid>
                <Grid item className={classes.image}>
                  <img src={HighPotential} className={classes.avatar1} />
                </Grid>
              </Grid>
            )
            // <div className={classes.battlecard} />
          }
        </Grid>
        <Grid item>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.verticalDivider}
          />
        </Grid>
        <Grid item>
          {selectedCount === 1 && activePersonRight?.id !== '' ? (
            <KeyInputDriverBattleCards
              battleCardData={
                data1?.battleCard && data1?.battleCard[1]?.battleCardData
              }
              battleCardActions={
                data1?.battleCard && data1?.battleCard[1]?.battleCardActions
              }
              name={userName2}
              userId={userId2}
              image={activePersonRight?.avatar}
              heading="High Performer"
              trainingName={data1?.battleCard && data1?.battleCard[1]?.title}
            />
          ) : (
            // <div className={classes.battlecard} onClick={handleClick} />
            <Grid container direction="column" className={classes.battlecard}>
              <Grid item>
                <Typography
                  variant="h2"
                  className={classes.topHeading}
                  color="textSecondary"
                >
                  {/* {selectedCount >= 0 ? '' : _t_('High Performer')} */}
                  {_t_('High Performer')}
                </Typography>
              </Grid>
              <Grid item>
                <Divider className={classes.divider}></Divider>
              </Grid>
              <Grid item className={classes.image}>
                <img src={HighPerformer} className={classes.avatar} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: popOverCoordinates.y,
          left: popOverCoordinates.x,
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <BubbleChartPopup
          data={personData}
          selectPerson={selectPerson}
          prefix={prefix}
          suffix={suffix}
        />
      </Popover>
    </>
  );
};

export default Leaderboard;
