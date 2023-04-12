/* eslint-disable prettier/prettier */
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
import CustomerMeetings from '../CustomerMeetings/index';
import ManagerMeetings from '../ManagerMeetings/index';
import Nudges from '../Nudges/index';
import { COLORS, plTheme } from '../../../plTheme';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addDays, addMinutes, addWeeks, addYears, subYears } from 'date-fns';
import MentorMeetings from '../MentorMeetings';
import { dates } from '../RepDashboard';

const RepMYMeeting: React.FC<{
  currentWeek: number;
  page: string;
  activeQuarter: number;
}> = ({ currentWeek, page, activeQuarter }) => {
  const [selectedOption, setSelectedOption] = useState<number>(currentWeek);
  const [firstDateOfQuarter, setFirstDateOfQuarter] = React.useState<Date>(
    new Date(),
  );

  const useStyles = makeStyles({
    subtitle: {
      marginTop: 13,
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
      marginTop: '0.8rem',
    },
    mainHeading: {
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.subtitle1.fontSize,
      fontWeight: plTheme.typography.subtitle1.fontWeight,
      lineHeight: plTheme.typography.subtitle1.lineHeight,
      fontStyle: plTheme.typography.subtitle1.fontStyle,
      marginTop: 24,
      marginBottom: 22,
      letterSpacing: 0,
    },
    outcomesHead: {
      paddingTop: 25,
    },
    formControl: {
      marginLeft: 9,
      width: '167px',
    },
    heading: {
      marginTop: 60,
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
    graphElement: {
      height: 735,
    },
    leftHeading: {
      // marginTop: 20,
      // marginLeft: 51.2,
    },
    icon: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
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
  const names = [
    'WEEKLY (1/13)',
    'WEEKLY (2/13)',
    'WEEKLY (3/13)',
    'WEEKLY (4/13)',
    'WEEKLY (5/13)',
    'WEEKLY (6/13)',
    'WEEKLY (7/13)',
    'WEEKLY (8/13)',
    'WEEKLY (9/13)',
    'WEEKLY (10/13)',
    'WEEKLY (11/13)',
    'WEEKLY (12/13)',
    'WEEKLY (13/13)',
  ];
  const classes = useStyles();

  useEffect(() => {
    const todaysDate = new Date();
    const now = subYears(todaysDate, 1);
    const quarter = Math.floor(now.getMonth() / 3);
    const firstDate = new Date(now.getFullYear(), quarter * 3, 1);
    setFirstDateOfQuarter(firstDate);
  }, []);

  useEffect(() => {
    setSelectedOption(currentWeek);
  }, [currentWeek]);

  const getStartDateOfQuery = () => {
    let outputDate = new Date(dates[activeQuarter].startDate);
    outputDate = addYears(outputDate, 1); //To be removed later
    const newDate = addWeeks(outputDate, selectedOption);
    const nextDay = addDays(newDate, 0);
    return nextDay.toISOString();
  };

  const getEndDateOfQuery = () => {
    let outputDate: Date = new Date(dates[activeQuarter].startDate);
    outputDate = addYears(outputDate, 1); //To be removed later
    let newDate = addWeeks(outputDate, selectedOption);
    newDate = addDays(newDate, 8);
    newDate = addMinutes(newDate, -1);
    return newDate.toISOString();
  };

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectedOption(event.target.value as number);
  };
  return (
    <>
      {' '}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item>
          <Typography
            variant="h2"
            color="textPrimary"
            className={classes.heading}
          >
            {_t_('My Meetings')}
          </Typography>
          {page == 'All' && (
            <Typography
              variant="h3"
              color="textPrimary"
              className={classes.subtitle}
            >
              Customer meetings and Internal meetings, with shareable agendas,
              coaching plans and nudges.{' '}
            </Typography>
          )}
          {page == 'People' && (
            <Typography
              variant="h3"
              color="textPrimary"
              className={classes.subtitle}
            >
              Internal meetings, with shareable agendas, coaching plans and
              nudges.{' '}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="flex-start">
            <Grid item style={{ marginTop: '0.5rem' }}>
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
                  value={selectedOption}
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
                  {names.map((element, index) => (
                    <MenuItem
                      className={classes.rightSubHeading}
                      value={index + 1}
                      key={index}
                    >
                      {element}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {page == 'All' && (
        <Grid container direction="row" className={classes.mainDiv} spacing={3}>
          <Grid item xs={4}>
            <div className={classes.item} style={{ height: 330 }}>
              <CustomerMeetings
                startDate={getStartDateOfQuery()}
                endDate={getEndDateOfQuery()}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.item} style={{ height: 330 }}>
              <ManagerMeetings />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.item} style={{ height: 330 }}>
              <Nudges />
            </div>
          </Grid>
        </Grid>
      )}
      {page == 'People' && (
        <Grid container direction="row" className={classes.mainDiv} spacing={3}>
          <Grid item xs={4}>
            <div className={classes.item} style={{ height: 330 }}>
              <ManagerMeetings />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.item} style={{ height: 330 }}>
              <MentorMeetings />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.item} style={{ height: 330 }}>
              <Nudges />
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default RepMYMeeting;
