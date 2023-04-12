/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { _t_ } from '../../../utils/translation/translation';

import CalendarIcon from '../../../assets/calendar.png';
import { COLORS, plTheme } from '../../../plTheme';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import TimeAllocation from '../../molecules/TimeAllocation';
import RepDealFunnel from '../RepDealFunnel';
import RepActivityBenchmarks from '../RepActivityBenchmarks';
import { QueryResult, useQuery } from '@apollo/client';
import { GetPeopleActivitiesData } from '../../../gql/queries/dashboard';
import { dates } from '../ManagerDashboard';
import Loader from '../../atoms/Loader';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addDays, addMinutes, addWeeks, subYears } from 'date-fns';
import { peopleactivityQuery } from '../../../gql/types';
import moment from 'moment';

interface RepSalesActivitiesProps {
  currentWeek: number;
  activeQuarter: number;
}

const RepSalesActivities: React.FC<RepSalesActivitiesProps> = ({
  currentWeek,
  activeQuarter,
}: RepSalesActivitiesProps) => {
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    subtitle: {
      fontWeight: 300,
      marginTop: 13,
    },
    calendarIcon: {
      width: 22,
      height: 24,
    },
    heading: {
      marginTop: 60,
    },
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
    formControl: {
      marginLeft: 22,
      width: '216px',
      marginBottom: -10,
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
    icon: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    selectRoot: {
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
  });

  const classes = useStyles();

  const [userId, setUserId] = useState('');
  const [firstDateOfQuarter, setFirstDateOfQuarter] = React.useState<Date>(
    new Date(),
  );
  const [selectedOption, setSelectedOption] = React.useState<number>(
    currentWeek === 1 ? 1 : currentWeek - 1,
  );

  useEffect(() => {
    const start = moment().startOf('quarter');
    const date = new Date(start.valueOf());
    date.setFullYear(2020); //To be removed later!
    setFirstDateOfQuarter(new Date(date.valueOf()));
  }, [activeQuarter]);

  useEffect(() => {
    getStartDateOfQuery();
    getEndDateOfQuery();
  }, [firstDateOfQuarter, selectedOption]);

  useEffect(() => {
    getStartDateOfQuery();
    getEndDateOfQuery();
  }, [currentWeek]);

  const getStartDateOfQuery = () => {
    const outputDate = firstDateOfQuarter;
    const newDate = addWeeks(outputDate, selectedOption - 1);
    const nextDay = addDays(newDate, 1);
    return nextDay.toISOString();
  };

  const getEndDateOfQuery = () => {
    const outputDate: Date = firstDateOfQuarter;
    let newDate = addWeeks(outputDate, selectedOption - 1);
    newDate = addDays(newDate, 8);
    newDate = addMinutes(newDate, -1);
    return newDate.toISOString();
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as number);
  };

  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<peopleactivityQuery> = useQuery(GetPeopleActivitiesData, {
    variables: {
      dashboardInput: {
        startDate: getStartDateOfQuery(),
        endDate: getEndDateOfQuery(),
      },
      userId: userId,
      persona: 'AE',
    },
  });

  useEffect(() => {
    void refetch();
  }, [refetch, selectedOption]);

  if (error) return <>`Error! ${error.message}` </>;

  const timeAllocationData = data?.peopleActivities?.repTimeAllocation;

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
      name: 'Untouched Opps',
      value: Math.round(Number(data?.peopleActivities?.untouchedOpps?.curVal)),
      percentage: Math.round(
        Number(data?.peopleActivities?.untouchedOpps?.curVal) -
          Number(data?.peopleActivities?.untouchedOpps?.prevVal),
      ),
      benchmarkValue: data?.peopleActivities?.untouchedOpps?.benchMark,
    },
  ];

  const {
    loading: funnelLoading,
    data: funnelData,
    error: funnelError,
    refetch: funnelRefetch,
  }: QueryResult<peopleactivityQuery> = useQuery(GetPeopleActivitiesData, {
    variables: {
      dashboardInput: {
        startDate: getStartDateOfQuery(),
        endDate: getEndDateOfQuery(),
        quarter: activeQuarter,
        week: selectedOption,
      },
      userId: userId,
    },
  });

  useEffect(() => {
    void funnelRefetch();
  }, [funnelRefetch]);

  useEffect(() => {
    setSelectedOption(currentWeek);
  }, [currentWeek]);

  if (loading) {
    return (
      <>
        <Grid style={{ width: '90%', height: 750 }}>
          <Loader />
        </Grid>
      </>
    );
  }

  if (funnelLoading) {
    return (
      <>
        <Grid style={{ width: '90%', height: 750 }}>
          <Loader />
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item className={classes.heading}>
          <Typography variant="h2" color="textPrimary">
            {_t_('Sales Activities')}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.subtitle}
          >
            {_t_(
              'Weekly self performance against activity goals, these can be shared with managers.',
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <img src={CalendarIcon} className={classes.calendarIcon} />
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
                  // defaultValue={totalWeeks}
                  value={selectedOption}
                  onChange={handleChange}
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
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                      root: classes.selectRoot,
                    },
                  }}
                >
                  {[...Array(13)].map((e, index) => (
                    <MenuItem
                      key={index}
                      className={classes.rightSubHeading}
                      value={index + 1}
                    >
                      WEEKLY ({index + 1}/13)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={3} className={classes.mainDiv}>
        <Grid
          item
          container
          direction="column"
          style={{ flex: 50 }}
          spacing={0}
        >
          <Grid item>
            <RepActivityBenchmarks benchmarks={progressBarData} />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          style={{ flex: 50 }}
          spacing={3}
        >
          <Grid item>
            <TimeAllocation
              // data={timeAllocationData}
              startDate={getStartDateOfQuery()}
              endDate={getEndDateOfQuery()}
              height={341}
              week={selectedOption}
            />
          </Grid>
          <Grid item>
            <RepDealFunnel
              activeNegotiations={
                funnelData?.peopleActivities?.dealFunnel?.activeNegotiations
              }
              opps={funnelData?.peopleActivities?.dealFunnel?.opps}
              meetings={funnelData?.peopleActivities?.dealFunnel?.meetings}
              proposals={funnelData?.peopleActivities?.dealFunnel?.proposals}
              deals={funnelData?.peopleActivities?.dealFunnel?.deals}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RepSalesActivities;
