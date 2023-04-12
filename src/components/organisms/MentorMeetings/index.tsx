import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';

const MentorMeetings = () => {
  const agenda = [
    {
      id: 1,
      name: 'Career Progression',
      dueDate: 'Jul 15 2021',
    },
    {
      id: 2,
      name: 'Expanding personal digital brand',
      dueDate: 'Jul 15 2021',
    },
    {
      id: 3,
      name: 'Developing external relationships',
      dueDate: 'Aug 15 2021',
    },
  ];
  const names = [
    { key: 'Simulation', label: 'Simulation' },

    { key: 'Playbook', label: 'Playbook' },
    { key: 'Role play', label: 'Role play' },
    { key: 'Joint selling', label: 'Joint selling' },
  ];

  const coaching = [
    {
      id: 1,
      name: 'Consultative skills',
      enablement: 'Role play',
    },
    {
      id: 2,
      name: 'Active listening',
      enablement: 'Joint selling',
    },
  ];
  const useStyles = makeStyles({
    root: {
      height: 330,
      padding: 16,
      background: '#D9D9D9',
      opacity: 0.6,
    },
    agendaDiv: {
      marginTop: '0.2em',
    },
    coachingDiv: {
      marginTop: '0.5rem',
    },
    heading: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: 500,
    },
    text: {
      fontFamily: 'Rubik',
      fontSize: 14,
      fontWeight: 300,
      letterSpacing: '0em',
      lineHeight: '20px',
    },
  });
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const [width] = useWindowSize();

  return (
    <>
      {' '}
      <WidgetCard>
        <Grid container direction="column" className={classes.root}>
          <Grid item>
            <Typography className={globalClasses.body1WidgetTitle}>
              {_t_('Mentor')} {'1:1'}
            </Typography>
          </Grid>

          <Grid item style={{ width: '100%', paddingTop: '2%' }}>
            <Grid container direction="row" spacing={3}>
              <Grid item style={{ flex: width > 1500 ? 44 : 41.5 }}>
                <Typography className={classes.heading}>
                  {_t_('Activity')}
                </Typography>
              </Grid>

              <Grid item style={{ flex: width > 1500 ? 25 : 26.5 }}>
                <Typography className={classes.heading} align="left">
                  {_t_('Due date')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ width: '100%' }}>
            {agenda.map((elemet) => (
              <Grid
                container
                direction="row"
                key={elemet.id}
                style={{ marginTop: '0.2em' }}
                spacing={3}
              >
                <Grid
                  item
                  style={{
                    flex: 53,
                    // paddingTop: '2.8%',
                    // paddingRight: '2%',
                    padding: 8,
                  }}
                >
                  <Typography className={classes.text}>
                    {elemet.id}. {_t_(elemet.name)}
                  </Typography>
                </Grid>
                <Grid item style={{ flex: 30, paddingTop: '2.8%' }}>
                  <Typography className={classes.text}>
                    {_t_(elemet.dueDate)}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default MentorMeetings;
