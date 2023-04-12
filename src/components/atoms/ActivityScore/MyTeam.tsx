import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import myteam from '../../../../src/assets/myteam.png';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ActivityScoreAvatarProps {}

const ActivityScoreAvatar: React.FC<ActivityScoreAvatarProps> = (
  _: ActivityScoreAvatarProps,
) => {
  const useStyles = makeStyles({
    name: {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '24px',
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    designation: {
      fontFamily: 'Rubik',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '16px',
      color: COLORS.TEXT_LOW_EMPHASIS,
    },
    img: {
      paddingRight: 10,
    },
    myTeam: {
      paddingTop: 8,
    },
  });

  const classes = useStyles();

  return (
    <>
      <Grid container direction="row">
        <Grid item className={classes.img}>
          <img src={myteam} alt=" " style={{ width: 40, height: 40 }}></img>
        </Grid>
        <Grid item className={classes.myTeam}>
          <Typography variant="body1" className={classes.name}>
            {_t_('My Team')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ActivityScoreAvatar;
