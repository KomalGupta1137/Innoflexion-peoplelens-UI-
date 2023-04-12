/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  deeperInsight as DeeperInsightResponse1,
  getDashboardData as DashboardResponse,
  peopleactivityQuery as PeopleActivitiesData,
  portfolioGrossMargin as portfolioGrossMargin1,
  report as ReportDataResponse,
} from '../../../gql/types';
import { _t_ } from '../../../utils/translation/translation';
// import ActivityScores from '../ActivityScore/index';
import { QueryResult, useQuery } from '@apollo/client';
import {
  GetDashboardData,
  GetPeopleActivitiesData,
} from '../../../gql/queries/dashboard';
import { GetDeeperInsights } from '../../../gql/queries/deeperInsights';
import { GetPortfolioGrossMargin } from '../../../gql/queries/grossMargin';

import { dates } from '../ManagerDashboard';
import Loader from '../../atoms/Loader';

import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import { COLORS } from '../../../plTheme';
import { useGlobalStyles } from '../../../plStyles';
import ClosedSales from '../../molecules/ClosedSales';
import CircularProgressWidget from '../../molecules/CircularProgressWidget';
import ProductPortfolio from '../../molecules/ProductPortfolio';
import AvgDealSize from '../../molecules/AvgDealSize';
import ProductPenetrationWidget from '../ProductPenetrationWidget';
import ProductPenetrationGraph from '../../molecules/ProductPenetrationGraph';
import MyTeamTree from '../../molecules/MyTeamTree';
import Diversity from '../../molecules/Diversity';
import AttritionRate from '../../molecules/AttritionRate';
import RatingChartWidget from '../RatingChartWidget';
import AvgTimeToHire from '../../molecules/AvgTimeToHire';
import LineGraph from '../../molecules/DepperInsightsGraph/index';
import { GetReportData } from '../../../gql/queries/report';
import ReportCompetenciesWidget from '../../molecules/ReportCompetenciesWidget';
import ReportSalesActivitiesWidget from '../../molecules/ReportSalesActivitiesWidget';
import ReportSalesOutcomeWidget from '../../molecules/ReportSalesOutcomeWidget';
import { subtractDate } from '../../../utils/subtractDate/index';
import Footer from './footer';
import { ProductColorContext } from '../../../utils/productColorContext';
import ReportCover from '../../../assets/ReportCover.png';
import { format, utcToZonedTime } from 'date-fns-tz';
import ReactGA from 'react-ga';
import moment from 'moment';
ReactGA.pageview(window.location.pathname);

export interface ReportsProps {
  activeQuarter: number;
  highPotentialUser: any;
  highPerformerUser: any;
  managerName: string;
}

const Reports: React.FC<ReportsProps> = ({
  activeQuarter,
  highPotentialUser,
  highPerformerUser,
  managerName,
}: ReportsProps) => {
  const datesTemp = [
    {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-12-31T23:59:59.999Z',
    },
    {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-03-31T23:59:59.999Z',
    },
    {
      startDate: '2021-04-01T00:00:00.000Z',
      endDate: '2021-06-30T23:59:59.999Z',
    },
    {
      startDate: '2021-07-01T00:00:00.000Z',
      endDate: '2021-09-30T23:59:59.999Z',
    },
    {
      startDate: '2021-10-01T00:00:00.000Z',
      endDate: '2021-12-31T23:59:59.999Z',
    },
    {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-06-30T23:59:59.999Z',
    },
    {
      startDate: '2021-07-01T00:00:00.000Z',
      endDate: '2021-12-31T23:59:59.999Z',
    },
  ];
  ReactGA.event({
    category: 'Manager Lens',
    action: 'Manager Reports',
  });
  const { ProductColorMap, setProductColorMap } = React.useContext(
    ProductColorContext,
  );

  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
        userId: '',
      },
    },
  });

  const {
    loading: loading2,
    error: error2,
    data: data2,
    refetch: refetch2,
  }: QueryResult<DeeperInsightResponse1> = useQuery(GetDeeperInsights, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
      },
    },
  });
  const {
    loading: loading6,
    error: error6,
    data: data6,
    refetch: refetch6,
  }: QueryResult<portfolioGrossMargin1> = useQuery(GetPortfolioGrossMargin, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
      },
    },
  });

  const {
    loading: loading3,
    error: error3,
    data: data3,
    refetch: refetch3,
  }: QueryResult<ReportDataResponse> = useQuery(GetReportData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
        userId: highPotentialUser.userId,
      },
    },
  });

  const {
    loading: loading10,
    error: error10,
    data: data4,
    refetch: refetch10,
  }: QueryResult<ReportDataResponse> = useQuery(GetReportData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
        userId: highPerformerUser.userId,
      },
    },
  });

  const {
    loading: reportDataLoading,
    error: reportDataError,
    data: reportData1,
    refetch: reportDataRefetch,
  }: QueryResult<ReportDataResponse> = useQuery(GetReportData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
        userId: highPotentialUser.userId,
      },
    },
  });

  const {
    loading: loading4,
    error: error4,
    data: highPerformerUserData,
    refetch: refetch4,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
        userId: highPerformerUser.userId,
      },
    },
  });

  const {
    loading: loading5,
    error: error5,
    data: highPotentialUserData,
    refetch: refetch5,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
        userId: highPotentialUser.userId,
      },
    },
  });

  const {
    loading: loadingPeopleActivitiesFirstPerson,
    error: errorInPeopleActivitiesFirstPerson,
    data: peopleActivitiesDataFirstPerson,
    refetch: refetchPeopleActivitiesFirstPerson,
  }: QueryResult<PeopleActivitiesData> = useQuery(GetPeopleActivitiesData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
        userId: highPotentialUser.userId,
      },
      persona: '',
    },
  });

  const {
    loading: loadingPeopleActivitiesSecondPerson,
    error: errorInPeopleActivitiesSecondPerson,
    data: peopleActivitiesDataSecondPerson,
    refetch: refetchPeopleActivitiesSecondPerson,
  }: QueryResult<PeopleActivitiesData> = useQuery(GetPeopleActivitiesData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter + 1].startDate,
        endDate: dates?.[activeQuarter + 1].endDate,
        userId: highPerformerUser.userId,
      },
      persona: '',
    },
  });

  const {
    loading: loading9,
    error: error9,
    data: data9,
    refetch: refetch9,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: subtractDate(dates?.[activeQuarter + 1].startDate),
        endDate: subtractDate(dates?.[activeQuarter + 1].endDate),
        userId: '',
      },
    },
  });
  const {
    loading: loading8,
    error: error8,
    data: data8,
    refetch: refetch8,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: subtractDate(dates[0].startDate),
        endDate: subtractDate(dates[3].endDate),
        userId: '',
      },
    },
  });

  const {
    loading: loadingBusinessOutcomesAnnual,
    error: errorBusinessOutcomesAnnual,
    data: dataBusinessOutcomesAnnual,
    refetch: refetchBusinessOutcomesAnnual,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: dates[0].startDate,
        endDate:
          new Date().getDate() >= 15
            ? moment(new Date())
                .subtract(1, 'months')
                .set('year', 2020)
                .endOf('month')
                .format('YYYY-MM-DD')
            : moment(new Date())
                .subtract(2, 'months')
                .set('year', 2020)
                .endOf('month')
                .format('YYYY-MM-DD'),
        userId: '',
      },
    },
  });

  const useStyles = makeStyles({
    page: {
      width: '8.5in',
      height: '11in',
      padding: '20mm 20mm 0mm 20mm',
      margin: '10mm auto',
      boxSizing: 'border-box',
      border: '1px #D3D3D3 solid',
      borderRadius: '5px',
      background: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      pageBreakAfter: 'always',
      display: 'flex',
      'flex-direction': 'column',
      '&>:first-child': {
        flex: 1,
      },
    },
    coverPage: {
      backgroundImage: `url(${ReportCover}) !important`,
      backgroundRepeat: 'no-repeat !important',
      backgroundPosition: '100% 100% !important',
    },
    footer: {
      padding: '5mm 0mm',
    },
    subpage: {
      padding: '1cm',
      border: '5px red solid',
      height: '257mm',
      outline: '2cm #FFEAEA solid',
    },
    mainTitle: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    date: {
      color: COLORS.GENERAL_CHART_1,
    },
    footerImage: {
      height: 33,
      width: 116,
    },
    spanText: {
      marginRight: 20,
      textTransform: 'uppercase',
    },
    fullHeight: {
      height: '100%',
    },
    rightHeading: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      marginRight: '21.94px',
      fontSize: 14,
    },
    rightHeading1: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginRight: '21.94px',
      marginTop: -5,
      fontWeight: 400,
    },
    widgets: {
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 18px 0px ' + COLORS.REPORTS_BOX_SHADOW,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    hideWhenPrint: {},
    [`@media print`]: {
      'html, body': {
        height: '100vh',
      },
      '@page': {
        margin: '0 0',
        padding: 0,
        width: '8.5in',
        height: '11in',
      },
      widgets: {
        boxShadow: 'none',
      },
      page: {
        boxShadow: 'none',
        margin: 0,
        border: 0,
        background: 'white',
      },
      hideWhenPrint: {
        pageBreakAfter: 'always',
        //   margin: '0mm 0mm 0mm 10mm',
        padding: '0mm',
        border: '0px',
        borderRadius: '0px',
        background: 'white',
        boxShadow: '0 0 0px rgba(0, 0, 0, 0.1)',
      },
    },
    page6Heading: {
      lineHeight: '20px',

      marginTop: -20,
    },
    page6HeadingComponent: {
      marginLeft: 25, // from 5

      width: '87%',
    },
    page6Avatar: {
      width: '45px',
      height: '45px',
      marginTop: -30,
      marginLeft: 50,
    },
    page6AvatarName: {
      lineHeight: '20px',
      marginTop: -28,
      marginLeft: 2,
    },
    salesActivitiesHeading: {
      marginTop: 10,
      lineHeight: '20px',
      marginLeft: 25,
      marginBottom: 10,
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [dummyFlag, setDummyFlag] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (num: number) => {
    setActiveTab(num);
  };
  // useEffect(() => {
  //   void refetch();
  //   void refetch2();
  //   void refetch3();
  //   void refetch4();
  //   void refetch5();
  //   void refetch6();
  //   void refetch8();
  //   void refetch9();
  //   void refetchPeopleActivitiesFirstPerson();
  //   void refetchPeopleActivitiesSecondPerson();
  //   void reportDataRefetch();
  // }, [
  //   activeQuarter,
  //   refetch,
  //   refetch2,
  //   refetch3,
  //   refetch4,
  //   refetch5,
  //   refetch8,
  //   refetch9,
  //   refetchPeopleActivitiesFirstPerson,
  //   refetchPeopleActivitiesSecondPerson,
  //   reportDataRefetch,
  // ]);

  useEffect(() => {
    setProductColorMap(data?.getDashboardData?.productColorMap);
  }, [data]);

  if (loading2 || loading3 || loading10 || loading8 || loading9) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error2) return <>`Error! ${error2.message}` </>;

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error) return <>`Error! ${error.message}` </>;

  if (loading3 || loading10) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error3) return <>`Error! ${error3.message}` </>;
  if (error10) return <>`Error! ${error10.message}` </>;

  if (loading4) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error4) return <>`Error! ${error4.message}` </>;

  if (loading5) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error5) return <>`Error! ${error5.message}` </>;

  if (loadingPeopleActivitiesFirstPerson) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (errorInPeopleActivitiesFirstPerson)
    return <>`Error! ${errorInPeopleActivitiesFirstPerson.message}` </>;

  if (loadingPeopleActivitiesSecondPerson) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (errorInPeopleActivitiesSecondPerson)
    return <>`Error! ${errorInPeopleActivitiesSecondPerson.message}` </>;

  if (reportDataLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (reportDataError) return <>`Error! ${reportDataError.message}` </>;

  const dashboardData = data?.getDashboardData;
  const dashboardDataAnnual = dataBusinessOutcomesAnnual?.getDashboardData;

  const avgDealSize =
    dashboardData?.salesOutcome?.totalSalesClosed?.overallTotalSalesClosed &&
    dashboardData?.salesOutcome?.noOfDeals &&
    dashboardData?.salesOutcome?.totalSalesClosed?.overallTotalSalesClosed /
      dashboardData?.salesOutcome?.noOfDeals;

  const avgDealSizeAnnual =
    dashboardDataAnnual?.salesOutcome?.totalSalesClosed
      ?.overallTotalSalesClosed &&
    dashboardDataAnnual?.salesOutcome?.noOfDeals &&
    dashboardDataAnnual?.salesOutcome?.totalSalesClosed
      ?.overallTotalSalesClosed / dashboardDataAnnual?.salesOutcome?.noOfDeals;

  const graphLenth = 2;
  const graphSize = data2?.deeperInsight?.graphData
    ? data2?.deeperInsight?.graphData.length
    : 0;
  const rows = [];

  for (let i = 0; i < graphLenth; i++) {
    rows.push(i);
  }
  const xaxisRange = [
    [1, 5],
    [40, 80],
    [10, 50],
    [10, 50],
    [10, 100],
  ];
  const yaxisRange = [
    [30, 60],
    [30, 60],
    [200, 550],
    [300, 550],
    [10, 60],
  ];

  const myMap = [];

  for (let i = 0; i < graphSize; i = i + 2) {
    const f =
      data2?.deeperInsight?.graphData && data2?.deeperInsight?.graphData[i];
    if (i + 1 < graphSize) {
      const s =
        data2?.deeperInsight?.graphData &&
        data2?.deeperInsight?.graphData[i + 1];
      myMap.push({ id: i, array: [f, s] });
    } else {
      myMap.push({ id: i, array: [f] });
    }
  }

  const GrossMargin = [];
  const GrossMarginLen = data6?.portfolioGrossMargin?.grossMarginData
    ? data6?.portfolioGrossMargin?.grossMarginData?.length
    : 0;
  for (let i = 0; i < GrossMarginLen; i++) {
    const name =
      data6?.portfolioGrossMargin?.grossMarginData &&
      data6?.portfolioGrossMargin?.grossMarginData[i]?.productName;
    const value =
      data6?.portfolioGrossMargin?.grossMarginData &&
      data6?.portfolioGrossMargin?.grossMarginData[i]?.productPercentage;
    GrossMargin.push([name, value]);
  }
  const SalesCycle = [];
  dashboardData?.salesOutcome?.totalSalesCycle;
  const SalesCycleLen = dashboardData?.salesOutcome?.totalSalesCycle
    ? dashboardData?.salesOutcome?.totalSalesCycle?.length
    : 0;
  for (let i = 0; i < SalesCycleLen; i++) {
    const name =
      dashboardData?.salesOutcome?.totalSalesCycle &&
      dashboardData?.salesOutcome?.totalSalesCycle[i]?.product?.name;
    const value =
      dashboardData?.salesOutcome?.totalSalesCycle &&
      dashboardData?.salesOutcome?.totalSalesCycle[i]?.productCycle;
    SalesCycle.push([name, value]);
  }

  return (
    <>
      <div id="reportPage1" className={`${classes.page} ${classes.coverPage}`}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography
              className={`${globalClasses.roboto500px48px32px} ${classes.mainTitle}`}
            >
              {_t_('Sales Insights Report')}
            </Typography>
          </Grid>
          <Grid item style={{ flex: 15 }}>
            <Typography
              className={`${globalClasses.roboto400px18px32px} ${classes.date}`}
              style={{ marginTop: '2%' }}
            >
              {format(
                utcToZonedTime(new Date('2021-04-01'), 'UTC'),
                'MMM dd, yyyy',
              )}
              {/* {format(new Date('2021-04-01'), 'MMM dd, yyyy')} */}
            </Typography>
          </Grid>
          <Grid item style={{ flex: 65 }}>
            <Typography
              className={`${globalClasses.roboto700px20px32px} ${classes.date}`}
            >
              {_t_('Report Period')}:{' '}
              {activeQuarter == 4
                ? 'H1'
                : activeQuarter == 5
                ? 'H2'
                : 'Q' + (activeQuarter + 1).toString()}
            </Typography>
            <Typography
              className={`${globalClasses.roboto400px18px22px} ${classes.date}`}
            >
              {_t_('Start')}:&nbsp;
              {format(
                utcToZonedTime(
                  new Date(datesTemp[activeQuarter + 1].startDate),
                  'UTC',
                ),
                'MMM dd, yyyy',
              )}
            </Typography>
            <Typography
              className={`${globalClasses.roboto400px18px22px} ${classes.date}`}
            >
              {_t_('End')}&nbsp;&nbsp;:&nbsp;
              {format(
                utcToZonedTime(
                  new Date(datesTemp[activeQuarter + 1].endDate),
                  'UTC',
                ),
                'MMM dd, yyyy',
              )}
            </Typography>
          </Grid>
          <Grid item style={{ flex: 20 }}>
            <Typography
              className={`${globalClasses.roboto400px14px21px} ${classes.date}`}
            >
              {_t_('Prepared for')}:
            </Typography>
            <Typography
              className={`${globalClasses.roboto400px14px21px} ${classes.date}`}
            >
              {managerName}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div id="reportPage2" className={`${classes.page}`}>
        <Grid container direction="column" spacing={3} style={{ flex: 20 }}>
          <Grid item>
            <Typography
              className={`${globalClasses.roboto500px20px32px} ${classes.mainTitle}`}
            >
              {_t_('Summary')}
            </Typography>
          </Grid>
          <Grid item>
            <div style={{ width: 650, height: 192 }}>
              <Typography
                className={`${globalClasses.roboto400px12px16px} ${classes.mainTitle}`}
                style={{ padding: '0 0 0 8' }}
              >
                <p>
                  &bull;
                  {_t_(
                    'Total FY2020 sales is $451M. Strata is a mature product, contributing 50% of revenues and growing 10% y/y. Prisma and Cortex are Next Gen products contributing 30% and 20% respectively with higher gro6twth rates (~90% y/y).',
                  )}
                </p>
                <p>
                  &bull;{' '}
                  {_t_(
                    'The GTM capability and sales team are ramping up, adding early in career talent, currently the team is at 549 FTEs (20% y/y growth), 396 AE and 108 SDRs.',
                  )}
                </p>
                <p>
                  &bull;{' '}
                  {_t_(
                    'The Key people drivers influencing sales outcomes include rep competencies and product knowledge. The sales activities impacting sales outcomes include followup ratio.',
                  )}
                </p>
                <p>
                  &bull;{' '}
                  {_t_(
                    'There is an opportunity to grow sales productivity, accelerating rep deal sizes and win rates by 3-5 %, with the potential to grow topline by $12-18M.',
                  )}
                </p>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Footer activeQuarter={activeQuarter + 1} useAltLogo={true} />
      </div>
      <div id="reportPage3" className={`${classes.page}`}>
        <Typography
          className={`${globalClasses.roboto500px20px32px} ${classes.mainTitle}`}
          style={{ flex: 5 }}
        >
          {_t_('Sales Outcomes (YTD)')}
        </Typography>
        <Grid
          container
          direction="row"
          spacing={2}
          style={{ marginTop: '5%', flex: 20 }}
        >
          <Grid item xs={5}>
            <div style={{ height: 173 }}>
              <ClosedSales
                closed={
                  dashboardDataAnnual?.salesOutcome?.totalSalesClosed
                    ?.overallTotalSalesClosed
                }
                existingClosed={
                  dashboardDataAnnual?.salesOutcome?.totalSalesClosed
                    ?.existingTotalSalesClosed
                }
                forecast={dashboardDataAnnual?.salesOutcome?.totalSalesForecast}
                reportInd={'report2'}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ height: 174 }}>
              <CircularProgressWidget
                title={_t_('Quota Attainment')}
                percentage={dashboardDataAnnual?.salesOutcome?.quotaAttainment}
                variant={'small1'}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            {' '}
            <div style={{ height: 174 }}>
              <AvgDealSize
                avgDealSize={avgDealSize}
                dealsClosed={dashboardDataAnnual?.salesOutcome?.noOfDeals}
                repInd={true}
              />
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          style={{ marginTop: '5%', flex: 15 }}
        >
          <Grid item xs={5}>
            <ProductPenetrationWidget
              penetrationData={
                dashboardDataAnnual?.salesOutcome?.productPenetration
              }
              activeQuarter={activeQuarter}
              totalDeals={dashboardDataAnnual?.salesOutcome?.noOfDeals}
              reportInd={true}
            />
          </Grid>
          <Grid item xs={3}>
            <CircularProgressWidget
              title={_t_('Win Rate')}
              percentage={dashboardDataAnnual?.salesOutcome?.winRate}
              variant={'rep'}
            />
          </Grid>
          <Grid item xs={4}>
            <CircularProgressWidget
              title={_t_('Portfolio Presented')}
              percentage={dashboardDataAnnual?.salesOutcome?.portfolioPresented}
              variant={'rep'}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          style={{ marginTop: '5%', flex: 40 }}
        >
          <Grid item xs={6}>
            {' '}
            <ProductPortfolio
              salesClosed={
                dashboardDataAnnual?.salesOutcome?.totalSalesClosed
                  ?.overallTotalSalesClosed
              }
              data={dashboardDataAnnual?.salesOutcome?.topProductContributors}
              previousYearData={
                data9?.getDashboardData?.salesOutcome?.topProductContributors
              }
              previousYearSalesClosed={
                data9?.getDashboardData?.salesOutcome?.totalSalesClosed
                  ?.overallTotalSalesClosed
              }
              isInReport
            />
          </Grid>
          <Grid item xs={6}>
            {' '}
            {
              <ProductPenetrationGraph
                data={SalesCycle}
                activeQuarter={activeQuarter}
                reportInd={false}
                chartTitle={'Sales cycle'}
                xAxisTitile={'DAYS'}
              />
            }
          </Grid>
        </Grid>
        <Footer activeQuarter={0} useAltLogo={true} />
      </div>
      <div id="reportPage4" className={`${classes.page}`}>
        <Typography
          className={`${globalClasses.roboto500px20px32px} ${classes.mainTitle}`}
          style={{ flex: 5 }}
        >
          {activeQuarter + 1 == 5 ? (
            <>{_t_('Sales Outcomes (H1)')}</>
          ) : activeQuarter + 1 == 6 ? (
            <>{_t_('Sales Outcomes (H2)')}</>
          ) : (
            <>{_t_(`Sales Outcomes (Q${activeQuarter + 1})`)}</>
          )}
        </Typography>
        <Grid
          container
          direction="row"
          spacing={2}
          style={{ marginTop: '5%', flex: 20 }}
        >
          <Grid item xs={5}>
            <div style={{ height: 173 }}>
              <ClosedSales
                closed={
                  dashboardData?.salesOutcome?.totalSalesClosed
                    ?.overallTotalSalesClosed
                }
                existingClosed={
                  dashboardData?.salesOutcome?.totalSalesClosed
                    ?.existingTotalSalesClosed
                }
                forecast={dashboardData?.salesOutcome?.totalSalesForecast}
                reportInd={'report2'}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ height: 174 }}>
              <CircularProgressWidget
                title={_t_('Quota Attainment')}
                percentage={dashboardData?.salesOutcome?.quotaAttainment}
                variant={'small1'}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            {' '}
            <div style={{ height: 174 }}>
              <AvgDealSize
                avgDealSize={avgDealSize}
                dealsClosed={dashboardData?.salesOutcome?.noOfDeals}
                repInd={true}
              />
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          style={{ marginTop: '5%', flex: 15 }}
        >
          <Grid item xs={5}>
            <ProductPenetrationWidget
              penetrationData={dashboardData?.salesOutcome?.productPenetration}
              activeQuarter={activeQuarter}
              totalDeals={dashboardData?.salesOutcome?.noOfDeals}
              reportInd={true}
            />
          </Grid>
          <Grid item xs={3}>
            <CircularProgressWidget
              title={_t_('Win Rate')}
              percentage={dashboardData?.salesOutcome?.winRate}
              variant={'rep'}
            />
          </Grid>
          <Grid item xs={4}>
            <CircularProgressWidget
              title={_t_('Portfolio Presented')}
              percentage={dashboardData?.salesOutcome?.portfolioPresented}
              variant={'rep'}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          style={{ marginTop: '5%', flex: 40 }}
        >
          <Grid item xs={6}>
            {' '}
            <ProductPortfolio
              salesClosed={
                dashboardData?.salesOutcome?.totalSalesClosed
                  ?.overallTotalSalesClosed
              }
              data={dashboardData?.salesOutcome?.topProductContributors}
              previousYearData={
                data9?.getDashboardData?.salesOutcome?.topProductContributors
              }
              previousYearSalesClosed={
                data9?.getDashboardData?.salesOutcome?.totalSalesClosed
                  ?.overallTotalSalesClosed
              }
              isInReport
            />
          </Grid>
          <Grid item xs={6}>
            {' '}
            {
              <ProductPenetrationGraph
                data={SalesCycle}
                activeQuarter={activeQuarter}
                reportInd={false}
                chartTitle={'Sales cycle'}
                xAxisTitile={'DAYS'}
              />
            }
          </Grid>
        </Grid>
        <Footer activeQuarter={activeQuarter + 1} useAltLogo={true} />
      </div>
      <div id="reportPage5" className={`${classes.page}`}>
        <Typography
          variant="subtitle2"
          className={`${globalClasses.roboto500px20px32px} ${classes.mainTitle}`}
          style={{ flex: 5 }}
        >
          {_t_('People Drivers')}
        </Typography>
        <Grid container direction="row" spacing={5} style={{ flex: 95 }}>
          <Grid item sm={8} xs={8}>
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <div className={classes.widgets}>
                  <MyTeamTree
                    data={dashboardData?.peopleDrivers?.myTeam}
                    isInReport={true}
                  />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    width: 431,
                    height: 47,
                  }}
                  className={classes.widgets}
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className={classes.fullHeight}
                    style={{ paddingLeft: 16 }}
                  >
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className={`${globalClasses.body1WidgetTitle} ${classes.spanText}`}
                      >
                        {' '}
                        {_t_('Span/Levels')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        data-testid="spanLevelValue"
                      >
                        {dashboardData?.peopleDrivers?.spanLevel?.span}/
                        {dashboardData?.peopleDrivers?.spanLevel?.level}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    width: 431,
                    height: 144,
                  }}
                  className={classes.widgets}
                >
                  <Diversity
                    quarter={activeQuarter}
                    male={dashboardData?.peopleDrivers?.diversity?.noOfMale}
                    female={dashboardData?.peopleDrivers?.diversity?.noOfFemale}
                    target={
                      dashboardData?.peopleDrivers?.diversity?.targetCount
                    }
                    targetYear={
                      dashboardData?.peopleDrivers?.diversity?.targetYear
                    }
                    total={dashboardData?.peopleDrivers?.diversity?.total}
                    reports={true}
                  />
                </div>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={6}>
                  <Grid item>
                    <div
                      style={{
                        width: 199,
                        height: 153,
                      }}
                      className={classes.widgets}
                    >
                      {' '}
                      <AttritionRate
                        currVal={
                          dashboardData?.peopleDrivers?.attrition
                            ?.rateInCurrentQuarter
                        }
                        prevVal={
                          dashboardData?.peopleDrivers?.attrition
                            ?.rateInSameQuarterPreviousYear
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item>
                    <div
                      style={{
                        width: 199,
                        height: 153,
                      }}
                      className={classes.widgets}
                    >
                      <Grid
                        container
                        direction="column"
                        style={{ padding: '9%' }}
                      >
                        <Grid item style={{ paddingBottom: '23%' }}>
                          <Typography
                            variant="subtitle2"
                            className={classes.rightHeading}
                          >
                            {' '}
                            {_t_('REQS')}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography
                            variant="h1"
                            className={classes.rightHeading1}
                          >
                            {' '}
                            {
                              dashboardData?.peopleDrivers?.requiredCandidates
                            }{' '}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4} xs={4}>
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <div
                  style={{ width: 199, height: 593 }}
                  className={classes.widgets}
                >
                  <RatingChartWidget
                    data={dashboardData?.peopleDrivers?.competencies}
                    reports={true}
                  />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{ width: 199, height: 153 }}
                  className={classes.widgets}
                >
                  <AvgTimeToHire
                    value={dashboardData?.peopleDrivers?.avgTimeToHire}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/** ******************************* */}
          {/* <Grid item style={{ paddingTop: 142 }}></Grid> */}
          {/** ******************************* */}
        </Grid>
        <Footer activeQuarter={activeQuarter + 1} useAltLogo={true} />
      </div>
      <div id="reportPage6" className={`${classes.page}`}>
        <Typography
          variant="subtitle2"
          className={`${globalClasses.roboto500px20px32px} ${classes.mainTitle}`}
          style={{
            flex: 5,
            fontWeight: 400,
            fontFamily: 'Rubik',
          }}
        >
          {_t_('Deeper Insights')}
        </Typography>
        {
          <Grid
            container
            direction="column"
            spacing={5}
            style={{
              // paddingTop: '5%',
              // paddingLeft: '5%',
              padding: '2%',
              flex: 95,
              background: data2?.deeperInsight?.demoMode?.isDemoMode
                ? '#D9D9D9'
                : '',
              opacity: data2?.deeperInsight?.demoMode?.isDemoMode ? 0.6 : 0,
            }}
          >
            {myMap.map((element, index) => (
              <Grid item key={index}>
                <Grid container xs={12} direction="row" spacing={0}>
                  {element.array.map((arr, index1) => (
                    <Grid item xs={6} key={index1}>
                      <div
                        style={{
                          width: 285,
                          height: 256,
                          paddingLeft: '1%',
                          paddingRight: '1%',
                        }}
                        className={classes.widgets}
                      >
                        <LineGraph
                          title1={arr?.title1 ? arr.title1 : ''}
                          title2={arr?.title2 ? arr.title2 : ''}
                          series={Object.assign([], arr?.series)}
                          lineSeries={Object.assign([], arr?.lineSeries)}
                          report={true}
                          xaxisRange={
                            xaxisRange[
                              index1 % 2 == 0 ? 2 * index : 2 * index + 1
                            ]
                          }
                          yaxisRange={
                            yaxisRange[
                              index1 % 2 == 0 ? 2 * index : 2 * index + 1
                            ]
                          }
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        }
        <Footer activeQuarter={activeQuarter + 1} useAltLogo={true} />
      </div>
      <div id="reportPage7" className={`${classes.page}`}>
        {/* <div className={classes.subpage}> */}
        <Grid container direction="column" justify="space-between">
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-around"
              className={classes.page6HeadingComponent}
              // style={{ width: '93%' }}
            >
              <Grid item xs={4}>
                <Typography
                  variant="subtitle2"
                  className={classes.page6Heading}
                  color="textSecondary"
                  align="left"
                >
                  {_t_('Sales Outcomes')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <Avatar src="" className={classes.page6Avatar} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      className={classes.page6AvatarName}
                    >
                      {highPotentialUser.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="row" justify="space-between">
                  <Grid item xs={6}>
                    <Avatar src="" className={classes.page6Avatar} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      // align="left"
                      className={classes.page6AvatarName}
                    >
                      {highPerformerUser.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <ReportSalesOutcomeWidget
            data1={highPotentialUserData?.getDashboardData?.salesOutcome}
            data2={highPerformerUserData?.getDashboardData?.salesOutcome}
            reportData={data3?.report}
            reportData1={data4?.report}
          />
          <Grid item>
            <Typography
              variant="subtitle2"
              className={classes.salesActivitiesHeading}
              color="textSecondary"
              align="left"
            >
              {_t_('Drivers for Quota Attainment')}
            </Typography>
          </Grid>
          <ReportSalesActivitiesWidget
            data1={peopleActivitiesDataFirstPerson?.peopleActivities}
            data2={peopleActivitiesDataSecondPerson?.peopleActivities}
          />
          <Grid item>
            <Typography
              variant="subtitle2"
              className={classes.salesActivitiesHeading}
              color="textSecondary"
              align="left"
            >
              {_t_('Competencies')}
            </Typography>
          </Grid>
          <ReportCompetenciesWidget
            data1={
              highPotentialUserData?.getDashboardData?.peopleDrivers
                ?.competencies
            }
            data2={
              highPerformerUserData?.getDashboardData?.peopleDrivers
                ?.competencies
            }
          />
        </Grid>
        <Footer activeQuarter={activeQuarter + 1} useAltLogo={true} />
      </div>
    </>
  );
};

export default Reports;
