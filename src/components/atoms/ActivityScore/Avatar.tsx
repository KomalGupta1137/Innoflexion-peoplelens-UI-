import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import AvatarImg from '../../../../src/assets/avatar.png';

export interface ActivityScoreAvatarProps {
  name: string | null;
  designation: string | null;
}

const ActivityScoreAvatar: React.FC<ActivityScoreAvatarProps> = ({
  name,
  designation,
}: ActivityScoreAvatarProps) => {
  const useStyles = makeStyles({
    root: {
      paddingRight: 4,
    },
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
    avatar: {
      width: 40,
      height: 42,
      marginTop: 3,
    },
    row1: {
      paddingRight: 10,
    },
    row2: {
      paddingTop: 3,
    },
  });

  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" className={classes.root}>
        <Grid item className={classes.row1}>
          <Avatar src={AvatarImg} className={classes.avatar}></Avatar>
        </Grid>
        <Grid item className={classes.row2}>
          <Typography className={classes.name}>
            {name ? _t_(name) : ''}
          </Typography>
          <Typography className={classes.designation}>
            {designation ? _t_(designation) : ''}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ActivityScoreAvatar;
