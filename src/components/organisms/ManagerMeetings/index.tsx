import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import PLChip from '../../atoms/PLChip/index';
import WidgetCard from '../../atoms/WidgetCard';
import DropDown from '../../molecules/DropDown';
import EditOutlined from '@material-ui/icons/EditOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import Share from '../../../assets/Share.png';
import Edit from '../../../assets/Edit.png';

const ManagerMeetings = () => {
  const agenda = [
    {
      id: 1,
      name: 'Product Roadmap - point of view',
    },
    {
      id: 2,
      name: 'Home Depot Workshop - share plans',
    },
    {
      id: 3,
      name: 'Home Depot Workshop - share plans',
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
      flexWrap: 'nowrap',
      overflowY: 'scroll',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: 6,
        borderRadius: 10,
        marginRight: '10px',
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: '10px',
        // marginTop: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        minHeight: 40,
        backgroundColor: 'white',
        borderRadius: '10px',
      },
    },
    agendaDiv: {
      marginTop: '0.2em',
    },
    coachingDiv: {
      // marginTop: '0.5rem',
    },
  });
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  return (
    <>
      {' '}
      <WidgetCard>
        <Grid container direction="column" className={classes.root}>
          <Grid
            container
            direction="row"
            style={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography className={globalClasses.body1WidgetTitle}>
                {_t_('Manager')} {'1:1'}
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={Share}
                style={{
                  height: 17.5,
                  width: 17.5,
                  marginRight: 10,
                  cursor: 'pointer',
                }}
              />
              <img
                src={Edit}
                style={{ height: 17.5, width: 17.5, cursor: 'pointer' }}
              />
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: '2%' }}>
            <Typography
              variant="h5"
              color="textPrimary"
              className={globalClasses.h5Medium}
              style={{ marginBottom: 5 }}
            >
              {_t_('Agenda')}
            </Typography>
            {agenda.slice(0, 2).map((item, index) => (
              <Grid
                container
                direction="row"
                alignItems="center"
                key={index}
                spacing={4}
                className={classes.agendaDiv}
              >
                <Grid item>
                  <Typography
                    color="textPrimary"
                    className={globalClasses.body1Light24}
                  >
                    {index + 1}. {_t_(item.name)}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item style={{ paddingTop: '2%' }}>
            <Typography
              variant="h5"
              color="textPrimary"
              className={globalClasses.h5Medium}
              style={{ marginBottom: 5 }}
            >
              {_t_('Pipeline Review')}
            </Typography>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={4}
              className={classes.agendaDiv}
            >
              <Grid item>
                <Typography
                  color="textPrimary"
                  className={globalClasses.body1Light24}
                >
                  {1}. {_t_('Deals going sideways')}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={4}
              className={classes.agendaDiv}
            >
              <Grid item>
                <Typography
                  color="textPrimary"
                  className={globalClasses.body1Light24}
                >
                  {2}. {_t_('Home Depot Workshop - review agenda')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: '2%' }}>
            <Typography
              variant="h5"
              color="textPrimary"
              className={globalClasses.h5Medium}
              style={{ marginBottom: 5 }}
            >
              {_t_('Closed Deals Review')}
            </Typography>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={4}
              className={classes.agendaDiv}
            >
              <Grid item>
                <Typography
                  color="textPrimary"
                  className={globalClasses.body1Light24}
                >
                  {1}. {_t_('Learning from won opps.')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: '2%' }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              className={classes.coachingDiv}
              // spacing={2}
            >
              <Grid style={{ flex: 66 }}>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  className={globalClasses.h5Medium}
                >
                  {_t_('Coaching')}
                </Typography>
              </Grid>
              <Grid item style={{ flex: 34 }}>
                {' '}
                <Typography
                  variant="h5"
                  color="textPrimary"
                  className={globalClasses.h5Medium}
                >
                  {_t_('Enablement')}
                </Typography>
              </Grid>
            </Grid>
            {coaching.slice(0, 2).map((item, index) => (
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                key={index}
                className={classes.agendaDiv}
                style={{ height: 25 }}
                // spacing={2}
              >
                <Grid item style={{ flex: 65 }}>
                  <Typography
                    color="textPrimary"
                    className={globalClasses.body1Light24}
                  >
                    {index + 1}. {_t_(item.name)}
                  </Typography>
                </Grid>
                <Grid item style={{ flex: 35 }}>
                  <DropDown
                    values={names}
                    width={'7.4rem'}
                    status={item.enablement}
                    disabled={true}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default ManagerMeetings;
