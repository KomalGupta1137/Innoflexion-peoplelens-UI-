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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { properties } from '../../../properties';
import RepSalesOutcomeContainer from '../RepSalesOutcomeContainer';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import { dates } from '../ManagerDashboard';
import SDRSalesOutcomeContainer from '../SDRSalesOutcomeContainer';

const RepSalesOutcomeWidget: React.FC<{ activeQuarter: number }> = ({
  activeQuarter,
}) => {
  const [selected, setSelected] = useState(0);
  const [persona, setPersona] = useState('');
  const [startDate, setStartDate] = useState(dates[0].startDate);
  const [endDate, setEndDate] = useState(dates[0].endDate);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelected(event.target.value as number);
    setStartDate(dropDownDates[event.target.value as number].startDate);
    setEndDate(dropDownDates[event.target.value as number].endDate);
  };
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    subtitle: {
      fontWeight: 300,
      marginTop: '0.7rem',
    },
    calendarIcon: {
      width: 22,
      height: 24,
      marginRight: 20,
      marginTop: 10,
    },
    item: {
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
    },
    mainDiv: {
      marginTop: '0.8rem',
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
    formControl: {
      width: width < 1300 ? '160px' : '216px',
    },
    selectRoot: {
      '&:focus': {
        backgroundColor: 'transparent',
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
  });

  const classes = useStyles();

  const dropDownDates = [
    {
      name: 'ANNUAL (YTD)',
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
    },
    {
      name: 'QUARTERLY (Q1)',
      startDate: dates[1].startDate,
      endDate: dates[1].endDate,
    },
    {
      name: 'QUARTERLY (Q2)',
      startDate: dates[2].startDate,
      endDate: dates[2].endDate,
    },
    {
      name: 'QUARTERLY (Q3)',
      startDate: dates[3].startDate,
      endDate: dates[3].endDate,
    },
    {
      name: 'QUARTERLY (Q4)',
      startDate: dates[4].startDate,
      endDate: dates[4].endDate,
    },
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

  useEffect(() => {
    const persona = localStorage.getItem('persona');
    setPersona(persona!);
  }, []);

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
            {_t_('Sales Outcomes')}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.subtitle}
            // style={{ paddingTop: '10%' }}
          >
            {_t_('Key sales outcomes aligned to my OKR commitments.')}
          </Typography>
        </Grid>
        <Grid item>
          <img src={CalendarIcon} className={classes.calendarIcon} />
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
                  key={index}
                  className={classes.rightSubHeading}
                  value={index}
                >
                  {element.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {persona == 'AE' || persona == 'SE' ? (
        <RepSalesOutcomeContainer startDate={startDate} endDate={endDate} />
      ) : persona == 'SDR' ? (
        <SDRSalesOutcomeContainer
          startDate={startDate}
          endDate={endDate}
          activeQuarter={activeQuarter}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RepSalesOutcomeWidget;
