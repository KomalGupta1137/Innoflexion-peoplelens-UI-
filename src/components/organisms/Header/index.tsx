/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  AppBar,
  Avatar,
  Badge,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import logo from '../../../assets/HeaderIcons/PeopleLens_Logo.svg';

import React from 'react';
import Icon from '../../atoms/Icon';
import help from '../../../assets/HeaderIcons/help.png';
import SignOutIcon from '../../../assets/HeaderIcons/Signout.png';
import SettingsIcon from '../../../assets/HeaderIcons/SettingsIcon.png';
import NotificationIcon from '../../../assets/NotificationIcon.png';
import { COLORS, plTheme } from '../../../plTheme';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import NotificationsOffOutlinedIcon from '@material-ui/icons/NotificationsOffOutlined';
import jwtDecode from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { _t_ } from '../../../utils/translation/translation';
import { Card, CardContent, Popup } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import '../Header/styles.css';
import ReactGA from 'react-ga';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const useStyles = makeStyles((theme) => ({
  '@page': {
    size: '8.5in 11in',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: COLORS.GAMMA_WHITE,
    height: '72px',
    justifyContent: 'center',
    boxShadow: 'none',
    borderBottom: '0.1px solid ' + COLORS.ALPHA_BACKGROUND_COLOR,
  },
  headerLeft: {
    paddingLeft: theme.spacing(10),
  },
  typography: {
    paddingTop: theme.spacing(2),
    fontWeight: 500,
  },
  logoDiv: {
    marginLeft: '-10px',
  },
  headerRight: {
    marginRight: '30px',
  },
  popOver: {
    borderRadius: 5,
    width: '400px',
    height: '100px',
    margin: '10px 10px 10px 10px',
  },
  logoutButton: {
    borderRadius: 5,
    backgroundColor: 'transparent',
    padding: '18px 36px',
    fontSize: '18px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
    },
  },
  logoutLink: {
    color: 'black',
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
  nudges: {
    backgroundColor: 'white',
    border: '1px solid #171F46',

    color: 'black',
    fontFamily: plTheme.typography.subtitle1.fontFamily,
    fontSize: 13,
    fontWeight: 400,
    width: '112',
    height: 29,
    marginRight: '0.3rem',
  },
  profileMenu: {
    padding: '0px',
    border: '5px solid #000',
  },
  profileMenuItem: {
    padding: '0px 0px 0px 12px',
  },
  profile: {
    marginTop: '-8px',
    padding: '20px',
    background: 'rgba(248, 250, 251, 1)',
  },
  avatar: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '26px',
    textAlign: 'left',
  },
  jobTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '21px',
    textAlign: 'left',
    color: '#171F46',
    mixBlendMode: 'normal',
    opacity: 0.6,
  },
  menuIcon: {
    padding: '12px 18px',
  },
  menuItem: {
    fontFamily: 'Rubik',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    textAlign: 'left',
    padding: '12px 15px',
  },
  wrapper: {
    display: 'grid',
    gridTemplateRows: '2fr 1fr',
    width: '220px',
  },
  hideWhenPrint: {},
  [`@media print`]: {
    hideWhenPrint: {
      display: 'none',
    },
  },
  large: {
    height: '40px',
    width: '25px',
  },
}));

const token = localStorage.getItem('accessToken');
const decodedToken: any = token && jwtDecode(token);
const firstName = decodedToken.user.firstName;
const lastName = decodedToken.user.lastName;
const tenantId = decodedToken.tenantId;
const userId = decodedToken.user.userId;
localStorage.setItem('tenantId', tenantId);
localStorage.setItem('userId', userId);
const triggerNotificationClickEvent = () => {
  ReactGA.event({
    category: 'Rep Lens',
    action: `Rep - Notification views`,
  });
};
export interface HeaderProps {
  avatar: string;
  title?: string;
  persona: string | null;
  designation: string | null;
}

const Header: React.FC<HeaderProps> = ({
  avatar,
  title,
  persona,
  designation,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<any>([]);
  const classes = useStyles();
  useEffect(() => {
    void getNotifications();
  }, [title]);

  const actionMap = new Map();
  actionMap.set('default', 'to focus your nudges');
  actionMap.set(
    'Sales Activities',
    'to focus on cadence with your "Activities"',
  );
  actionMap.set(
    'Meet with Customers',
    'to meet with customers and multi thread deals',
  );
  actionMap.set(
    'Meet with Product Teams',
    'to meet with Product Managers / Technical marketing Engineers',
  );
  actionMap.set(
    'Pipeline Discipline',
    'to focus on cadence with their "Pipeline"',
  );
  actionMap.set(
    'Follow Up Ratio',
    'to focus on their "Follow Up Ratio with Customers"',
  );
  actionMap.set(
    'Build "Strategic Skills"',
    'to build Strategy skills by Shadowing manager / Role plays',
  );
  actionMap.set(
    'Practice "Sales Techniques"',
    'to practice sales techniques with Role plays / Shadowing',
  );
  actionMap.set(
    'Practice "Communication" with Manager',
    'to practice Communication with Manager / Role plays',
  );
  actionMap.set(
    '"Technical Skills" - Course',
    'to take the "Technical Skills - Advanced" course',
  );

  const getAction = (action: string) =>
    actionMap.get(action) ?? actionMap.get('default');

  const getNotifications = async () => {
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getActiveNotifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          tenantId: localStorage.getItem('tenantId'),
        }),
      },
    );
    const jsonData = await fetchResponse.json();
    console.log(jsonData);
    jsonData.forEach((element: any) => {
      element.actionCompleteDate = new Date(
        element.actionCompleteDate,
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      // For demo sake
      element.actionCompleteDate = element.actionCompleteDate.replace(
        '2023',
        '2021',
      );
    });
    setNotifications && setNotifications(jsonData);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(true);
  };

  const navigate = () => {
    console.log(window.location.href);
    if (
      window.location.href.endsWith('/dashboard') ||
      window.location.href.endsWith('/myteam')
    ) {
      return;
    }
    history.pushState({}, 'null', '/dashboard/myteam');
    // history.back();
    history.go();
  };

  return (
    <AppBar
      position="fixed"
      className={`${classes.hideWhenPrint} ${classes.appBar}`}
      color="transparent"
    >
      <Toolbar disableGutters>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={5} className={classes.headerLeft}>
              <Grid item className={classes.logoDiv}>
                <CardMedia
                  style={{ height: 33, width: 160, cursor: 'pointer' }}
                  title={title}
                  image={logo}
                  onClick={navigate}
                />
                {/* <Icon
                  imageSrc={logo}
                  title=""
                  imageSize="large"
                  height={33}
                  width={160}
                /> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item className={classes.headerRight}>
                {' '}
                <Popup
                  style={{
                    height: notifications.length == 0 ? 64 : 350,
                    width: 530,
                    padding: 0,
                  }}
                  on="click"
                  // open={isOpen}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  pinned
                  hideOnScroll
                  clo
                  position="bottom right"
                  trigger={
                    <IconButton
                      onClick={() => {
                        triggerNotificationClickEvent();
                      }}
                    >
                      <Badge
                        badgeContent={notifications.length}
                        color="secondary"
                      >
                        <CardMedia
                          style={{ height: 23, width: 23, marginTop: 2 }}
                          image={NotificationIcon}
                        />
                        {/* <NotificationsOutlinedIcon
                          style={{ fontSize: '2rem' }}
                        /> */}
                      </Badge>
                    </IconButton>
                  }
                >
                  {notifications && notifications.length != 0 ? (
                    <div
                      className="ui card"
                      style={{ height: 350, width: 530 }}
                    >
                      <div
                        className="content"
                        style={{
                          paddingLeft: 20,
                          paddingTop: 0,
                          paddingBottom: 0,
                          height: 64,
                        }}
                      >
                        <div
                          className="header"
                          style={{
                            transform: 'translateY(120%)',
                            fontFamily: 'Rubik',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: 18,
                          }}
                        >
                          Notifications ({notifications.length})
                        </div>
                      </div>
                      <div
                        className="content"
                        style={{
                          width: 529,
                          height: 214,
                          paddingTop: 0,
                          paddingLeft: 0,
                        }}
                      >
                        <div className="ui small feed">
                          <div className="event">
                            <div className="content">
                              <div
                                className="summary"
                                style={{
                                  font: 'Rubik',
                                  fontWeight: 300,
                                  fontSize: 14,
                                }}
                              >
                                <Card
                                  style={{
                                    width: 529,
                                    height: 214,
                                    display: 'flex',
                                    borderRadius: 0,
                                  }}
                                >
                                  <CardContent style={{ paddingBottom: 16 }}>
                                    <span
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Avatar
                                        src={''}
                                        className={classes.avatar}
                                        alt={'avatar'}
                                        children={
                                          notifications[0] &&
                                          notifications[0].managerName.charAt(0)
                                        }
                                      />
                                      <span className={classes.wrapper}>
                                        <Typography
                                          style={{
                                            fontFamily: 'Rubik',
                                            fontSize: 14,
                                            padding: 20,
                                            paddingTop: 10,
                                            fontWeight: 300,
                                            height: 60,
                                            width: 470,
                                            lineHeight: '24px',
                                            marginBottom: 0,
                                          }}
                                        >
                                          {notifications[0] &&
                                            notifications[0].managerName}{' '}
                                          requested you{' '}
                                          {getAction(notifications[0].action)}{' '}
                                          and complete by{' '}
                                          {notifications[0] &&
                                            notifications[0].actionCompleteDate}
                                          .
                                        </Typography>

                                        <Typography
                                          style={{
                                            fontFamily: 'Rubik',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            fontSize: 12,
                                            paddingLeft: '20px',
                                            color: '#B5B7C4',
                                          }}
                                        >
                                          {notifications[0] &&
                                            new Date(
                                              notifications[0].createdDate.replace(
                                                '2023',
                                                '2021',
                                              ),
                                            ).toDateString()}
                                        </Typography>
                                      </span>
                                    </span>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="content"
                        style={{ height: 64, textAlign: 'center' }}
                      >
                        {notifications && notifications.length == 1 ? (
                          <div
                            style={{
                              fontFamily: 'Rubik',
                              fontWeight: 500,
                              fontSize: 16,
                              lineHeight: '34px',
                            }}
                          >
                            No more notifications
                          </div>
                        ) : (
                          <a
                            style={{
                              fontFamily: 'Rubik',
                              fontWeight: 500,
                              fontSize: 16,
                              lineHeight: '34px',
                              color: '#366FF5',
                            }}
                            onClick={() => {
                              scroll({ behavior: 'smooth', top: 700 });
                              setIsOpen(false);
                            }}
                          >
                            View all notifications
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="ui card"
                      style={{ height: 300, width: 530 }}
                    >
                      <div
                        className="content"
                        style={{
                          paddingLeft: 20,
                          paddingTop: 0,
                          paddingBottom: 0,
                          height: 50,
                        }}
                      >
                        <div
                          className="header"
                          style={{
                            transform: 'translateY(75%)',
                            fontFamily: 'Rubik',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: 18,
                          }}
                        >
                          Notifications ({notifications.length})
                        </div>
                      </div>
                      <div
                        className="content"
                        style={{
                          width: 529,
                          height: 250,
                          padding: 0,
                          textAlign: 'center',
                        }}
                      >
                        <IconButton
                          style={{
                            padding: 0,
                            paddingTop: 30,
                            paddingBottom: 20,
                            pointerEvents: 'none',
                            cursor: 'default',
                          }}
                        >
                          <NotificationsOffOutlinedIcon
                            style={{ fontSize: '3.5em', color: '#0B69FF' }}
                          />
                        </IconButton>
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
                      <div
                        className="content"
                        style={{
                          width: 529,
                          height: 50,
                          padding: 0,
                          textAlign: 'center',
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontFamily: 'Rubik',
                              fontSize: 14,
                              fontWeight: 'bold',
                              transform: 'translateY(60%)',
                              color: '#0B69FF',
                            }}
                          >
                            Notification settings
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
                <HomeOutlinedIcon
                  fontSize="large"
                  style={{
                    // marginBottom: -11,
                    cursor: 'pointer',
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                  onClick={navigate}
                />
                <IconButton color="inherit">
                  <Icon imageSrc={help} imageSize="medium" title="Help" />
                </IconButton>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <IconButton color="inherit" {...bindTrigger(popupState)}>
                        <Avatar
                          src={avatar ? '' : ''}
                          alt={'avatar'}
                          style={{ fontSize: 19 }}
                          children={firstName.charAt(0) + lastName.charAt(0)}
                        />
                      </IconButton>
                      <Menu
                        {...bindMenu(popupState)}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <MenuItem
                          onClick={popupState.close}
                          className={`${classes.profile} ${classes.profileMenuItem}`}
                        >
                          <Avatar
                            src={avatar ? '' : ''}
                            alt={'avatar'}
                            style={{ fontSize: 19 }}
                            children={firstName.charAt(0) + lastName.charAt(0)}
                          />
                          <div style={{ paddingLeft: '24px' }}>
                            <div className={classes.avatar}>
                              {firstName + ' ' + lastName}
                            </div>
                            <div className={classes.jobTitle}>
                              {persona === 'AE'
                                ? _t_('Account Executive')
                                : persona === 'LEADER'
                                ? designation
                                : persona === 'SDR'
                                ? designation // @ts-ignore
                                : persona.charAt(0).toUpperCase() +
                                  // @ts-ignore
                                  persona.slice(1).toLowerCase()}
                            </div>
                          </div>
                        </MenuItem>
                        <MenuItem
                          onClick={popupState.close}
                          className={`${classes.profileMenuItem}`}
                        >
                          <NavLink
                            to="/settings"
                            className={classes.logoutLink}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <IconButton
                                color="inherit"
                                className={classes.menuIcon}
                              >
                                <Icon
                                  imageSrc={SettingsIcon}
                                  imageSize="medium"
                                  title=""
                                />
                              </IconButton>
                              <div className={classes.menuItem}>
                                {_t_('Settings')}
                              </div>
                            </div>
                          </NavLink>
                        </MenuItem>
                        <MenuItem
                          onClick={popupState.close}
                          className={`${classes.profileMenuItem}`}
                        >
                          <NavLink to="/logout" className={classes.logoutLink}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <IconButton
                                color="inherit"
                                className={classes.menuIcon}
                              >
                                <Icon
                                  imageSrc={SignOutIcon}
                                  imageSize="medium"
                                  title=""
                                />
                              </IconButton>
                              <div className={classes.menuItem}>
                                {_t_('Sign out')}
                              </div>
                            </div>
                          </NavLink>
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
