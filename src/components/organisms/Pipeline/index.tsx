import {
  MenuItem,
  FormControl,
  Grid,
  makeStyles,
  Select,
  Typography,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { _t_ } from '../../../utils/translation/translation';
import CalendarIcon from '../../../assets/calendar.png';

import { COLORS, plTheme } from '../../../plTheme';
import BasicTable from '../../molecules/BasicTable/index';

import { addDays, addMinutes, addWeeks, addYears } from 'date-fns';
import { dates } from '../ManagerDashboard';

interface PipeLineProps {
  currentWeek: number;
  activeQuarter: number;
}

const PipeLine: React.FC<PipeLineProps> = ({
  currentWeek,
  activeQuarter,
}: PipeLineProps) => {
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
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    mainDiv: {
      marginTop: '0.8rem',
    },
    heading: {
      marginTop: 60,
    },
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
    dropDown: {
      height: 40,
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

  const [selectedOption, setSelectedOption] = useState<number>(currentWeek);
  const [firstDateOfQuarter, setFirstDateOfQuarter] = useState<Date>(
    new Date(),
  );

  useEffect(() => {
    setFirstDateOfQuarter(new Date(dates[activeQuarter].startDate));
  }, []);

  useEffect(() => {
    setFirstDateOfQuarter(new Date(dates[activeQuarter].startDate));
  }, [activeQuarter]);

  useEffect(() => {
    setSelectedOption(currentWeek);
  }, [currentWeek]);

  const getStartDateOfQuery = () => {
    const outputDate = new Date(dates[activeQuarter].startDate);
    const newDate = addWeeks(outputDate, selectedOption - 1);
    const nextDay = addDays(newDate, 1);
    nextDay.setFullYear(2021); // For demo sake
    return nextDay.toISOString();
  };

  const getEndDateOfQuery = () => {
    const outputDate: Date = new Date(dates[activeQuarter].startDate);
    let newDate = addWeeks(outputDate, selectedOption - 1);
    newDate = addDays(newDate, 8);
    newDate = addMinutes(newDate, -1);
    newDate.setFullYear(2021); // For demo sake
    return newDate.toISOString();
  };

  useEffect(() => {
    getStartDateOfQuery();
    getEndDateOfQuery();
  }, [firstDateOfQuarter, selectedOption]);

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
            {_t_('Pipeline')}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.subtitle}
          >
            My top deals, with ability to add/edit next steps. Pull in deal info
            and insights from current sales systems.{' '}
          </Typography>
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
                  IconComponent={ExpandMoreIcon}
                  disabled={false}
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
      <Grid container direction="row" className={classes.mainDiv} spacing={5}>
        <Grid item xs={12}>
          <div className={classes.item} style={{ height: '105%' }}>
            <BasicTable
              startDate={getStartDateOfQuery()}
              endDate={getEndDateOfQuery()}
              activeQuarter={activeQuarter}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default PipeLine;
