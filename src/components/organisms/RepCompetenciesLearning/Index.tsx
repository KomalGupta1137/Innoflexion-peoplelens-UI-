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
import RepLearning from '../../molecules/RepLearning';

import RepRatingChartWidget from '../RepRatingChart/index';
import DatesDropDown from '../../molecules/RepDatesDropDown/index';
import { RepDashboardData_RepDashboardData_okrSummary as competenciesData } from '../../../gql/types';
import { properties } from '../../../properties';
import { dates } from '../RepDashboard';

interface RepCompetenciesProps {
  activeQuarter: number;
}

const RepCompetencies: React.FC<RepCompetenciesProps> = ({
  activeQuarter,
}: RepCompetenciesProps) => {
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

  const [startDate, setStartDate] = useState(dates[activeQuarter].startDate);
  const [endDate, setEndDate] = useState(dates[activeQuarter].endDate);
  const [selected, setSelected] = useState(1);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelected(event.target.value as number);
    setStartDate(dropDownDates[event.target.value as number].startDate);
    setEndDate(dropDownDates[event.target.value as number].endDate);
  };

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
    setSelected(activeQuarter);
    setStartDate(dropDownDates[activeQuarter].startDate);
    setEndDate(dropDownDates[activeQuarter].endDate);
  }, [activeQuarter]);

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
            {_t_('Competencies and Learning')}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.subtitle}
          >
            Self participation, assessments & satisfaction over quarter.
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
      <Grid container direction="row" className={classes.mainDiv} spacing={3}>
        <Grid item xs={6}>
          <div className={classes.item} style={{ height: 410 }}>
            <RepRatingChartWidget startDate={startDate} endDate={endDate} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ height: 410 }}>
            <RepLearning startDate={startDate} endDate={endDate} />{' '}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default RepCompetencies;
