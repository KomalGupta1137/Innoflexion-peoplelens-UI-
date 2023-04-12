import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import MyTeam from '../../atoms/ActivityScore/MyTeam';
import ActivityScoreAvatar from '../../atoms/ActivityScore/Avatar';

import ActivityScoreWidget from '../../molecules/ActivityScoreWidget';

export interface ActivityScoresProps {
  activeQuarter: number | null;
}

const ActivityScores: React.FC<ActivityScoresProps> = ({
  activeQuarter,
}: ActivityScoresProps) => {
  const useStyles = makeStyles({
    outcomesHead: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      paddingTop: 30,
    },

    outcomeDiv: {
      padding: '25px 0px',
    },
    item: {
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
      height: 127,
    },
    usoverall: {
      fontWeight: 500,
      fontSize: '14px',
      paddingTop: 2,
    },
  });

  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" className={classes.outcomesHead}>
        {_t_('Activity Score')}
      </Typography>

      <Grid
        container
        direction="row"
        spacing={3}
        className={classes.outcomeDiv}
      >
        <Grid item xs={4}>
          <ActivityScoreWidget
            color={COLORS.GENERAL_TREVA_PURPLE}
            activityPercentage={68}
            activeQuarter={activeQuarter}
            objectivePercentage={45}
            week="Week 9"
          >
            <Typography className={classes.usoverall}>US Overall</Typography>
          </ActivityScoreWidget>
        </Grid>
        <Grid item xs={4}>
          <ActivityScoreWidget
            color={COLORS.TIMELINES_PURPLE}
            activityPercentage={65}
            activeQuarter={activeQuarter}
            objectivePercentage={76}
            week="Week 9"
          >
            <MyTeam />
          </ActivityScoreWidget>
        </Grid>
        <Grid item xs={4}>
          <ActivityScoreWidget
            activityPercentage={90}
            objectivePercentage={35}
            activeQuarter={activeQuarter}
            color={COLORS.TIMELINES_PINK}
            week="Week 9"
          >
            <ActivityScoreAvatar
              name="Cynthia Parker"
              designation="Regional Sales VP"
            />
          </ActivityScoreWidget>
        </Grid>
      </Grid>
    </>
  );
};

export default ActivityScores;
