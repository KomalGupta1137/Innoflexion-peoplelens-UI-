import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import { _t_ } from '../../../utils/translation/translation';

import CalendarIcon from '../../../assets/calendar.png';
import { COLORS } from '../../../plTheme';
import WidgetCard from '../../atoms/WidgetCard';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import RepSalesActivitiesContainer from '../RepSalesActivitiesContainer';

interface RepSalesActivitiesWidgetProps {
  activeQuarter: number;
}

const RepSalesActivitiesWidget: React.FC<RepSalesActivitiesWidgetProps> = ({
  activeQuarter,
}: RepSalesActivitiesWidgetProps) => {
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
  });

  const classes = useStyles();

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
          <img src={CalendarIcon} className={classes.calendarIcon} />
        </Grid>
      </Grid>
      <RepSalesActivitiesContainer activeQuarter={activeQuarter} />
    </>
  );
};

export default RepSalesActivitiesWidget;
