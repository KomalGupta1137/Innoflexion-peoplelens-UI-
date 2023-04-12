import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import CircularProgress from '../../atoms/CircleProgress';
import WidgetCard from '../../atoms/WidgetCard';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';

export interface ActivityScoreWidgetProps {
  children: React.ReactNode;
  color: string | null;
  activityPercentage: number | null;
  objectivePercentage: number | null;
  activeQuarter: number | null;
  week: string | null;
}

const ActivityScoreWidget: React.FC<ActivityScoreWidgetProps> = ({
  children,
  color,
  activityPercentage,
  objectivePercentage,
  activeQuarter,
  week,
}: ActivityScoreWidgetProps) => {
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    root: {
      paddingLeft: width > 1200 ? 17 : 10,
      paddingRight: width > 1200 ? 17 : 9,
    },
    children: {
      paddingRight: 10,
    },
    column1: {
      paddingBottom: 21,
      paddingTop: 12,
    },
    typography: {
      paddingRight: 20,
    },
    lowEmphasisText: {
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '16px',
      color: COLORS.TEXT_LOW_EMPHASIS,
    },
    highEmphasisText: {
      width: 94,
      fontWeight: 500,
      lineHeight: '16px',
      color: COLORS.TEXT_High_EMPHASIS,
      fontSize: '12px',
    },
    CircularProgress: {
      width: 38,
      height: 37,
    },
    item: {
      borderRadius: 4,
      height: 127,
      borderBottom: `7px solid ${color || ''}`,
    },
  });

  const classes = useStyles();

  return (
    <>
      <WidgetCard>
        <div className={`${classes.item} `}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            className={classes.root}
          >
            <Grid item className={classes.children}>
              {children}
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item className={classes.column1}>
                  <Grid container direction="row">
                    <Grid item className={classes.typography}>
                      <Typography
                        variant="h6"
                        className={classes.lowEmphasisText}
                      >
                        {week ? _t_(week) : ''}
                      </Typography>
                      <Typography
                        variant="h6"
                        className={classes.highEmphasisText}
                      >
                        {_t_('Activity Score')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <div className={classes.CircularProgress}>
                        <CircularProgress
                          percentage={activityPercentage}
                          barColor={color}
                          font="ActivityScore"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item className={classes.typography}>
                      <Typography
                        variant="h6"
                        className={classes.lowEmphasisText}
                      >
                        {_t_(`Q${activeQuarter ? activeQuarter + 1 : 0 + 1}`)}
                      </Typography>
                      <Typography
                        variant="h6"
                        className={classes.highEmphasisText}
                      >
                        {_t_('Objective Score')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <div className={classes.CircularProgress}>
                        <CircularProgress
                          percentage={objectivePercentage}
                          barColor={color}
                          font="ActivityScore"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </WidgetCard>
    </>
  );
};

export default ActivityScoreWidget;
