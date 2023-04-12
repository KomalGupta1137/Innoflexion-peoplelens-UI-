/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { COLORS } from '../../../plTheme';
import TeamMember from '../TeamMember';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { _t_ } from '../../../utils/translation/translation';
import { useGlobalStyles } from '../../../plStyles';
import {
  getDashboardData_getDashboardData_peopleDrivers_myTeam,
  getDashboardData_getDashboardData_peopleDrivers_myTeam_personaCount as PersonaCount,
} from '../../../gql/types';
import React, { useEffect } from 'react';

export interface TeamTreeProps {
  // eslint-disable-next-line camelcase
  data?: getDashboardData_getDashboardData_peopleDrivers_myTeam | null;
  isInReport?: boolean;
}

export const getPersonaFullForm = (persona?: string) => {
  switch (persona) {
    case 'LEADER':
      return 'Managers';
    case 'AE':
      return 'Account Executives';
    case 'SDR':
      return 'Sales Development Reps';
    case 'SE':
      return 'Sales Engineers';
    case 'CS':
      return 'Customer Success';
  }
};

const MyTeamTree: React.FC<TeamTreeProps> = ({
  data,
  isInReport,
}: TeamTreeProps) => {
  const useStyles = makeStyles({
    root: {
      height: 360,
      padding: '20px 5px 5px 20px',
    },
    subsDiv: {
      maxHeight: 255,
      // maxWidth: 250,
      // marginLeft: ,
      // marginRight: '15px',
      overflowY:
        data &&
        data.personaCount &&
        data.personaCount.length &&
        data.personaCount.length > 3
          ? 'scroll'
          : 'hidden',
      '&::-webkit-scrollbar': {
        width: 6,
        borderRadius: 10,
        marginRight: '10px',
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: '10px',
        marginTop: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        maxHeight: 30,
        backgroundColor: COLORS.GREY_4,
        borderRadius: '10px',
      },
    },
    fullHeight: {
      height: '100%',
    },
    downIcon: {
      color: COLORS.GREY_60,
      marginLeft: '45%',
      marginTop: 10,
    },
    title: {
      textTransform: 'uppercase',
    },
    teamCount: {
      marginTop: '-1px',
    },
  });

  const [totalTeamCount, setTotalTeamCount] = React.useState<number>(0);
  useEffect(() => {
    let tempCount = 0;
    if (data !== undefined || data !== null) {
      for (const eachPersona of data!.personaCount!) {
        tempCount += eachPersona!.count!;
      }
      setTotalTeamCount(tempCount);
    }
  }, []);

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <>
      <Grid container direction="column" className={classes.root}>
        <Grid item xs={12} style={{ flex: 10 }}>
          <Grid container direction="row" spacing={5}>
            <Grid item>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={globalClasses.body1WidgetTitle}
              >
                {_t_('My Team')}
              </Typography>
            </Grid>
            <Grid item className={classes.teamCount}>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                data-testid="teamCount"
              >
                {(totalTeamCount + 1)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justify="center"
          alignItems="center"
          style={{
            flex: 90,
          }}
        >
          <Grid
            container
            direction="row"
            style={{ flex: 1, height: '100%' }}
            alignItems="center"
          >
            <Grid item xs={4} wrap="wrap">
              <TeamMember
                child={false}
                name={
                  data && data.user
                    ? `${data?.user?.firstName} ${data?.user?.lastName}`
                    : ''
                }
                isInReport={isInReport}
                designation={localStorage.getItem('designation')!}
                avatarSrc="https://thumbs.dreamstime.com/b/saleswoman-talking-phone-desk-car-dealership-173254052.jpg"
              />
            </Grid>
            <Grid
              item
              container
              xs={8}
              style={{ height: '100%' }}
              justify="space-around"
              alignItems="center"
              className={classes.subsDiv}
              spacing={4}
            >
              {data?.personaCount
                ?.slice()
                .sort((a: PersonaCount | null, b: PersonaCount | null) =>
                  a && b && a.count !== null && b.count !== null
                    ? b.count - a.count
                    : 0,
                )
                .map((personas: PersonaCount | null, index: number) => (
                  <Grid item key={index}>
                    <TeamMember
                      name={
                        personas?.persona
                          ? getPersonaFullForm(personas?.persona)
                          : ''
                      }
                      child={true}
                      subs={
                        personas && personas.count !== null ? personas.count : 0
                      }
                      isInReport={isInReport}
                    />
                  </Grid>
                ))}
            </Grid>
            {/* {data && data.personaCount && data.personaCount.length > 3 && (
              <ExpandMoreIcon className={classes.downIcon} />
            )} */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MyTeamTree;
