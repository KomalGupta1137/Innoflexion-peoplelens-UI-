/* eslint-disable prettier/prettier */
import {
  MenuItem,
  FormControl,
  Grid,
  makeStyles,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { _t_ } from '../../../utils/translation/translation';
import CalendarIcon from '../../../assets/calendar.png';
import { COLORS, plTheme } from '../../../plTheme';
import { properties } from '../../../properties';
import { GetRepDashboardData } from '../../../gql/queries/repDashboard';
import { QueryResult, useQuery } from '@apollo/client';
import { repDashboardData as RepDashboardData } from '../../../gql/types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RepEarningsContainer from '../RepEarningsContainer';
import Loader from '../../atoms/Loader';
import { dates } from '../RepDashboard';

const RepEarningsWidget: React.FC<{ activeQuarter: number }> = ({
  activeQuarter,
}) => {
  const useStyles = makeStyles({
    subtitle: {
      fontWeight: 300,
    },
    calendarIcon: {
      width: 22,
      height: 24,
    },
    item: {
      // borderRadius: 4,
      // border: '1px solid ' + COLORS.BORDER_PRIMARY,
      // boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
    },
    mainDiv: {
      marginTop: '0.73rem',
    },
    // formControl: {
    //   width: '270px',
    // },
    formControl: {
      marginLeft: 9,
      width: '175px',
    },
    rightSubHeading: {
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.subtitle1.fontSize,
      fontWeight: plTheme.typography.subtitle1.fontWeight,
      lineHeight: plTheme.typography.subtitle1.lineHeight,
      fontStyle: plTheme.typography.subtitle1.fontStyle,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    dropDown: {
      height: 40,
    },
    icon: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },

    selectRoot: {
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Rubik',
      lineHeight: '24px',
      letterSpacing: '0em',
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

  const classes = useStyles();
  let finacialYearDate = new Date(properties.finacialYearStartDate);
  const getDate = (month: number) => {
    finacialYearDate = new Date(properties.finacialYearStartDate);
    return new Date(
      finacialYearDate.setMonth(finacialYearDate.getMonth() + month) - 1000,
    );
  };

  const [startDate, setStartDate] = useState(properties.finacialYearStartDate);
  const [endDate, setEndDate] = useState(getDate(12).toISOString());
  const [selected, setSelected] = useState(6);
  const [thresholdValue, setThresholdValue] = useState(1);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelected(event.target.value as number);
    setStartDate(dropDownDates[event.target.value as number].startDate);
    setEndDate(dropDownDates[event.target.value as number].endDate);
    setThresholdValue(dropDownDates[event.target.value as number].value);
  };

  useEffect(() => {
    setSelected(activeQuarter);
    setStartDate(dropDownDates[activeQuarter].startDate);
    setEndDate(dropDownDates[activeQuarter].endDate);
  }, [activeQuarter]);

  const dropDownDates = [
    {
      name: 'ANNUAL (YTD)',
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
      value: 1,
    },
    {
      name: 'QUARTERLY (Q1)',
      startDate: dates[1].startDate,
      endDate: dates[1].endDate,
      value: 4,
    },
    {
      name: 'QUARTERLY (Q2)',
      startDate: dates[2].startDate,
      endDate: dates[2].endDate,
      value: 4,
    },
    {
      name: 'QUARTERLY (Q3)',
      startDate: dates[3].startDate,
      endDate: dates[3].endDate,
      value: 4,
    },
    {
      name: 'QUARTERLY (Q4)',
      startDate: dates[4].startDate,
      endDate: dates[4].endDate,
      value: 4,
    },
    {
      name: 'SEMI ANNUAL (H1)',
      startDate: dates[5].startDate,
      endDate: dates[5].endDate,
      value: 2,
    },
    {
      name: 'SEMI ANNUAL (H2)',
      startDate: dates[6].startDate,
      endDate: dates[6].endDate,
      value: 2,
    },
  ];
  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<RepDashboardData> = useQuery(GetRepDashboardData, {
    variables: {
      repDashboardInput: {
        startDate: startDate,
        endDate: endDate,
        thresholdValue: thresholdValue,
      },
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

  return (
    <>
      {' '}
      <Typography variant="h2" color="textPrimary">
        {_t_('My Earnings')}
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-end"
        style={{ marginTop: '0.29rem' }}
      >
        <Grid item style={{ marginTop: '2%' }}>
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
              disabled={false}
              IconComponent={ExpandMoreIcon}
              className={`${classes.dropDown} ${classes.rightSubHeading}`}
              value={selected}
              onChange={handleChange}
              inputProps={{
                classes: {
                  icon: classes.icon,
                  root: classes.selectRoot,
                },
              }}
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
            >
              {dropDownDates.map((element, index) => (
                <MenuItem
                  className={classes.rightSubHeading}
                  value={index}
                  key={index}
                >
                  {element.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <RepEarningsContainer data={data} />
    </>
  );
};

export default RepEarningsWidget;
