import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import CircleProgress from '../../atoms/CircleProgress';
import WidgetCard from '../../atoms/WidgetCard';

interface CircularProgressProps {
  percentage?: number | null;
  variant: string;
  title: string;
}

const CircularProgressWidget: React.FC<CircularProgressProps> = ({
  percentage,
  variant,
  title,
}: CircularProgressProps) => {
  const useStyles = makeStyles({
    main: {
      padding: title == 'Win Rate' && variant == 'small' ? 10 : 16,
      paddingLeft: variant === 'large1' || variant === 'small1' ? 10 : 16,
    },
    heading: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      textTransform: 'uppercase',
    },
    donut: {
      margin: '0px auto 20px auto',
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  return (
    <WidgetCard>
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: '100%' }}
      >
        <Grid item className={classes.main}>
          <Typography className={globalClasses.body1WidgetTitle}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <div
            className={classes.donut}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width:
                variant === 'large' || variant === 'large1' || variant === 'rep'
                  ? 111
                  : 88,
              height:
                variant === 'large' || variant === 'large1' || variant === 'rep'
                  ? 111
                  : 88,
              marginBottom:
                variant === 'large' || variant === 'large1'
                  ? 25
                  : variant == 'rep'
                  ? 30
                  : 25,
            }}
          >
            <CircleProgress
              percentage={percentage ? Math.trunc(percentage * 10) / 10 : 0}
            />
          </div>
        </Grid>
      </Grid>
    </WidgetCard>
  );
};

export default CircularProgressWidget;
