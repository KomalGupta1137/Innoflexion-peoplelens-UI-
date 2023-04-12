import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { QueryResult, useQuery } from '@apollo/client';

import { _t_ } from '../../../utils/translation/translation';
import React, { useEffect, useState } from 'react';
import { COLORS, plTheme } from '../../../plTheme';
import WidgetCard from '../../atoms/WidgetCard';
import Progressbar from '../../molecules/Progressbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SpiderChart from '../../molecules/SpiderChart';
import { peopleactivityQuery as PeopleActivitiesData } from '../../../gql/types';
import { GetPeopleActivitiesData } from '../../../gql/queries/dashboard';
import { dates } from '../ManagerDashboard';
import Loader from '../../atoms/Loader';
import { getDashboardData_getDashboardData_peopleDrivers_myTeam_personaCount as PersonaData } from '../../../gql/types';
import { getPersonaFullForm } from '../../molecules/MyTeamTree';
interface PeopleActivitiesProps {
  teamData?: (PersonaData | null)[] | null;
  activeQuarter: number;
}

const useStyles = makeStyles({
  mainHeading: {
    fontFamily: plTheme.typography.fontFamily,
    fontSize: plTheme.typography.h3.fontSize,
    fontWeight: plTheme.typography.h5.fontWeight,
    lineHeight: plTheme.typography.h2.lineHeight,
    fontStyle: plTheme.typography.h3.fontStyle,
    marginTop: 24,
    marginBottom: 22,
    letterSpacing: 0,
  },
  item: {
    borderRadius: 4,
    border: '1px solid ' + COLORS.BORDER_PRIMARY,
    boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
  },
  outcomesHead: {
    paddingTop: 25,
  },
  rightHeading: {
    marginBottom: 22,
  },
  formControl: {
    marginLeft: 22,
    width: '216px',
    marginBottom: -10,
  },
  rightSubHeading: {
    fontFamily: plTheme.typography.fontFamily,
    fontSize: plTheme.typography.subtitle1.fontSize,
    fontWeight: plTheme.typography.h2.fontWeight,
    lineHeight: plTheme.typography.subtitle1.lineHeight,
    fontStyle: plTheme.typography.h3.fontStyle,
    backgroundColor: COLORS.GENERAL_WHITE,
  },
  dropDown: {
    height: 40,
  },
  graphElement: {
    height: 735,
  },
  leftHeading: {
    marginTop: 20,
    marginLeft: 51.2,
  },
  icon: {
    color: COLORS.TEXT_HIGH_EMPHASIS,
  },
  spiderChartElement: {
    marginTop: 70,
    marginBottom: 70,
  },
  selectRoot: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
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
});

const chartDataCategories = [
  'Total Activity',
  'Customer Activity',
  'Pipeline Discipline',
  'Followup Ratio',
  'Account Activity',
];

const PeopleActivities: React.FC<PeopleActivitiesProps> = ({
  teamData,
  activeQuarter,
}: PeopleActivitiesProps) => {
  const classes = useStyles();
  const [persona, setPersona] = useState('AE');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersona(event.target.value as string);
  };

  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<PeopleActivitiesData> = useQuery(GetPeopleActivitiesData, {
    variables: {
      dashboardInput: {
        startDate: '',
        endDate: '',
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
    <>
      {loading && <Loader />}

      <Typography variant="h2" className={classes.outcomesHead}>
        {_t_('People Activities')}
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item>
          <Typography className={classes.mainHeading}>
            {_t_('Know how your team is performing against these activities')}
          </Typography>
        </Grid>
        <Grid item style={{ marginBottom: 10 }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
            className={classes.rightHeading}
          >
            <Grid item>
              <Typography variant="h6"> {_t_('TEAM')} </Typography>
            </Grid>
            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                classes={{
                  root: classes.quantityRoot,
                }}
              >
                <Select
                  IconComponent={ExpandMoreIcon}
                  className={`${classes.dropDown} ${classes.rightSubHeading}`}
                  displayEmpty
                  value={persona}
                  onChange={handleChange}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                      root: classes.selectRoot,
                    },
                  }}
                >
                  {teamData &&
                    teamData?.map(
                      (personas: PersonaData | null, index: number) => (
                        <MenuItem
                          key={index}
                          className={classes.rightSubHeading}
                          value={personas?.persona ? personas?.persona : ''}
                        >
                          {personas?.persona
                            ? getPersonaFullForm(personas?.persona)
                            : ''}
                        </MenuItem>
                      ),
                    )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item xs={12}>
          <WidgetCard>
            <Grid
              container
              direction="row"
              justify="space-between"
              className={classes.graphElement}
            >
              <Grid item>
                <Grid container direction="column" justify="space-between">
                  {progressBarData.map((item, index: number) => (
                    <Grid item key={index} className={classes.leftHeading}>
                      <Progressbar
                        name={item.name}
                        value1={item.value}
                        value2={item.value > 100 ? item.value / 2 : item.value}
                        benchmarkValue={
                          item.benchmarkValue ? item.benchmarkValue : 0
                        }
                        percentage={item.percentage}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item className={classes.spiderChartElement}>
                <SpiderChart
                  chartData={chartData}
                  chartDataCategories={chartDataCategories}
                />
              </Grid>
            </Grid>
          </WidgetCard>
        </Grid>
      </Grid>
    </>
  );
};

export default PeopleActivities;
