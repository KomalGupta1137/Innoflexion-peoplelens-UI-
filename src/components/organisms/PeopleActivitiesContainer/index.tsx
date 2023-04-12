import { QueryResult, useQuery } from '@apollo/client';
import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import Loader from '../../atoms/Loader';
import Progressbar from '../../molecules/Progressbar';
import SpiderChart from '../../molecules/SpiderChart';
import { peopleactivityQuery as PeopleActivitiesData } from '../../../gql/types';
import { GetPeopleActivitiesData } from '../../../gql/queries/dashboard';
import { dates } from '../ManagerDashboard';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
interface PeopleActivitiesContainerProps {
  persona: string;
  activeQuarter: number;
}

const PeopleActivitiesContainer: React.FC<PeopleActivitiesContainerProps> = ({
  persona,
  activeQuarter,
}: PeopleActivitiesContainerProps) => {
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    graphElement: {
      height: 735,
      width: 'max-content',
    },
    leftHeading: {
      marginTop: '1.2rem',
      marginLeft: 51.2,
    },
    spiderChartElement: {
      marginTop: 70,
      marginBottom: 70,
      marginLeft: width > 1400 ? '5.8rem' : '2.4rem',
    },
  });
  const classes = useStyles();

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
        userId: '',
      },
      persona: persona,
    },
  });

  useEffect(() => {
    void refetch();
  }, [persona, refetch]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (error) return <>`Error! ${error.message}` </>;

  const chartDataCategories = [
    'Total Activity',
    'Customer Activity',
    'Account Activity',
    'Pipeline Discipline',
    'Followup Ratio',
  ];

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
      name: 'Account Activity',
      value: Math.round(
        Number(data?.peopleActivities?.accountCoverage?.curQuarterVal),
      ),
      percentage: Math.round(
        Number(data?.peopleActivities?.accountCoverage?.curQuarterVal) -
          Number(data?.peopleActivities?.accountCoverage?.prevQuarterVal),
      ),
      benchmarkValue: data?.peopleActivities?.accountCoverage?.benchMark,
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
  ];

  const chartData = [
    Math.round(Number(data?.peopleActivities?.objectiveScore?.curQuarterVal)),
    Math.round(
      Number(data?.peopleActivities?.timeAllocationScore?.curQuarterVal),
    ),
    Math.round(
      Number(data?.peopleActivities?.pipelineDisciplineScore?.curQuarterVal),
    ),
    Math.round(Number(data?.peopleActivities?.followThrough?.curQuarterVal)),
    Math.round(Number(data?.peopleActivities?.accountCoverage?.curQuarterVal)),
  ];

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-end"
      justify="space-between"
    >
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          className={classes.graphElement}
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justify="space-between"
              style={{ marginTop: 2 }}
            >
              {progressBarData.map((item, index: number) => (
                <Grid item key={index} className={classes.leftHeading}>
                  <Progressbar
                    name={item.name}
                    value1={item.value}
                    value2={
                      item.value > 100
                        ? item.value / 2 > 100
                          ? 100
                          : item.value / 2
                        : item.value
                    }
                    benchmarkValue={
                      item.benchmarkValue ? item.benchmarkValue : 0
                    }
                    percentage={item.percentage}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item className={classes.spiderChartElement} justify="center">
            <SpiderChart
              chartData={chartData}
              chartDataCategories={chartDataCategories}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PeopleActivitiesContainer;
