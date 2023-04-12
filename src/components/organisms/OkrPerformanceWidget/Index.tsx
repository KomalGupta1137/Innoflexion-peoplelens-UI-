import {
  Grid,
  makeStyles,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { _t_ } from '../../../utils/translation/translation';
import CalendarIcon from '../../../assets/calendar.png';
import { COLORS, plTheme } from '../../../plTheme';

import { properties } from '../../../properties';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OkrPerformances from '../OkrPerformances/Index';
import { dates } from '../ManagerDashboard';

const OkrPerformancesWidget = () => {
  const useStyles = makeStyles({
    subtitle: {
      marginTop: 13,
      fontWeight: 300,
    },
    calendarIcon: {
      width: 22,
      height: 24,
    },
    item: {},
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
  const names = ['SEMI ANNUAL (H1)', 'SEMI ANNUAL (H2)'];
  let finacialYearDate = new Date(properties.finacialYearStartDate);
  const getDate = (month: number) => {
    finacialYearDate = new Date(properties.finacialYearStartDate);
    return new Date(
      finacialYearDate.setMonth(finacialYearDate.getMonth() + month) - 1000,
    );
  };

  const geStartDate = (month: number) => {
    finacialYearDate = new Date(properties.finacialYearStartDate);
    return new Date(
      finacialYearDate.setMonth(finacialYearDate.getMonth() + month),
    );
  };
  const [startDate, setStartDate] = useState(properties.finacialYearStartDate);
  const [endDate, setEndDate] = useState(getDate(6).toISOString());
  const [selected, setSelected] = useState(1);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelected(event.target.value as number);
    setStartDate(dropDownDates[event.target.value as number].startDate);
    setEndDate(dropDownDates[event.target.value as number].endDate);
  };

  const dropDownDates = [
    {
      name: 'SEMI ANNUAL (H1)',
      startDate: dates[5].startDate,
      endDate: dates[5].endDate,
    },
    {
      name: 'SEMI ANNUAL (H2)',
      startDate: dates[6].startDate,
      endDate: dates[6].endDate,
    },
  ];
  const classes = useStyles();
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
            {_t_('OKR and Performance Reviews')}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.subtitle}
          >
            Sales OKRs, performance reviews, ratings.{' '}
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
        </Grid>
      </Grid>
      <OkrPerformances startDate={startDate} endDate={endDate} />
    </>
  );
};

export default OkrPerformancesWidget;
