/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import { COLORS } from '../../../plTheme';
import Loader from '../../atoms/Loader';

export interface CustomerMeetingsProps {
  startDate?: string;
  endDate?: string;
}

const CustomerMeetings: React.FC<CustomerMeetingsProps> = ({
  startDate,
  endDate,
}: CustomerMeetingsProps) => {
  const [newData, setNewData] = useState<any>([]);
  const [exsitingData, setExistingData] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    void getMeetings();
  }, [startDate, endDate]);

  const getMeetings = async () => {
    setLoading(true);
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getMeetings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantId: localStorage.getItem('tenantId'),
          userId: localStorage.getItem('userId'),
          startDate: startDate,
          endDate: endDate,
        }),
      },
    );
    const jsonData = await fetchResponse.json();
    setNewData && setNewData(jsonData[0]);
    setExistingData && setExistingData(jsonData[1]);
    setLoading(false);
  };

  const useStyles = makeStyles({
    root: {
      height: 158,
      paddingLeft: 16,
      paddingTop: 16,
      paddingBottom: 16,
      flexDirection: 'row',
    },
    data: {
      fontFamily: 'Rubik',
      fontSize: 14,
      fontWeight: 300,
      color: COLORS.TEXT_HIGH_EMPHASIS,
      lineHeight: '21px',
      letterSpacing: '0em',
    },
    heading: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: 500,
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    meetingList: {
      width: '100%',
      paddingTop: '2%',
      height: 109,
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
        backgroundColor: '#CFD6DE',
        borderRadius: '10px',
      },
    },
  });
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      {' '}
      <Grid container direction="row">
        <WidgetCard margin={true}>
          <Grid container direction="column" className={classes.root}>
            <Grid item style={{ width: '100%' }}>
              <Typography className={globalClasses.body1WidgetTitle}>
                {_t_('Customer Meetings')}
              </Typography>
            </Grid>
            <Grid item className={classes.meetingList}>
              <Grid container direction="row" spacing={2}>
                <Grid item style={{ width: '75%', paddingBottom: '2%' }}>
                  <Typography className={classes.heading}>
                    {_t_('NEW')}
                  </Typography>
                </Grid>
                <Grid item style={{ width: '24%', paddingBottom: '2%' }}>
                  <Typography className={classes.heading}>
                    {_t_('Date')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                {newData.length == 0 ? (
                  <div>No meetings</div>
                ) : (
                  <>
                    {newData.map((element: any, index: number) => (
                      <Grid
                        container
                        direction="row"
                        key={index}
                        style={{ paddingTop: '2%' }}
                        spacing={2}
                      >
                        <Grid item style={{ width: '75%' }}>
                          <Typography className={classes.data}>
                            {index + 1}
                            {'. '} {element.subject}
                          </Typography>
                        </Grid>
                        <Grid item style={{ width: '25%' }}>
                          <Typography className={classes.data}>
                            {_t_(
                              new Date(element.date).toDateString().slice(4),
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}{' '}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </WidgetCard>
        <WidgetCard>
          <Grid container direction="column" className={classes.root}>
            <Grid
              item
              className={classes.meetingList}
              style={{ paddingTop: '4%', height: 122 }}
            >
              <Grid container direction="row" spacing={2}>
                <Grid item style={{ width: '75%', paddingBottom: '2%' }}>
                  <Typography className={classes.heading}>
                    {_t_('EXISTING')}
                  </Typography>
                </Grid>
                <Grid item style={{ width: '24%', paddingBottom: '2%' }}>
                  <Typography className={classes.heading}>
                    {_t_('Date')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                {exsitingData.length == 0 ? (
                  <div>No meetings</div>
                ) : (
                  <>
                    {exsitingData.map((element: any, index: number) => (
                      <Grid
                        container
                        direction="row"
                        key={index}
                        style={{ paddingTop: '2%' }}
                        spacing={2}
                      >
                        <Grid item style={{ width: '75%' }}>
                          <Typography className={classes.data}>
                            {index + 1}
                            {'. '} {element.subject}
                          </Typography>
                        </Grid>
                        <Grid item style={{ width: '25%' }}>
                          <Typography className={classes.data}>
                            {_t_(
                              new Date(element.date).toDateString().slice(4),
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </WidgetCard>
      </Grid>
    </>
  );
};

export default CustomerMeetings;
