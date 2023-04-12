import {
  FormControl,
  Grid,
  makeStyles,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { _t_ } from '../../../utils/translation/translation';
import CalendarIcon from '../../../assets/calendar.png';
import { COLORS, plTheme } from '../../../plTheme';

import { properties } from '../../../properties';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RewardsContainer from '../RewardsContainer';
const RewardsWidget = () => {
  const useStyles = makeStyles({
    subtitle: {
      marginTop: '11',
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
      marginTop: '1rem',
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
  const [startDate, setStartDate] = useState(geStartDate(3).toISOString());
  const [endDate, setEndDate] = useState(getDate(6).toISOString());
  const [selected, setSelected] = useState(1);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelected(event.target.value as number);
    setStartDate(dropDownDates[event.target.value as number].startDate);
    setEndDate(dropDownDates[event.target.value as number].endDate);
  };

  const dropDownDates = [
    {
      name: 'QUARTERLY (Q1)',
      startDate: properties.finacialYearStartDate,
      endDate: getDate(3).toISOString(),
    },
    {
      name: 'QUARTERLY (Q2)',
      startDate: geStartDate(3).toISOString(),
      endDate: getDate(6).toISOString(),
    },
    {
      name: 'QUARTERLY (Q3)',
      startDate: geStartDate(6).toISOString(),
      endDate: getDate(9).toISOString(),
    },
    {
      name: 'QUARTERLY (Q4)',
      startDate: geStartDate(9).toISOString(),
      endDate: getDate(12).toISOString(),
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
          <Typography variant="h2" color="textPrimary">
            {_t_('Rewards')}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.subtitle}
          >
            Commission structure, pay out and open cases.{' '}
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
                  disabled={true}
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
      <RewardsContainer startDate={startDate} endDate={endDate} />
    </>
  );
};

export default RewardsWidget;
