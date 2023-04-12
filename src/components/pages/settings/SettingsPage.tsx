/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { EditText, onSaveProps } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import ReactGA from 'react-ga';
import avatar from '../../../assets/Manager_Round.png';
import Rep from '../../../assets/Rep.png';
import { COLORS, plTheme } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import Loader from '../../atoms/Loader';
import Header from '../../organisms/Header';
import Sidebar from '../../organisms/Sidebar';
import '../settings/styles.css';
import OutcomeScales from './OutcomeScales';

ReactGA.pageview(window.location.pathname);

makeStyles(() => ({
  root: {
    backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
  },
  contentData: {
    width: '100%',
    marginLeft: '80px',
    marginRight: '40px',
  },
  reduceMargin: {},
  hideMargin: {
    marginTop: '4rem',
  },
  [`@media print`]: {
    reduceMargin: {
      marginLeft: '0%',
    },
    hideMargin: {
      marginTop: 0,
    },
  },
}));

interface DecodedTokenProps {
  user: UserProps;
}

interface UserProps {
  designation: string | null;
  persona: string | null;
}

const SettingsPage: React.FC = () => {
  const [loading, setLoader] = useState<boolean>(false);
  const [fullName, setFullName] = React.useState('');
  const [jobTitle, setJobTitle] = React.useState('');
  const [department, setDepartment] = React.useState('Global Sales');
  const [email, setEmail] = React.useState('');
  const [phoneNo, setPhoneNo] = React.useState('+1-541-754-3010');
  const [notification, setNotificationValue] = React.useState('Email');
  const [calendar, setCalendarValue] = React.useState('Google Calendar');
  const [timeline, setTimelineValue] = React.useState('Current - QTD');
  const [overview, setOverview] = React.useState(true);
  const [leaderboard, setLeaderboard] = React.useState(true);
  const [people, setPeople] = React.useState(true);
  const [reports, setReports] = React.useState(true);
  const [customer, setCustomer] = React.useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useAuth0();
  const { picture } = user;
  const token = localStorage.getItem('accessToken');
  const decodedToken: DecodedTokenProps | null | '' = token && jwtDecode(token);
  const persona: string | null =
    decodedToken && decodedToken.user && decodedToken?.user?.persona;
  const designation: string | null =
    decodedToken && decodedToken.user && decodedToken?.user?.designation;
  const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
    },
    contentAlignment: {
      padding: '2%',
      backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
      width: 'calc(100% + 211px)',
      //   height: height - 49,
    },
    buttonStyles: {
      marginRight: '16px',
      width: '68.08px',
    },
    hideWhenPrint: {},
    [`@media print`]: {
      contentAlignment: {
        padding: 0,
      },
      hideWhenPrint: {
        display: 'none',
      },
      tabAlignment: {
        paddingLeft: '0%',
      },
      reduceMargin: {
        marginLeft: '0%',
      },
      hideMargin: {
        marginTop: 0,
      },
    },
    tabAlignment: {
      paddingLeft: '1%',
    },
    contentData: {
      width: '100%',
      marginLeft: '80px',
      marginRight: '40px',
    },
    reduceMargin: {},
    hideMargin: {
      marginTop: '4rem',
    },
    text: {
      marginTop: 10,
      marginBottom: 0,
      textAlign: 'center',
      fontFamily: 'Rubik',
      fontWeight: 300,
      fontSize: 16,
      //   lineHeight: 24,
      color: 'rgb(24, 77, 211)',
    },
    value: {
      textAlign: 'center',
      marginTop: 5,
      fontFamily: 'Rubik',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 15,
      color: '#171F46',
    },
    heading: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 30,
      fontWeight: 500,
      fontFamily: 'Rubik',
    },
    quantityRoot: {
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(215, 223, 233, 0.4)',
        borderRadius: '2px',
      },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(215, 223, 233, 0.4)',
        borderRadius: '2px',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(215, 223, 233, 0.4)',
        borderRadius: '2px',
      },
    },
    rightSubHeading: {
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.subtitle2.fontSize,
      fontWeight: plTheme.typography.h2.fontWeight,
      lineHeight: plTheme.typography.subtitle1.lineHeight,
      fontStyle: plTheme.typography.h3.fontStyle,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    dropDown: {
      height: 44,
    },
    selectRoot: {
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    buttonFont: {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: 14,
      textTransform: 'none',
      height: 40,
      width: 154,
    },
    dialog: {
      position: 'absolute',
      // width: 700,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '625px',
      height: 605,
      // backgroundColor: 'rgba(246, 246, 246, 1)',
    },
  }));
  const classes = useStyles();

  function saveName({ name, value, previousValue }: onSaveProps) {}

  const getUserSettings = async () => {
    setLoader(true);
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getUserSetting`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
        }),
      },
    );
    const jsonData = await fetchResponse.json();
    if (jsonData != null) {
      setFullName(jsonData.first_name.trim() + ' ' + jsonData.last_name.trim());
      setJobTitle(jsonData.designation.trim());
      // setDepartment(jsonData.department);
      setEmail(jsonData.email.trim());
      setNotificationValue(jsonData.notification);
      setCalendarValue(jsonData.calendar);
      setTimelineValue(jsonData.timeline);
      setOverview(jsonData.overview);
      setLeaderboard(jsonData.leaderboard);
      setReports(jsonData.reports);
      setPeople(jsonData.people);
      setCustomer(jsonData.customer);
    }
    setLoader(false);
  };

  const saveUserSettings = async () => {
    setLoader(true);
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/updateUserSetting`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          fullName: fullName,
          jobTitle: jobTitle,
          department: department,
          email: email,
          phoneNo: phoneNo,
          notification: notification,
          calendar: calendar,
          timeline: timeline,
          overview: overview,
          leaderboard: leaderboard,
          reports: reports,
          people: people,
          customer: customer,
        }),
      },
    );
    // const jsonData = await fetchResponse.json();
    setLoader(false);
  };

  const setDefaultSalesOutcomeScale = async () => {
    setLoader(true);
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/setDefaultSalesOutcomeScale`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    setLoader(false);
  };

  const setOverviewChange = (e: any) => {
    setOverview(e.target.checked);
  };

  const setLeaderboardChange = (e: any) => {
    setLeaderboard(e.target.checked);
  };

  const setPeopleChange = (e: any) => {
    setPeople(e.target.checked);
  };

  const setReportsChange = (e: any) => {
    setReports(e.target.checked);
  };

  const setCustomerChange = (e: any) => {
    setCustomer(e.target.checked);
  };

  const setNotifications = (e: any) => {
    setNotificationValue(e.target.value);
  };

  const setTimeline = (e: any) => {
    setTimelineValue(e.target.value);
  };

  const setCalendar = (e: any) => {
    setCalendarValue(e.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    setFn: (arg0: any) => void,
  ) => {
    setFn(e.target.value);
  };

  useEffect(() => {
    void getUserSettings();
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Grid>
        <Grid container direction="column" className={classes.root}>
          <CssBaseline />
          <Header
            avatar={picture}
            title="peoplelens.ai"
            persona={persona}
            designation={designation}
          />
          <Grid item className={classes.hideMargin}>
            <Grid container direction="row">
              <Grid
                item
                className={`${classes.reduceMargin} ${classes.contentData}`}
              >
                <Grid
                  container
                  direction="column"
                  spacing={6}
                  className={`${classes.contentAlignment}`}
                >
                  <Grid item className={`${classes.hideWhenPrint}`}>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="h1">Settings</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      boxSizing: 'border-box',
                      borderRadius: '5px',
                      boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
                      width: '1650px',
                      margin: '10mm auto',
                    }}
                  >
                    <Grid
                      style={{
                        height: '600px',
                        background: 'rgba(215, 223, 233, 0.4)',
                        width: '35%',
                        borderLeft: '1px solid rgba(215, 223, 233, 0.4)',
                        borderRadius: '10px 0px 0px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Grid
                        style={{
                          margin: '10px',
                          marginBottom: 24,
                          textAlign: 'center',
                        }}
                      >
                        <Avatar
                          style={{
                            fontSize: '110px',
                            width: 168,
                            height: 160,
                            marginLeft: 194,
                            marginTop: 24,
                          }}
                          src={persona == 'LEADER' ? avatar : Rep}
                          // children={fullName.charAt(0)}
                        />
                      </Grid>
                      <Grid
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}
                      >
                        <Grid style={{ display: 'flex', width: '55%' }}>
                          <p
                            className={`${classes.text}`}
                            style={{ width: '35%', textAlign: 'left' }}
                          >
                            Full Name
                          </p>
                          <EditText
                            name="fullName"
                            value={fullName}
                            onChange={(e) => handleChange(e, setFullName)}
                            onSave={saveName}
                            editButtonProps={{
                              style: {
                                marginLeft: '5px',
                                width: 16,
                                background: 'rgb(234 237 241 / 0%)',
                              },
                            }}
                            showEditButton
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}
                      >
                        <Grid style={{ display: 'flex', width: '55%' }}>
                          <p
                            className={`${classes.text}`}
                            style={{ width: '35%', textAlign: 'left' }}
                          >
                            Job Title
                          </p>
                          <EditText
                            name="fullName"
                            value={jobTitle}
                            onChange={(e) => handleChange(e, setJobTitle)}
                            onSave={saveName}
                            editButtonProps={{
                              style: {
                                marginLeft: '5px',
                                width: 16,
                                background: 'rgb(234 237 241 / 0%)',
                              },
                            }}
                            showEditButton
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}
                      >
                        <Grid style={{ display: 'flex', width: '55%' }}>
                          <p
                            className={`${classes.text}`}
                            style={{ width: '35%', textAlign: 'left' }}
                          >
                            Department
                          </p>
                          <EditText
                            name="fullName"
                            value={department}
                            onChange={(e) => handleChange(e, setDepartment)}
                            onSave={saveName}
                            editButtonProps={{
                              style: {
                                marginLeft: '5px',
                                width: 16,
                                background: 'rgb(234 237 241 / 0%)',
                              },
                            }}
                            showEditButton
                          />
                        </Grid>
                      </Grid>
                      <p
                        style={{
                          fontFamily: 'Rubik',
                          fontWeight: 500,
                          fontSize: 24,
                          color: '#171F46',
                          // textAlign: 'center',
                          marginLeft: 128,
                        }}
                      >
                        Contact Info
                      </p>
                      <Grid
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}
                      >
                        <Grid style={{ display: 'flex', width: '55%' }}>
                          <p
                            className={`${classes.text}`}
                            style={{ width: '35%', textAlign: 'left' }}
                          >
                            Email
                          </p>
                          <p
                            style={{
                              textAlign: 'left',
                              width: '51%',
                              marginTop: 7,
                              marginLeft: 20,
                              fontFamily: 'Rubik',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: 15,
                            }}
                          >
                            {email}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}
                      >
                        <Grid style={{ display: 'flex', width: '55%' }}>
                          <p
                            className={`${classes.text}`}
                            style={{ width: '35%', textAlign: 'left' }}
                          >
                            Phone No.
                          </p>
                          <EditText
                            name="phoneNo"
                            value={phoneNo}
                            onChange={(e) => handleChange(e, setPhoneNo)}
                            onSave={saveName}
                            editButtonProps={{
                              style: {
                                marginLeft: '5px',
                                width: 16,
                                background: 'rgb(234 237 241 / 0%)',
                              },
                            }}
                            showEditButton
                          />
                        </Grid>
                      </Grid>
                      {/* <Grid
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <Grid style={{ width: 250 }}>
                          <p className={`${classes.text}`}>Email</p>
                          <p style={{ textAlign: 'center' }}>{email}</p>
                        </Grid>
                        <Grid style={{ display: 'flex', width: '55%' }}>
                          <p
                            className={`${classes.text}`}
                            style={{ width: '35%' }}
                          >
                            Phone No.
                          </p>
                          <EditText
                            name="fullName"
                            value={phoneNo}
                            onChange={(e) => handleChange(e, setPhoneNo)}
                            onSave={saveName}
                            editButtonProps={{
                              style: {
                                marginLeft: '5px',
                                width: 16,
                                background: 'rgb(234 237 241 / 0%)',
                              },
                            }}
                            showEditButton
                          />
                          <p className={`${classes.value}`}></p>
                        </Grid>
                      </Grid> */}
                    </Grid>
                    <Grid
                      style={{
                        height: '600px',
                        background: 'white',
                        width: '65%',
                        borderRight: '1px solid white',
                        borderRadius: '0px 10px 10px 0px',
                      }}
                    >
                      <Grid
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '85%',
                          margin: '50px auto',
                        }}
                      >
                        <Grid className={`${classes.heading}`}>
                          Preferences
                        </Grid>
                        <Grid
                          className={`${classes.heading}`}
                          style={{ width: 332 }}
                        >
                          Permissions -{' '}
                          {persona == 'LEADER' ? 'Manager' : 'Rep'}
                        </Grid>
                      </Grid>
                      <Grid
                        style={{
                          height: 300,
                          width: 780,
                          marginLeft: 65,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Grid
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: 40,
                            alignItems: 'center',
                            marginBottom: 40,
                            justifyContent: 'space-between',
                          }}
                        >
                          <Grid
                            style={{
                              fontFamily: 'Rubik',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: 16,
                              lineHeight: 40,
                              width: 150,
                            }}
                          >
                            Notifications
                          </Grid>
                          <Grid>
                            <FormControl
                              variant="outlined"
                              classes={{ root: classes.quantityRoot }}
                              style={{ width: 216.86, height: 39.93 }}
                            >
                              <Select
                                onChange={setNotifications}
                                value={notification}
                                className={`${classes.dropDown} ${classes.rightSubHeading}`}
                                disableUnderline={false}
                                inputProps={{
                                  classes: {
                                    icon: classes.icon,
                                    root: classes.selectRoot,
                                  },
                                }}
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                  },
                                  transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                  },
                                }}
                              >
                                <MenuItem
                                  className={classes.rightSubHeading}
                                  value={'Slack'}
                                  selected={true}
                                >
                                  Slack
                                </MenuItem>
                                <MenuItem
                                  className={classes.rightSubHeading}
                                  value={'Email'}
                                >
                                  Email
                                </MenuItem>
                                <MenuItem
                                  className={classes.rightSubHeading}
                                  value={'Text'}
                                >
                                  Text
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid>
                            <FormGroup>
                              <FormControlLabel
                                style={{ width: 160 }}
                                label="Overview"
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={overview}
                                    onChange={setOverviewChange}
                                  />
                                }
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                        <Grid
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: 40,
                            alignItems: 'center',
                            marginBottom: 40,
                            justifyContent: 'space-between',
                          }}
                        >
                          <Grid
                            style={{
                              fontFamily: 'Rubik',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: 16,
                              lineHeight: 40,
                              width: 150,
                            }}
                          >
                            Calendar
                          </Grid>
                          <Grid>
                            <FormControl
                              variant="outlined"
                              classes={{ root: classes.quantityRoot }}
                              style={{ width: 216.86, height: 39.93 }}
                            >
                              <Select
                                onChange={setCalendar}
                                value={calendar}
                                className={`${classes.dropDown} ${classes.rightSubHeading}`}
                                disableUnderline={false}
                                inputProps={{
                                  classes: {
                                    icon: classes.icon,
                                    root: classes.selectRoot,
                                  },
                                }}
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                  },
                                  transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                  },
                                  getContentAnchorEl: null,
                                }}
                              >
                                <MenuItem
                                  className={classes.rightSubHeading}
                                  value={'Google Calendar'}
                                  selected={true}
                                >
                                  Google Calendar
                                </MenuItem>
                                <MenuItem
                                  className={classes.rightSubHeading}
                                  value={'O365 - Calendar'}
                                >
                                  O365 - Calendar
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          {persona == 'LEADER' ? (
                            <Grid>
                              <FormGroup>
                                <FormControlLabel
                                  style={{ width: 160 }}
                                  label="Leaderboard"
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={leaderboard}
                                      onChange={setLeaderboardChange}
                                    />
                                  }
                                />
                              </FormGroup>
                            </Grid>
                          ) : (
                            <>
                              <Grid>
                                <FormGroup>
                                  <FormControlLabel
                                    style={{ width: 160 }}
                                    label="People"
                                    control={
                                      <Checkbox
                                        color="primary"
                                        checked={people}
                                        onChange={setPeopleChange}
                                      />
                                    }
                                  />
                                </FormGroup>
                              </Grid>
                            </>
                          )}
                        </Grid>
                        <Grid
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: 40,
                            alignItems: 'center',
                            marginBottom: 40,
                            justifyContent: 'space-between',
                          }}
                        >
                          <Grid
                            style={{
                              fontFamily: 'Rubik',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: 16,
                              lineHeight: 40,
                              width: 150,
                            }}
                          >
                            Timeline
                          </Grid>
                          <Grid>
                            <FormControl
                              variant="outlined"
                              classes={{ root: classes.quantityRoot }}
                              style={{ width: 216.86, height: 39.93 }}
                            >
                              <Select
                                onChange={setTimeline}
                                value={timeline}
                                className={`${classes.dropDown} ${classes.rightSubHeading}`}
                                disableUnderline={false}
                                inputProps={{
                                  classes: {
                                    icon: classes.icon,
                                    root: classes.selectRoot,
                                  },
                                }}
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                  },
                                  transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                  },
                                  getContentAnchorEl: null,
                                }}
                              >
                                <MenuItem
                                  className={classes.rightSubHeading}
                                  value={'Current - QTD'}
                                  selected={true}
                                >
                                  Current - QTD
                                </MenuItem>
                                <MenuItem
                                  className={classes.rightSubHeading}
                                  value={'Historical - Last Completed Qtr'}
                                >
                                  Historical - Last Completed Qtr
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          {persona == 'LEADER' ? (
                            <Grid>
                              <FormGroup>
                                <FormControlLabel
                                  style={{ width: 160 }}
                                  label="Reports"
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={reports}
                                      onChange={setReportsChange}
                                    />
                                  }
                                />
                              </FormGroup>
                            </Grid>
                          ) : (
                            <Grid>
                              <FormGroup>
                                <FormControlLabel
                                  style={{ width: 160 }}
                                  label="Customer"
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={customer}
                                      onChange={setCustomerChange}
                                    />
                                  }
                                />
                              </FormGroup>
                            </Grid>
                          )}
                        </Grid>
                        {persona === 'LEADER' ? (
                          <Grid
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              height: 40,
                              alignItems: 'center',
                              marginBottom: 40,
                              justifyContent: 'space-between',
                            }}
                          >
                            <Grid
                              style={{
                                fontFamily: 'Rubik',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: 16,
                                // lineHeight: 40,
                                width: 145,
                              }}
                            >
                              {'Report: Scale'}
                            </Grid>
                            <Grid>
                              <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                style={{
                                  width: 108,
                                  height: 27,
                                  fontSize: 12,
                                  fontFamily: 'Rubik',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  background: '#FFFFFF',
                                  border: '1px solid rgba(215, 223, 233, 0.4)',
                                  borderRadius: 4,
                                  color: 'Black',
                                  filter:
                                    'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                                }}
                                classes={{
                                  containedSizeLarge: classes.buttonFont,
                                }}
                                onClick={() => setDefaultSalesOutcomeScale()}
                              >
                                {_t_('Set Default')}
                              </Button>
                              <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                style={{
                                  width: 106,
                                  height: 27,
                                  fontSize: 12,
                                  fontFamily: 'Rubik',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  marginLeft: 10,
                                  filter:
                                    'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                                }}
                                classes={{
                                  containedSizeLarge: classes.buttonFont,
                                }}
                                onClick={() => handleClickOpen()}
                              >
                                {_t_('Configure')}
                              </Button>
                            </Grid>
                            <Grid>
                              <FormGroup style={{ visibility: 'hidden' }}>
                                <FormControlLabel
                                  style={{ width: 150 }}
                                  label=""
                                  control={<Checkbox color="primary" />}
                                />
                              </FormGroup>
                            </Grid>
                          </Grid>
                        ) : (
                          <></>
                        )}

                        <Grid
                          item
                          style={{
                            margin: 'auto',
                            marginTop: persona === 'LEADER' ? 50 : 145,
                            marginRight: 210,
                          }}
                        >
                          <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            style={{
                              width: 249,
                              height: 46,
                              fontSize: 20,
                            }}
                            classes={{ containedSizeLarge: classes.buttonFont }}
                            onClick={() => saveUserSettings()}
                          >
                            {_t_('Save Changes')}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={`${classes.hideWhenPrint}`}>
                    <Sidebar />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
        <DialogContent
          style={{
            paddingTop: 0,
            overflow: 'hidden',
          }}
        >
          <OutcomeScales onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsPage;
