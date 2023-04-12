/* eslint-disable prettier/prettier */
import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { _t_ } from '../../../utils/translation/translation';
import CustomizedTabs from '../../molecules/CustomisedTabs';
import OkrPerformancesWidget from '../OkrPerformanceWidget/Index';
import PipeLine from '../Pipeline/index';
import RepCompetencies from '../RepCompetenciesLearning/Index';
import RepCustomerMeeting from '../RepCustomerMeeting';
import RepEarningsWidget from '../RepEarningsWidget';
import RepMYMeeting from '../RepMyMeeting/index';
import RepSalesActivities from '../RepSalesActivities';
import RepSalesActivitiesAll from '../RepSalesActivitiesAll';
import RepSalesOutcomeWidget from '../RepSalesOutcomeWidget';
import RewardsWidget from '../RewardsWidget/index';
import ComingSoon from '../../../assets/Coming_Soon.png';

export interface RepMyselfDashboardProps {
  activeQuarter: number;
  currentWeek: number;
  persona?: string;
}

const RepMyselfDashboard: React.FC<RepMyselfDashboardProps> = ({
  activeQuarter,
  currentWeek,
  persona,
}: RepMyselfDashboardProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = ['ALL', 'ORGANIZATION', 'PEOPLE', 'CUSTOMER'];
  const handleTabChange = (num: number) => {
    setActiveTab(num);
  };
  return (
    <>
      <CustomizedTabs
        tabNames={tabNames}
        primary={true}
        activeTab={activeTab}
        tabName={tabNames[activeTab]}
        handleTabChange={handleTabChange}
      />
      {activeTab == 1 && (
        <div style={{ textAlign: 'center' }}>
          <img src={ComingSoon} />
        </div>
      )}
      {/* ALL */}
      {activeTab === 0 && (
        <>
          <Grid
            container
            direction="row"
            spacing={9}
            justify="space-between"
            style={{ marginTop: '.7em' }}
          >
            <Grid item style={{ flex: 65 }}>
              <RepSalesOutcomeWidget activeQuarter={activeQuarter} />
            </Grid>
            <Grid item style={{ flex: 23 }}>
              <RepEarningsWidget activeQuarter={activeQuarter} />
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid item style={{ width: '100%' }}>
              <RepMYMeeting
                currentWeek={currentWeek}
                activeQuarter={activeQuarter}
                page={'All'}
              />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <PipeLine
                currentWeek={currentWeek}
                activeQuarter={activeQuarter}
              />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              {persona == 'AE' ? (
                <RepSalesActivitiesAll
                  currentWeek={currentWeek}
                  activeQuarter={activeQuarter}
                />
              ) : (
                <RepSalesActivities
                  currentWeek={currentWeek}
                  activeQuarter={activeQuarter}
                />
              )}
            </Grid>
            {persona == 'SE' ? (
              <Grid item style={{ width: '100%', marginTop: 60 }}>
                <RewardsWidget />
              </Grid>
            ) : (
              <></>
            )}
            <Grid item style={{ width: '100%' }}>
              <RepCompetencies activeQuarter={activeQuarter} />
            </Grid>
            {persona == 'SE' ? (
              <Grid item style={{ width: '100%' }}>
                <OkrPerformancesWidget />
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </>
      )}
      {/* PEOPLE */}
      {activeTab === 2 && (
        <>
          <Grid container direction="column">
            <Grid item style={{ width: '100%' }}>
              <RepMYMeeting
                currentWeek={currentWeek}
                activeQuarter={activeQuarter}
                page={'People'}
              />
            </Grid>
            <Grid
              container
              direction="row"
              spacing={9}
              justify="space-between"
              style={{ marginTop: '.7em', width: '100%', margin: 0 }}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
              >
                <Typography
                  variant="h2"
                  color="textPrimary"
                  style={{ marginTop: 40, marginBottom: 15, paddingLeft: 18 }}
                >
                  {_t_('People Drivers')}
                </Typography>
              </Grid>
              <Grid item style={{ width: 595 }}>
                <RepEarningsWidget activeQuarter={activeQuarter} />
              </Grid>
              <Grid item style={{ flex: 70, paddingLeft: 0, paddingRight: 0 }}>
                <RewardsWidget />
              </Grid>
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <RepCompetencies activeQuarter={activeQuarter} />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <OkrPerformancesWidget />
            </Grid>
          </Grid>
        </>
      )}

      {/* CUSTOMER */}
      {activeTab === 3 && (
        <>
          <Grid container direction="column">
            <Grid item style={{ width: '100%' }}>
              <RepCustomerMeeting currentWeek={currentWeek} />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <PipeLine
                currentWeek={currentWeek}
                activeQuarter={activeQuarter}
              />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <RepSalesActivities
                currentWeek={currentWeek}
                activeQuarter={activeQuarter}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default RepMyselfDashboard;
