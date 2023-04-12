import { QueryResult, useQuery } from '@apollo/client';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import Loader from '../../atoms/Loader';
import WidgetCard from '../../atoms/WidgetCard';

import { dates } from '../ManagerDashboard';

import { GetPeopleActivitiesData } from '../../../gql/queries/dashboard';

import { peopleactivityQuery as PeopleActivitiesData } from '../../../gql/types';

import Progressbar from '../../molecules/Progressbar';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
interface RepSalesActivitiesContainerProps {
  activeQuarter: number;
}

const RepSalesActivitiesContainer: React.FC<RepSalesActivitiesContainerProps> = ({
  activeQuarter,
}: RepSalesActivitiesContainerProps) => {
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    mainDiv: {
      marginTop: '2rem',
    },
    item: {
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
    },
    leftHeading: {
      marginTop: 20,
      marginBottom: 18,
      marginLeft: width < 1500 ? 20 : 100,
    },
    leftHeading1: {
      marginBottom: 18,
      marginLeft: width < 1500 ? 20 : 100,
    },
  });

  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<PeopleActivitiesData> = useQuery(GetPeopleActivitiesData, {
    variables: {
      dashboardInput: {
        startDate: dates?.[activeQuarter].startDate,
        endDate: dates?.[activeQuarter].endDate,
      },
      userId: '',
    },
  });

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error) return <>`Error! ${error.message}` </>;

  const progressBarData = [
    {
      name: 'Total Activity',
      value: Math.round(
        Number(data?.peopleActivities?.objectiveScore?.curQuarterVal),
      ),
      percentage: Math.round(
        Number(data?.peopleActivities?.objectiveScore?.curQuarterVal) -
          Number(data?.peopleActivities?.objectiveScore?.prevQuarterVal),
      ),
      benchmarkValue: data?.peopleActivities?.objectiveScore?.benchMark,
    },
    {
      name: 'Customer Activity',
      value: Math.round(
        Number(data?.peopleActivities?.timeAllocationScore?.curQuarterVal),
      ),
      percentage: Math.round(
        Number(data?.peopleActivities?.timeAllocationScore?.curQuarterVal) -
          Number(data?.peopleActivities?.timeAllocationScore?.prevQuarterVal),
      ),
      benchmarkValue: data?.peopleActivities?.timeAllocationScore?.benchMark,
    },
    {
      name: 'Pipeline Discipline',
      value: Math.round(
        Number(data?.peopleActivities?.pipelineDisciplineScore?.curQuarterVal),
      ),
      percentage: Math.round(
        Number(data?.peopleActivities?.pipelineDisciplineScore?.curQuarterVal) -
          Number(
            data?.peopleActivities?.pipelineDisciplineScore?.prevQuarterVal,
          ),
      ),
      benchmarkValue:
        data?.peopleActivities?.pipelineDisciplineScore?.benchMark,
    },
    {
      name: 'Followup Ratio',
      value: Math.round(
        Number(data?.peopleActivities?.followThrough?.curQuarterVal),
      ),
      percentage: Math.round(
        Number(data?.peopleActivities?.followThrough?.curQuarterVal) -
          Number(data?.peopleActivities?.followThrough?.prevQuarterVal),
      ),
      benchmarkValue: data?.peopleActivities?.followThrough?.benchMark,
    },
    {
      name: 'UntouchedOpps',
      value: Math.round(
        Number(data?.peopleActivities?.accountCoverage?.curQuarterVal),
      ),
      percentage: Math.round(
        Number(data?.peopleActivities?.accountCoverage?.curQuarterVal) -
          Number(data?.peopleActivities?.accountCoverage?.prevQuarterVal),
      ),
      benchmarkValue: data?.peopleActivities?.accountCoverage?.benchMark,
    },
  ];
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={3} className={classes.mainDiv}>
      <Grid item container direction="column" style={{ flex: 40 }} spacing={0}>
        <WidgetCard>
          <Grid item>
            {/* <div className={classes.item} style={{ height: 733 }}></div> */}
            {progressBarData.map((item, index: number) => (
              <Grid
                item
                key={index}
                className={
                  index === 0 ? classes.leftHeading : classes.leftHeading1
                }
              >
                <Progressbar
                  name={item.name}
                  value1={item.value}
                  value2={item.value > 100 ? item.value / 2 : item.value}
                  benchmarkValue={item.benchmarkValue ? item.benchmarkValue : 0}
                  percentage={item.percentage}
                />
              </Grid>
            ))}
          </Grid>
        </WidgetCard>
      </Grid>
      <Grid item container direction="column" style={{ flex: 60 }} spacing={3}>
        <Grid item>
          <div className={classes.item} style={{ height: 304 }}></div>
        </Grid>
        <Grid item>
          <div className={classes.item} style={{ height: 409 }}></div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RepSalesActivitiesContainer;
