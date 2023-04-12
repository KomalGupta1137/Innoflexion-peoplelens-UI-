import React, { useEffect, useState } from 'react';
import { getDashboardData_getDashboardData as DashboardData } from '../../../gql/types';
import CustomizedTabs from '../../molecules/CustomisedTabs';
import PeopleDrivers from '../PeopleDrivers';
import { _t_ } from '../../../utils/translation/translation';
import SalesOutcomes from '../SalesOutcomes';
import PeopleActivitiesWidget from '../PeopleActivitiesWidget';
// import ActivityScores from '../ActivityScore/index';
import LearningWidget from '../LearningWidget';
import KeyDriversWidget from '../KeyDriversWidget';
import { QueryResult, useQuery } from '@apollo/client';
import { getDashboardData as DashboardResponse } from '../../../gql/types';
import { deeperInsight as DeeperInsightResponse1 } from '../../../gql/types';
import {
  GetDashboardData,
  ProductPortfolio,
} from '../../../gql/queries/dashboard';
import { GetDeeperInsights } from '../../../gql/queries/deeperInsights';
import { dates } from '../ManagerDashboard';
import Loader from '../../atoms/Loader';
import ManagerInsights from '../ManagerInsights/index';
import { subtractDate } from '../../../utils/subtractDate/index';
import { ProductColorContext } from '../../../utils/productColorContext';
import ComingSoon from '../../../assets/Coming_Soon.png';
export interface MyTeamDashboardProps {
  activeQuarter: number;
}

const MyTeamDashboard: React.FC<MyTeamDashboardProps> = ({
  activeQuarter,
}: MyTeamDashboardProps) => {
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
        startDate: dates?.[activeQuarter].startDate,
        endDate: dates?.[activeQuarter].endDate,
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
        startDate: dates?.[activeQuarter].startDate,
        endDate: dates?.[activeQuarter].endDate,
      },
    },
  });

  const {
    loading: loading3,
    error: error3,
    data: data3,
    refetch: refetch3,
  }: QueryResult<DashboardResponse> = useQuery(GetDashboardData, {
    variables: {
      dashboardInput: {
        startDate: subtractDate(dates?.[activeQuarter].startDate),
        endDate: subtractDate(dates?.[activeQuarter].endDate),
        userId: '',
      },
    },
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (num: number) => {
    setActiveTab(num);
  };

  useEffect(() => {
    void refetch();
    void refetch2();
    void refetch3();
  }, [activeQuarter, refetch, refetch2, refetch3]);

  useEffect(() => {
    setProductColorMap(data?.getDashboardData?.productColorMap);
  }, [data]);

  if (loading2) {
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
  const dashboardData = data?.getDashboardData;
  const dashboardData1 = data3?.getDashboardData;
  const tabNames = [
    'ALL',
    'ORGANIZATION',
    'PEOPLE',
    'CUSTOMER',
    'MANAGER INSIGHTS',
  ];
  return (
    <>
      <CustomizedTabs
        tabNames={tabNames}
        primary={true}
        activeTab={activeTab}
        tabName={tabNames[activeTab]}
        handleTabChange={handleTabChange}
      />
      {(activeTab == 1 || activeTab == 2 || activeTab == 3) && (
        <div style={{ textAlign: 'center' }}>
          <img src={ComingSoon} />
        </div>
      )}
      {activeTab === 4 && <ManagerInsights data={data2?.deeperInsight} />}
      {activeTab === 0 && (
        <>
          <SalesOutcomes
            dashboardData={dashboardData}
            activeQuarter={activeQuarter}
            previousYearDashboardData={dashboardData1}
          />

          <PeopleDrivers
            data={dashboardData?.peopleDrivers}
            activeQuarter={activeQuarter}
          />
          <LearningWidget activeQuarter={activeQuarter} />
          {/* <ActivityScores activeQuarter={activeQuarter} /> */}

          <PeopleActivitiesWidget
            teamData={dashboardData?.peopleDrivers?.myTeam?.personaCount}
            activeQuarter={activeQuarter}
          />
          <KeyDriversWidget activeQuarter={activeQuarter} />
        </>
      )}
    </>
  );
};

export default MyTeamDashboard;
