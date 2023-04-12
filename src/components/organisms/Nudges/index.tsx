/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  Chip,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { addYears } from 'date-fns';
import { useEffect, useState } from 'react';
import NoNotification from '../../../assets/thinline-silentnotif.png';
import { useGlobalStyles } from '../../../plStyles';
import { plTheme } from '../../../plTheme';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import OutcomeTracker from '../OutcomeTracker';

const Nudges = () => {
  const [nudges, setNudges] = useState<[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getNudges = async () => {
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getActiveNotifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantId: localStorage.getItem('tenantId'),
          userId: localStorage.getItem('userId'),
        }),
      },
    );
    const jsonData = await fetchResponse.json();
    jsonData.forEach((element: any) => {
      const date = new Date('2021-12-31');
      date > new Date(element.actionCompleteDate)
        ? (element.status = 'Done')
        : (element.status = 'In Progress');
      // element.actionCompleteDate = addYears(
      //   new Date(element.actionCompleteDate),
      //   -1,
      // ); //To be removed
      element.createdDate = addYears(new Date(element.createdDate), -2); // To be removed
      element.status = 'In Progress';
    });
    setNudges(jsonData);
  };

  useEffect(() => {
    void getNudges();
  }, []);

  const useStyles = makeStyles({
    dialog: {
      position: 'absolute',
      // width: 700,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: 700,
      backgroundColor: 'rgba(246, 246, 246, 1)',
    },
    root: {
      height: 330,
      padding: 16,
      overflowY: 'scroll',
      flexDirection: nudges.length > 3 ? 'row' : 'column',
      '&::-webkit-scrollbar': {
        width: 6,
        borderRadius: 10,
        marginRight: '10px',
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        minHeight: 40,
        backgroundColor: '#CFD6DE',
        borderRadius: '10px',
      },
    },
    agendaDiv: {
      marginTop: '0.05em',
    },
    coachingDiv: {
      marginTop: '0.5rem',
    },
    text: {
      fontFamily: 'Rubik',
      fontSize: 14,
      fontWeight: 300,
      letterSpacing: '0em',
      lineHeight: '20px',
    },
    heading: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: 500,
    },
    nudges: {
      backgroundColor: '#D7DFE9',
      border: '1px solid #171F46',
      color: 'black',
      fontFamily: plTheme.typography.subtitle1.fontFamily,
      fontSize: 13,
      fontWeight: 400,
      width: '100%',
      height: 29,
    },
  });
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const names = [
    { key: 'Not Started', label: 'Not Started' },
    { key: 'In Progress', label: 'In Progress' },
    { key: 'Done', label: 'Done' },
  ];

  const [width] = useWindowSize();
  return (
    <>
      {' '}
      <WidgetCard>
        <Grid container direction="column" className={classes.root}>
          <Grid item style={{ width: '100%' }}>
            <Grid container direction="row" spacing={0}>
              <Grid item style={{ flex: 67 }}>
                <Typography className={globalClasses.body1WidgetTitle}>
                  {_t_('my NUDGES')}
                </Typography>
              </Grid>
              <Grid item style={{ flex: 32 }}>
                <Chip
                  label={nudges.length + ' nudges'}
                  icon={<NotificationsOutlinedIcon />}
                  className={classes.nudges}
                  color="default"
                  style={{ backgroundColor: 'white' }}
                ></Chip>
              </Grid>
            </Grid>
          </Grid>
          {nudges.length == 0 ? (
            <div
              className="content"
              style={{
                width: 529,
                height: 250,
                padding: 0,
                textAlign: 'center',
              }}
            >
              <img
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                data-testid="salesclosedimg"
                src={NoNotification}
                style={{ height: 70, width: 70, marginTop: 45 }}
                alt="pointer"
              />
              <div>
                <p
                  style={{
                    fontFamily: 'Rubik',
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  No Notifications
                </p>
                <p
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 300,
                    fontSize: 12,
                    lineHeight: '24px',
                  }}
                >
                  Nudges from your manager will show up here
                </p>
              </div>
            </div>
          ) : (
            <>
              <Grid item style={{ width: '100%', paddingTop: '2%' }}>
                <Grid container direction="row" spacing={3}>
                  <Grid item style={{ flex: width > 1500 ? 44 : 41.5 }}>
                    <Typography className={classes.heading}>
                      {_t_('Activity')}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    style={{
                      flex: width > 1500 ? 25 : 26.5,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      className={classes.heading}
                      align="left"
                      style={{ textAlign: 'center' }}
                    >
                      {_t_('Nudge date')}
                    </Typography>
                  </Grid>
                  <Grid item style={{ flex: 40 }}>
                    <Typography></Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                {nudges &&
                  nudges.map((element: any, index) => (
                    <Grid
                      container
                      direction="row"
                      key={index}
                      style={{ paddingTop: '5%' }}
                      spacing={3}
                    >
                      <Grid
                        item
                        style={{
                          flex: 44,
                          paddingTop: '2.8%',
                          paddingRight: '2%',
                        }}
                      >
                        <Typography className={classes.text}>
                          {index + 1}. {_t_(element.action)}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{
                          flex: 25,
                          paddingTop: '2.8%',
                          textAlign: 'center',
                        }}
                      >
                        <Typography className={classes.text}>
                          {new Date(element.createdDate)
                            .toDateString()
                            .slice(4)}
                        </Typography>
                      </Grid>
                      <Grid item style={{ flex: 40, textAlign: 'center' }}>
                        {/* {element.status} */}
                        <Chip
                          label={element.status}
                          className={classes.nudges}
                          color="default"
                          style={{ width: '102px' }}
                        ></Chip>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
              <Grid item style={{ marginTop: 'auto' }}>
                <a
                  style={{ cursor: 'pointer', color: '#0055DC' }}
                  onClick={handleClickOpen}
                >
                  See More {'>>'}
                </a>
              </Grid>
            </>
          )}
        </Grid>
      </WidgetCard>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        open={open}
        onClose={handleClose}
        fullWidth
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          alignContent: 'center',
        }}
        maxWidth="lg"
      >
        <DialogContent style={{ paddingTop: 0, overflow: 'hidden' }}>
          <OutcomeTracker />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Nudges;
