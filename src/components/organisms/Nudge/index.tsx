import React from 'react';
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from '@material-ui/core';
import { COLORS } from '../../../plTheme';
import close from '../../../../src/assets/close.png';
import { _t_ } from '../../../utils/translation/translation';
import ReactGA from 'react-ga';

interface NudgeProps {
  onclose: any;
  data: any | null | undefined;
}
const useStyles = makeStyles({
  root: {
    padding: 20,
  },
  outcomesHead: {
    color: COLORS.TEXT_HIGH_EMPHASIS,
    paddingTop: 30,
    paddingBottom: 20,
  },
  outcomeDiv: {
    paddingLeft: '5px ',
  },
  title: {
    height: '32px',
    width: '159px',
    fontWeight: 300,
    fontSize: '20px',
    color: '#7E858E',
  },
  item: {
    height: 460,
    width: 1200,
  },
  buttonFont: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: 14,
    textTransform: 'none',
  },
  GraphPadding: {
    paddingRight: '50px',
  },
  GraphPadding1: {
    paddingRight: '0px',
  },
  wrapper: {
    display: 'grid',
    gridTemplateRows: '4.5fr 1fr',
    width: '475px',
  },
  wrapper1: {
    display: 'grid',
    gridTemplateRows: '4fr 1fr',
    width: '475px',
  },
  nudgeMessage: {
    lineHeight: '32px',
    fontSize: '19px',
    fontWeight: 300,
  },
  nudgeHeader: {
    height: '50px',
    width: '915px',
    overflow: 'auto',
  },
  avatar: {
    width: 80,
    height: 80,
    fontSize: '30px',
  },
});

const Nudge: React.FC<NudgeProps> = ({ onclose, data }: NudgeProps) => {
  const classes = useStyles();
  const imageClick = () => {
    onclose();
  };
  const approveAction = async () => {
    ReactGA.event({
      category: 'Nudge',
      action: 'Nudge Approved',
    });
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/setNotification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantId: localStorage.getItem('tenantId'),
          data: data,
          parentId: localStorage.getItem('userId'),
        }),
      },
    ).then((res) => {
      onclose();
    });
  };
  return (
    <>
      <div className={classes.item}>
        <Grid container direction="column" className={classes.root}>
          <Grid item style={{ width: 720 }}>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Typography variant="h3" className={classes.title}>
                  {_t_(data.title)}
                </Typography>
              </Grid>
              <Grid item style={{ paddingRight: '6rem' }}>
                <img
                  src={close}
                  alt="close"
                  style={{ width: 23, height: 23 }}
                  onClick={() => imageClick()}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: 20, height: 305 }}>
            <Grid
              container
              direction="column"
              justify="space-between"
              className={classes.nudgeHeader}
            >
              <Typography
                variant="h2"
                dangerouslySetInnerHTML={{ __html: data.header }}
              ></Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justify="space-between"
              style={{
                height: '85px',
                width: '630px',
                overflow: 'auto',
                top: '429px',
                left: '410px',
              }}
            >
              <Typography
                className={classes.nudgeMessage}
                dangerouslySetInnerHTML={{ __html: data.message }}
              ></Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justify="space-between"
              style={{
                width: '605px',
                lineHeight: '32px',
              }}
            >
              <Card
                style={{
                  background: '#7E858E21',
                  height: '145px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CardContent style={{ paddingBottom: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className={
                        data.course.name.length > 35
                          ? classes.wrapper
                          : classes.wrapper1
                      }
                    >
                      <Typography
                        style={{
                          fontSize: 28,
                          padding: 20,
                          paddingTop: 10,
                          fontWeight: 500,
                          height: 40,
                          lineHeight: '25px',
                        }}
                      >
                        {data.course.name}
                      </Typography>

                      <Typography style={{ fontSize: 15, paddingLeft: '20px' }}>
                        {data.course.compleDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Typography>
                    </span>

                    <Avatar
                      src={''}
                      className={classes.avatar}
                      alt={'avatar'}
                      children={data.name.charAt(0)}
                    />
                  </span>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: 25 }}>
            <Grid container direction="row">
              <Grid item>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  style={{
                    width: 200,
                    height: 55,
                    fontSize: 20,
                    lineHeight: 32,
                  }}
                  classes={{ containedSizeLarge: classes.buttonFont }}
                  onClick={() => approveAction()}
                >
                  {_t_('Approve')}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  style={{
                    width: 200,
                    height: 55,
                    fontSize: 20,
                  }}
                  classes={{ sizeLarge: classes.buttonFont }}
                  onClick={() => imageClick()}
                >
                  {_t_('Do it later')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Nudge;
