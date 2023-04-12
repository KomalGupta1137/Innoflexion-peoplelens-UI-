import { Avatar, Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';

import { _n_ } from '../../../utils/numerals/numerals';

export interface TeamMemberProps {
  child?: boolean;
  avatarSrc?: string;
  name?: string;
  designation?: string;
  subs?: number;
  isInReport?: boolean;
}
const TeamMember: React.FC<TeamMemberProps> = ({
  child,
  avatarSrc,
  name,
  designation,
  subs,
  isInReport,
}: TeamMemberProps) => {
  const [width] = useWindowSize();

  const getMemberCardWidth = () => {
    if (isInReport) {
      if (child) {
        return 185;
      } else if (!child && width > 1700) {
        return 130;
      } else if (!child && width < 1700) {
        return 130;
      }
    } else {
      if (child && width > 1700) {
        return 190;
      } else if (!child && width > 1700) {
        return 170;
      } else if (child && width < 1700) {
        return 145;
      } else if (!child && width < 1700) {
        return 127;
      }
    }
  };

  const useStyles = makeStyles({
    root: {
      height: child ? 69 : 61,
      backgroundColor: child
        ? COLORS.TIMELINE_LIGHT_PINK
        : COLORS.TEAM_CARD_COLOR,
      borderRadius: 4,
      padding: child ? '10px 8px' : '8px 5px',
      width: getMemberCardWidth(),
      paddingTop: width > 1700 ? '16px' : '',
      // paddingLeft: width > 1700 ? '10px' : '',
    },
    avatarGrid: {
      width: 40,
    },
    avatar: {
      height: child ? 28 : 30,
      width: child ? 28 : 30,
      marginRight: child ? '-2px' : 6,
    },
    longText: {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: child ? '-4px 0 1px 0' : '-5px 0 -1px 0',
    },
    longTextChild: {
      // width: '85%',
      // whiteSpace: 'nowrap',
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
      // margin: child ? '-4px 0 1px 0' : '-5px 0 -1px 0',
    },
    designation: {
      display: 'inline-block',
      width: '75%',
    },
    connector: {
      width: 15,
      height: 5,
      //   background: "linear-gradient(90deg, rgba(215,223,233,0.07) 0%, rgba(126,133,142,0.4) 22%, rgba(126,133,142,0.6) 45%, rgba(126,133,142,0.8) 71%, rgba(126,133,142,1) 100%)",
      marginTop: 32,
      backgroundColor: COLORS.GREY_4,
    },
    subs: {
      width: 48,
      height: 40,
      backgroundColor: COLORS.TIMELINE_LIGHTIPURPLE,
      borderRadius: 4,
      marginTop: 15,
    },
    subsValue: {
      textAlign: 'center',
      verticalAlign: 'middle',
      lineHeight: '40px',
    },
    titleGrid: {
      marginLeft: width > 1700 ? '-20px' : '',
    },
    parentTitleGird: {
      // marginLeft: width > 1700 ? "-8px" : ""
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  const subsValue = subs && _n_(subs, '0,0.0');

  return (
    <>
      <Box flexWrap="wrap">
        <Grid container direction="row" justify="center">
          <Grid item id="main-card">
            <Grid
              container
              direction="column"
              justify="center"
              className={classes.root}
            >
              {/* <Grid
                item
                className={classes.avatarGrid}
                style={{ marginRight: width > 1700 ? 10 : 0 }}
              >
                {avatarSrc && (
                  <Avatar src={avatarSrc} className={classes.avatar} />
                )}
              </Grid> */}

              <Grid
                item
                className={child ? classes.titleGrid : classes.parentTitleGird}
                zeroMinWidth
              >
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  className={child ? classes.longTextChild : classes.longText}
                  style={child && width > 1700 ? { marginLeft: 20 } : {}}
                >
                  {name}
                </Typography>
                {!child && (
                  <Typography
                    className={`${globalClasses.body2Light} ${classes.designation}`}
                    color="textSecondary"
                    noWrap
                  >
                    {designation}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          {child && <Grid item className={classes.connector}></Grid>}
          {child && (
            <Grid item className={classes.subs}>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.subsValue}
                data-testid="subsCount"
              >
                {subs?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default TeamMember;
