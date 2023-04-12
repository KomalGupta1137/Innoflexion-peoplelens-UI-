/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Icon,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Paper,
} from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import CustomizedTabs from '../../molecules/CustomisedTabs';
import Sidebar from '../Sidebar';
import Tick from '../../../assets/AdminPortal/Tick.png';

import CRM from '../../../assets/AdminPortal/CRM.jpg';
import SalesEngagement from '../../../assets/AdminPortal/SalesEngagement.jpg';
import SalesEnablement from '../../../assets/AdminPortal/SalesEnablement.jpg';
import SalesAnalytics from '../../../assets/AdminPortal/SalesAnalytics.jpg';
import HRIS from '../../../assets/AdminPortal/HRIS.jpg';
import LearningManagement from '../../../assets/AdminPortal/LearningManagement.jpg';
import ProductiveSuite from '../../../assets/AdminPortal/ProductiveSuite.jpg';
import OKR from '../../../assets/AdminPortal/OKR.jpg';
import Others from '../../../assets/AdminPortal/Others.jpg';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import '../AdminDashboard/styles.css';
import dayjs, { Dayjs } from 'dayjs';
import ArrowBackButton from '@material-ui/icons/ArrowBack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonGroup } from 'semantic-ui-react';

ReactGA.pageview(window.location.pathname);

const useStyles = makeStyles(() => ({
  contentAlignment: {
    padding: '2%',
    backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
    width: 'calc(100% + 57px)',
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
  },
  tabAlignment: {
    paddingLeft: '1%',
  },
  titleDesc: {
    fontWeight: 300,
  },
  dialog: {
    position: 'absolute',
    width: 975,
    height: 470,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFFFFF',
    border: '1px solid #D7DFE9',
    boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
    borderRadius: 4,
  },
  dialog1: {
    position: 'absolute',
    width: 975,
    height: 362,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFFFFF',
    border: '1px solid #D7DFE9',
    boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
    borderRadius: 4,
  },
  mainTitle: {
    ' font-family': 'Rubik',
    'font-style': 'normal',
    'font-weight': '500',
    'font-size': '24px',
    'line-height': '32px',
    flex: 'auto',
    textAlign: 'center',
  },
  subTitle: {
    // width: '509px',
    height: '21px',
    'font-family': 'Rubik',
    'font-style': 'normal',
    'font-weight': '300',
    'font-size': '14px',
    'line-height': '21px',
    'text-align': 'center',
    color: '#171F46',
    flex: 'none',
    order: 1,
    'align-self': 'stretch',
    'flex-grow': '0',
  },
  root1: {
    '& .MuiLinearProgress-colorPrimary': {
      'background-color': 'rgb(182, 188, 226)',
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#0B69FF',
    },
  },
  page1: {
    // width: '975px',
    // height: '383px',
    // display: 'flex',
    // 'flex-direction': 'column',
    // 'align-items': 'center',
    // padding: '0px',
    // flex: 'none',
    // 'box-sizing': 'border-box',
    // margin: '10mm auto',
    // boxSizing: 'border-box',
    // border: '1px #D3D3D3 solid',
    // borderRadius: '5px',
    // background: 'white',
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    // pageBreakAfter: 'always',
  },
  label: {
    'font-family': 'Rubik',
    'font-style': 'normal',
    'font-weight': 500,
    'font-size': 16,
  },
  select: {
    width: '95%',
    height: 40,
    background: '#FFFFFF',
    border: '1px solid #D7DFE9',
    boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
    marginTop: 10,
    borderRadius: 4,
    padding: 7,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
  },
  selectValue: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
  },
  continueButton: {
    width: 157,
    height: 48,
    background: '#0B69FF',
    textTransform: 'none',
    'font-family': 'Rubik',
    'font-style': 'normal',
    'font-weight': 400,
    'font-size': '18px',
    'line-height': '24px',
  },
  mainTitle1: {
    ' font-family': 'Rubik',
    'font-style': 'normal',
    'font-weight': '500',
    'font-size': '24px',
    'line-height': '32px',
    flex: 'auto',
    textAlign: 'center',
    marginTop: '15%',

  }
}));

export const dates = [
  {
    startDate: '2020-01-01T00:00:00.000Z',
    endDate: '2020-12-31T23:59:59.999Z',
  },
  {
    startDate: '2020-01-01T00:00:00.000Z',
    endDate: '2020-03-31T23:59:59.999Z',
  },
  {
    startDate: '2020-04-01T00:00:00.000Z',
    endDate: '2020-06-30T23:59:59.999Z',
  },
  {
    startDate: '2020-07-01T00:00:00.000Z',
    endDate: '2020-09-30T23:59:59.999Z',
  },
  {
    startDate: '2020-10-01T00:00:00.000Z',
    endDate: '2020-12-31T23:59:59.999Z',
  },
  {
    startDate: '2020-01-01T00:00:00.000Z',
    endDate: '2020-06-30T23:59:59.999Z',
  },
  {
    startDate: '2020-07-01T00:00:00.000Z',
    endDate: '2020-12-31T23:59:59.999Z',
  },
];

const tabNames = ['DATA', 'USERS'];

const AdminDashboard: React.FC = () => {
  ReactGA.event({
    category: 'Admin Lens',
    action: 'Admin Lens',
  });
  const classes = useStyles();
  const token = localStorage.getItem('accessToken');
  const decodedToken: any = token && jwtDecode(token);
  const firstName = decodedToken.user.firstName;
  ReactGA.event({
    category: 'Admin Login',
    action: `Admin Login - ${firstName}`,
  });

  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false)
  const [openUserList, setOpenUserList] = useState(false)
  const [openEditUser, setOpenEditUser] = useState(false)
  const [saving, setSaving] = useState(false);
  const [progressValue, setProgressValue] = useState(50);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
  const [selectValue, setSelectValue] = useState('');
  const [reportName, setReportName] = useState('');
  const [title, setTitle] = useState('');
  const [system, setSystem] = useState('');
  const [file, setFile] = useState<any>('');
  const [userFile, setUserFile] = useState<any>('')
  const [userName, setUserName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [user, setUser] = useState<any>('');
  const [role, setRole] = useState<any>('');
  const [permission, setPermission] = useState<any>('');
  const [crmUploaded, setCRMUploaded] = useState<boolean>(false);
  const [SETUploaded, setSETUploaded] = useState<boolean>(false);
  const [SEMUploaded, setSEMUploaded] = useState<boolean>(false);
  const [SATUploaded, setSATUploaded] = useState<boolean>(false);
  const [HRISUploaded, setHRISUploaded] = useState<boolean>(false);
  const [LMSUploaded, setLMSUploaded] = useState<boolean>(false);
  const [PSUploaded, setPSUploaded] = useState<boolean>(false);
  const [OKRUploaded, setOKRUploaded] = useState<boolean>(false);
  const [otherUploaded, setOtherUploaded] = useState<boolean>(false);
  const [uploadedSystems, setUploadedSystems] = useState<[]>([]);
  const [activeTab, setActiveTab] = React.useState(0);

  function handleFileChange(event: any) {
    setFile(event.target.files[0]);
  }

  function handleUserFileChange(event:any) {
    setUserFile(event.target.files[0])
  }

  function imageClick(title: string, system: string): void {
    setProgressValue(50);
    setSelectValue('');
    setReportName('');
    setTitle(title);
    setSystem(system);
    setStartDate(null);
    setEndDate(null);
    setOpen(true);
    setSaving(false);
  }

  function usersListButtonClick(): void {
    setOpenUserList(true);
    setSaving(false);
  }

  function usersButtonClick(): void {
    setOpenUser(true);
    setSaving(false)
  }

  function editButtonClick(): void {
    setOpenEditUser(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserListClose = () => {
    setOpenUserList(false)
  }

  const handleUserClose = () => {
    setOpenUser(false)
  }

  const handleEditClose = () => {
    setOpenEditUser(false)
  }

  function handleContinueClick() {
    setProgressValue(100);
  }

  const handleBackClick = (value: number) => {
    setProgressValue && setProgressValue(value);
  };

  const handleChangeStartDate = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };

  const handleChangeEndDate = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  const handleChangeSelect = (e: any) => {
    console.log(e.target.value);
    setSelectValue(e.target.value);
  };

  const handleReportNameChange = (e: any) => {
    setReportName(e.target.value);
  };

  const handleUserChange = (e: any)  => {
    setUser(e.target.value)
  }

  const handleRoleChange = (e: any) => {
    setRole(e.target.value)
  }

  const handlePermissionChange = (e: any) => {
    setPermission(e.target.value)
  }

  async function getUploadedSystems() {
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getUploadedSystems`,
      {
        method: 'GET',
      },
    );
    const jsonData = await fetchResponse.json();
    if (jsonData.length > 0) {
      setUploadedSystems && setUploadedSystems(jsonData);
      jsonData.forEach((sys: any) => {
        switch (sys.system) {
          case 'CRM':
            setCRMUploaded(true);
            break;
          case 'Sales Engagement Technology':
            setSETUploaded(true);
            break;
          case 'Sales Enablement Technology':
            setSEMUploaded(true);
            break;
          case 'Sales Analytics Technology':
            setSATUploaded(true);
            break;
          case 'HRIS system':
            setHRISUploaded(true);
            break;
          case 'Learning Management System':
            setLMSUploaded(true);
            break;
          case 'Productivity Suite (Calendar Info)':
            setPSUploaded(true);
            break;
          case 'OKR':
            setOKRUploaded(true);
            break;
          case 'Other systems':
            setOtherUploaded(true);
            break;
        }
      });
    }
  }

  useEffect(() => {
    void getUploadedSystems();
  }, []);

  async function handleSaveClick() {
    setSaving(true);
    const _startDate = dayjs(startDate).toISOString();
    const _endDate = dayjs(endDate).toISOString();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('system', system);
    formData.append('sub_system', selectValue);
    formData.append('reportName', reportName);
    formData.append('startDate', _startDate);
    formData.append('endDate', _endDate);

    await fetch(`${process.env.REACT_APP_API_BASE || ''}/api/uploadFile`, {
      method: 'POST',
      body: formData,
    }).then((res) => {
      console.log(res.status);
      if (res.status == 200) {
        setSaving(false);
        setOpen(false);
        switch (system) {
          case 'CRM':
            setCRMUploaded(true);
            break;
          case 'Sales Engagement Technology':
            setSETUploaded(true);
            break;
          case 'Sales Enablement Technology':
            setSEMUploaded(true);
            break;
          case 'Sales Analytics Technology':
            setSATUploaded(true);
            break;
          case 'HRIS system':
            setHRISUploaded(true);
            break;
          case 'Learning Management System':
            setLMSUploaded(true);
            break;
          case 'Productivity Suite (Calendar Info)':
            setPSUploaded(true);
            break;
          case 'OKR':
            setOKRUploaded(true);
            break;
          case 'Other systems':
            setOtherUploaded(true);
            break;
        }
      }
    });
  }

  const handleTabChange = (num: number) => {
    setActiveTab(num);
  }

  const tableData = [
    {
      "user": "Adam",
      "role": "Sales Op",
      "permissions": "Reps Lens",

    },
    {
      "user": "Bob",
      "role": "Sales Op",
      "permissions": "Reps Lens",

    },
    {
      "user": "Cathy",
      "role": "Sales Team Lead",
      "permissions": "Manager Lens",

    },
    {
      "user": "Derek",
      "role": "Sales Op",
      "permissions": "Reps Lens",

    },
    {
      "user": "Ethan",
      "role": "COD",
      "permissions": "Admin Lens",

    }

  ]

  const rolesData = ["Sales Op", "Sales Team Lead", "COD"]
  const permissionsData = ["Admin Lens", "Manager Lens", "Reps Lens"]

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={6}
        className={`${classes.contentAlignment}`}
      >
        <Grid item className={`${classes.hideWhenPrint}`}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h1">
                {firstName?.concat("'s lens")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={`${classes.hideWhenPrint}`}>
          <CustomizedTabs
            tabNames={tabNames}
            primary={true}
            activeTab={activeTab}
            tabName={tabNames[activeTab]}
            handleTabChange={handleTabChange}
          />
        </Grid>
        <Grid className={classes.tabAlignment}>
          {activeTab == 0 && <>
            <Grid item xs={8} style={{ marginTop: 10 }}>
              <Typography variant="h2" color="textPrimary">
                {_t_('Data Import')}
              </Typography>
              <Typography
                variant="h3"
                color="textPrimary"
                className={classes.titleDesc}
              >
                {_t_(
                  'Upload files from your systems/ spreadsheets to bring PeopleLens to life for your organization.',
                )}
              </Typography>
            </Grid>
            <Grid container direction="row">
              <Grid
                item
                style={{
                  width: '84%',
                  height: 230,
                  background: '#F6F6F6',
                  border: '1px solid #171F46',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: 8,
                  marginTop: 20,
                }}
              >
                <Grid
                  container
                  direction="row"
                  style={{
                    height: '100%',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                  }}
                >
                  <Grid
                    item
                    style={{
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 28,
                      transform: 'rotate(270deg)',
                      marginLeft: -40,
                      marginRight: -50,
                    }}
                  >
                    Customer
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={CRM}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() => imageClick('CRM TECHNOLOGY', 'CRM')}
                      />
                      <p>CRM TECHNOLOGY</p>
                    </Grid>
                    {crmUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={SalesEngagement}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() =>
                          imageClick(
                            'SALES ENGAGEMENT',
                            'Sales Engagement Technology',
                          )
                        }
                      />
                      <p
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        Sales Engagement
                      </p>
                    </Grid>
                    {SETUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={SalesEnablement}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() =>
                          imageClick(
                            'SALES ENABLEMENT',
                            'Sales Enablement Technology',
                          )
                        }
                      />
                      <p
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        Sales Enablement
                      </p>
                    </Grid>
                    {SEMUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={SalesAnalytics}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() =>
                          imageClick(
                            'SALES ANALYTICS',
                            'Sales Analytics Technology',
                          )
                        }
                      />
                      <p
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        Sales Analytics
                      </p>
                    </Grid>
                    {SATUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  width: '84%',
                  height: 230,
                  background: '#F6F6F6',
                  border: '1px solid #171F46',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: 8,
                  marginTop: 20,
                }}
              >
                <Grid
                  container
                  direction="row"
                  style={{ height: '100%', alignItems: 'center' }}
                >
                  <Grid
                    item
                    style={{
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 28,
                      transform: 'rotate(270deg)',
                      marginLeft: -20,
                      marginRight: -30,
                    }}
                  >
                    People
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={HRIS}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() => imageClick('HRIS', 'HRIS system')}
                      />
                      <p
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        HRIS
                      </p>
                    </Grid>
                    {HRISUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={LearningManagement}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() =>
                          imageClick(
                            'LEARNING MANAGEMENT',
                            'Learning Management System',
                          )
                        }
                      />
                      <p
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        Learning Management
                      </p>
                    </Grid>
                    {LMSUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  width: '84%',
                  height: 230,
                  background: '#F6F6F6',
                  border: '1px solid #171F46',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: 8,
                  marginTop: 20,
                }}
              >
                <Grid
                  container
                  direction="row"
                  style={{ height: '100%', alignItems: 'center' }}
                >
                  <Grid
                    item
                    style={{
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 28,
                      transform: 'rotate(270deg)',
                      marginLeft: 0,
                      marginRight: -10,
                    }}
                  >
                    Org
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={ProductiveSuite}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() =>
                          imageClick(
                            'PRODUCTIVE SUITE',
                            'Productivity Suite (Calendar Info)',
                          )
                        }
                      />
                      <p
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        Productive Suite
                      </p>
                    </Grid>
                    {PSUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={OKR}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() => imageClick('OKR', 'OKR')}
                      />
                      <p
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        OKR
                      </p>
                    </Grid>
                    {OKRUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  width: '84%',
                  height: 230,
                  background: '#F6F6F6',
                  border: '1px solid #171F46',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: 8,
                  marginTop: 20,
                }}
              >
                <Grid
                  container
                  direction="row"
                  style={{ height: '100%', alignItems: 'center' }}
                >
                  <Grid
                    item
                    style={{
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 28,
                      transform: 'rotate(270deg)',
                      marginLeft: -70,
                      marginRight: -80,
                    }}
                  >
                    Spreadsheets
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: 302,
                      height: 192,
                      background: '#FFFFFF',
                      border: '1px solid #D7DFE9',
                      boxShadow: '0px 4px 20px rgba(126, 133, 142, 0.12)',
                      borderRadius: 8,
                      margin: '0px 20px 0px 20px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Rubik',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#979797',
                    }}
                  >
                    <Grid
                      item
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: crmUploaded ? 30 : 0,
                      }}
                    >
                      <img
                        src={Others}
                        style={{
                          cursor: 'pointer',
                          marginTop: 25,
                        }}
                        onClick={() => imageClick('OTHERS', 'Other systems')}
                      />
                      <p
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        Others
                      </p>
                    </Grid>
                    {otherUploaded ? (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: 'baseline',
                            marginRight: 10,
                            marginTop: 10,
                          }}
                        >
                          <img src={Tick} />
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>}
          {activeTab == 1 && <>
            <Grid item lg={10}
              style={
                { marginTop: 10, display: "flex", justifyContent: "space-between" }
              }>
              <Grid container direction="row"
                style={
                  { display: "flex", justifyContent: "space-between", alignItems: "center" }
                }>
                <Grid item >
                  <Typography variant="h1">
                    User Management
                  </Typography>
                </Grid>
                <Grid item
                  style={
                    { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "20px", flex: 1 }
                  }>
                  <Button variant="contained" color='primary'
                    onClick={() => usersListButtonClick()}
                  >UPLOAD USER LIST</Button>
                  <Button variant="contained" color='primary' onClick={() => usersButtonClick()}>ADD USER</Button>
                </Grid>
                <Grid item lg={10} style={{ marginTop: '2%' }}>
                  <Typography
                    variant="h3"
                    color="textPrimary"
                    className={classes.titleDesc}
                  >
                    {_t_(
                      'Upload files from your systems with the Email IDs of your managers ,reps, sales, ops & enablement teams or add users individually to provide them with the access to their personalized lens',
                    )}
                  </Typography>
                </Grid>
                <Grid item style={{ width: "100%", marginTop: '3%' }}>
                  <Paper>
                    <TableContainer>
                      <Table sx={{ minWidth: 750 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell >Role</TableCell>
                            <TableCell >Permissions</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData.map((data) => (
                            <TableRow>
                              <TableCell >{data.user}</TableCell>
                              <TableCell >{data.role}</TableCell>
                              <TableCell >{data.permissions}</TableCell>
                              <TableCell> <div onClick={() => {
                                editButtonClick()
                                setUser(data.user)
                                setRole(data.role)
                                setPermission(data.permissions)
                              }}><EditIcon /></div></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </>}
        </Grid>
        <Grid item className={`${classes.hideWhenPrint}`}>
          <Sidebar />
        </Grid>
      </Grid>

      <Dialog
        classes={{
          paper: progressValue == 50 ? classes.dialog : classes.dialog1,
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
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <div hidden={false} className={`${classes.page1}`}>
            <Grid
              container
              direction="column"
              spacing={1}
              style={{
                height: '163px',
                background: 'rgba(215, 223, 233, 0.4)',
              }}
            >
              <Grid
                item
                style={{
                  padding: 20,
                  paddingBottom: 10,
                  paddingTop: 32,
                  alignSelf: 'center',
                  display: 'flex',
                  width: '100%',
                }}
              >
                {progressValue == 50 ? (
                  <>
                    <Typography className={`${classes.mainTitle}`}>
                      {title}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Icon
                      component={ArrowBackButton}
                      style={{ color: '#65789B', alignSelf: 'center' }}
                      onClick={() => {
                        handleBackClick(50);
                      }}
                    />
                    <Typography className={`${classes.mainTitle}`}>
                      {title}
                    </Typography>
                    <Icon />
                  </>
                )}
              </Grid>
              <Grid item style={{ alignSelf: 'center' }}>
                {progressValue == 50 ? (
                  <Typography className={`${classes.subTitle}`}>
                    {`Follow the steps to select your ${system} and the time-period for your dataset.`}
                  </Typography>
                ) : (
                  <Typography className={`${classes.subTitle}`}>
                    {_t_(
                      'Upload the CSV file you exported from the system of your choice',
                    )}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                style={{
                  alignSelf: 'center',
                  width: '116px',
                  height: '14px',
                  paddingTop: 25,
                }}
              >
                <Box style={{ width: '100%' }}>
                  <div className={`${classes.root1}`}>
                    <LinearProgress
                      variant="determinate"
                      value={progressValue}
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
            {progressValue == 50 ? (
              <>
                <Grid
                  container
                  style={{
                    justifyContent: 'space-between',
                    paddingTop: 32,
                    width: '85%',
                    margin: '0 auto',
                  }}
                >
                  <Grid
                    item
                    style={{
                      width: '50%',
                    }}
                  >
                    <Typography className={`${classes.label}`}>
                      {_t_(`Pick ${system}`)}
                    </Typography>
                    {system == 'CRM' ? (
                      <>
                        <Select
                          onChange={handleChangeSelect}
                          value={selectValue}
                          displayEmpty
                          className={classes.select}
                          disableUnderline
                          label="Select"
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
                          renderValue={(selected: any) => {
                            if (selected == '') {
                              return (
                                <em
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: 'rgba(23, 31, 70, 0.5)',
                                  }}
                                >
                                  Select
                                </em>
                              );
                            }

                            return selected;
                          }}
                        >
                          <MenuItem
                            className={classes.selectValue}
                            value={'Salesforce'}
                          >
                            Salesforce
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Dynamics 365'}
                          >
                            Dynamics 365
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Oracle CR'}
                          >
                            Oracle CR
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'SAP CRM'}
                          >
                            SAP CRM
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Hubspot'}
                          >
                            Hubspot
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Other'}
                          >
                            Other
                          </MenuItem>
                        </Select>
                      </>
                    ) : system == 'Sales Engagement Technology' ? (
                      <>
                        <Select
                          onChange={handleChangeSelect}
                          value={selectValue}
                          displayEmpty
                          className={classes.select}
                          disableUnderline
                          label="Select"
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
                          renderValue={(selected: any) => {
                            if (selected == '') {
                              return (
                                <em
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: 'rgba(23, 31, 70, 0.5)',
                                  }}
                                >
                                  Select
                                </em>
                              );
                            }

                            return selected;
                          }}
                        >
                          <MenuItem
                            className={classes.selectValue}
                            value={'Outreach'}
                          >
                            Outreach
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'SalesLoft'}
                          >
                            SalesLoft
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'SalesLoft'}
                          >
                            SalesLoft
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Other'}
                          >
                            Other
                          </MenuItem>
                        </Select>
                      </>
                    ) : system == 'Sales Enablement Technology' ? (
                      <>
                        <Select
                          onChange={handleChangeSelect}
                          value={selectValue}
                          displayEmpty
                          className={classes.select}
                          disableUnderline
                          label="Select"
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
                          renderValue={(selected: any) => {
                            if (selected == '') {
                              return (
                                <em
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: 'rgba(23, 31, 70, 0.5)',
                                  }}
                                >
                                  Select
                                </em>
                              );
                            }

                            return selected;
                          }}
                        >
                          <MenuItem
                            className={classes.selectValue}
                            value={'Highspot'}
                          >
                            Highspot
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Seismic'}
                          >
                            Seismic
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Mindtickle'}
                          >
                            Mindtickle
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Guru'}
                          >
                            Guru
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Saleshood'}
                          >
                            Saleshood
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Other'}
                          >
                            Other
                          </MenuItem>
                        </Select>
                      </>
                    ) : system == 'Sales Analytics Technology' ? (
                      <>
                        <Select
                          onChange={handleChangeSelect}
                          value={selectValue}
                          displayEmpty
                          className={classes.select}
                          disableUnderline
                          label="Select"
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
                          renderValue={(selected: any) => {
                            if (selected == '') {
                              return (
                                <em
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: 'rgba(23, 31, 70, 0.5)',
                                  }}
                                >
                                  Select
                                </em>
                              );
                            }

                            return selected;
                          }}
                        >
                          <MenuItem
                            className={classes.selectValue}
                            value={'Gong'}
                          >
                            Gong
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Clari'}
                          >
                            Clari
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'People.ai'}
                          >
                            People.ai
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'BoostUp'}
                          >
                            BoostUp
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Aviso'}
                          >
                            Aviso
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Other'}
                          >
                            Other
                          </MenuItem>
                        </Select>
                      </>
                    ) : system == 'HRIS system' ? (
                      <>
                        <Select
                          onChange={handleChangeSelect}
                          value={selectValue}
                          displayEmpty
                          className={classes.select}
                          disableUnderline
                          label="Select"
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
                          renderValue={(selected: any) => {
                            if (selected == '') {
                              return (
                                <em
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: 'rgba(23, 31, 70, 0.5)',
                                  }}
                                >
                                  Select
                                </em>
                              );
                            }

                            return selected;
                          }}
                        >
                          <MenuItem
                            className={classes.selectValue}
                            value={'Workday'}
                          >
                            Workday
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'SAP SuccessFactors'}
                          >
                            SAP SuccessFactors
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Oracle HCM'}
                          >
                            Oracle HCM
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'UKG'}
                          >
                            UKG
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'BambooHR'}
                          >
                            BambooHR
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Other'}
                          >
                            Other
                          </MenuItem>
                        </Select>
                      </>
                    ) : system == 'Learning Management System' ? (
                      <>
                        <Select
                          onChange={handleChangeSelect}
                          value={selectValue}
                          displayEmpty
                          className={classes.select}
                          disableUnderline
                          label="Select"
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
                          renderValue={(selected: any) => {
                            if (selected == '') {
                              return (
                                <em
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: 'rgba(23, 31, 70, 0.5)',
                                  }}
                                >
                                  Select
                                </em>
                              );
                            }

                            return selected;
                          }}
                        >
                          <MenuItem
                            className={classes.selectValue}
                            value={'Pluralsight'}
                          >
                            Pluralsight
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Workday'}
                          >
                            Workday
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Saba'}
                          >
                            Saba
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Other'}
                          >
                            Other
                          </MenuItem>
                        </Select>
                      </>
                    ) : system == 'Productivity Suite (Calendar Info)' ? (
                      <>
                        <Select
                          onChange={handleChangeSelect}
                          value={selectValue}
                          displayEmpty
                          className={classes.select}
                          disableUnderline
                          label="Select"
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
                          renderValue={(selected: any) => {
                            if (selected == '') {
                              return (
                                <em
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: 'rgba(23, 31, 70, 0.5)',
                                  }}
                                >
                                  Select
                                </em>
                              );
                            }

                            return selected;
                          }}
                        >
                          <MenuItem
                            className={classes.selectValue}
                            value={'G Suite'}
                          >
                            G Suite
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Microsoft 365'}
                          >
                            Microsoft 365
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Other'}
                          >
                            Other
                          </MenuItem>
                        </Select>
                      </>
                    ) : system == 'OKR' ? (
                      <>
                        <Select
                          onChange={handleChangeSelect}
                          value={selectValue}
                          displayEmpty
                          className={classes.select}
                          disableUnderline
                          label="Select"
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
                          renderValue={(selected: any) => {
                            if (selected == '') {
                              return (
                                <em
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: 'rgba(23, 31, 70, 0.5)',
                                  }}
                                >
                                  Select
                                </em>
                              );
                            }

                            return selected;
                          }}
                        >
                          <MenuItem
                            className={classes.selectValue}
                            value={'Lattice'}
                          >
                            Lattice
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'15Five'}
                          >
                            15Five
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'BetterWorks'}
                          >
                            BetterWorks
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'WorkRamp'}
                          >
                            WorkRamp
                          </MenuItem>
                          <MenuItem
                            className={classes.selectValue}
                            value={'Other'}
                          >
                            Other
                          </MenuItem>
                        </Select>
                      </>
                    ) : (
                      <>
                        <input
                          value={selectValue}
                          className={classes.select}
                          placeholder="System Name"
                          style={{
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                          onChange={handleChangeSelect}
                        ></input>
                      </>
                    )}
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: '50%',
                    }}
                  >
                    <Typography
                      className={`${classes.label}`}
                      style={{ marginBottom: 10 }}
                    >
                      {_t_('Pick Start Date')}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        // className={`${classes.label}`}
                        label=""
                        inputFormat="MM/DD/YYYY"
                        value={startDate}
                        onChange={handleChangeStartDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{
                    justifyContent: 'space-between',
                    paddingTop: 32,
                    width: '85%',
                    margin: '0 auto',
                    paddingBottom: 32,
                  }}
                >
                  <Grid
                    item
                    style={{
                      width: '50%',
                    }}
                  >
                    <Typography className={`${classes.label}`}>
                      {_t_('Report Name')}
                    </Typography>
                    <input
                      value={reportName}
                      className={classes.select}
                      placeholder="Report Name"
                      style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                      onChange={handleReportNameChange}
                    ></input>
                  </Grid>
                  <Grid
                    item
                    style={{
                      width: '50%',
                    }}
                  >
                    <Typography
                      className={`${classes.label}`}
                      style={{ marginBottom: 10 }}
                    >
                      {_t_('Pick End Date')}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label=""
                        inputFormat="MM/DD/YYYY"
                        value={endDate}
                        onChange={handleChangeEndDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      handleContinueClick();
                    }}
                    className={classes.continueButton}
                  >
                    Continue
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  container
                  style={{
                    justifyContent: 'center',
                    paddingTop: 32,
                    width: '85%',
                    margin: '0 auto',
                  }}
                >
                  <Grid
                    item
                    style={{
                      width: '50%',
                    }}
                  >
                    <Typography
                      className={`${classes.label}`}
                      style={{ textAlign: 'center' }}
                    >
                      {_t_('Upload File')}
                    </Typography>
                    <div
                      className="input-group"
                      style={{ margin: '20px 20px 20px auto', width: 370 }}
                    >
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="form-control"
                        id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                        title="&nbsp;"
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{
                    justifyContent: 'center',
                  }}
                >
                  {saving ? (
                    <>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={handleSaveClick}
                        className={classes.continueButton}
                      >
                        <CircularProgress />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={handleSaveClick}
                        className={classes.continueButton}
                      >
                        Save
                      </Button>
                    </>
                  )}
                </Grid>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUserList}
        onClose={handleUserListClose}
        fullWidth
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          overflow: 'hideen',
          alignContent: 'center',

        }}
      >
        <DialogContent
          style={{
            padding: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <div>
            <Grid
              container
              direction="column"
              spacing={1}
              style={{
                height: '167px',
                background: 'rgba(215, 223, 233, 0.4)',
              }}
            >
              <Grid
                item
                style={{
                  padding: 20,
                  paddingBottom: 10,
                  paddingTop: 32,
                  alignSelf: 'center',
                  display: 'flex',
                  width: '100%',
                }}>
                <Typography className={`${classes.mainTitle}`}>
                  {_t_('Upload User List')}
                </Typography>
              </Grid>
              <Grid item style={{ alignSelf: 'center' }}>
                <Typography className={`${classes.subTitle}`}>
                  Follow the steps to upload a user list
                </Typography>
              </Grid>
              <Grid
                item
                className={`${classes.mainTitle1}`}
              >
                <Typography
                  className={`${classes.label}`}
                >
                  {_t_('Upload File')}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                justifyContent: 'center',
                paddingTop: 32,
                width: '85%',
                margin: '0 auto',
              }}
            >
              <Grid
                item
                style={{
                  width: '50%',
                }}
              >
                <Typography
                  className={`${classes.label}`}
                  style={{ textAlign: 'center' }}
                >
                  {_t_('Upload File')}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                justifyContent: 'center',
                width: '100%',
                margin: '0 auto',
              }}
            >
              <Grid item
                style={{ width: '50%' }}
              >
                <div
                  className="input-group"
                  style={
                    { margin: '20px 20px 20px auto', width: 370 }
                  }
                >
                  <input
                    type="file"
                    onChange={handleUserFileChange}
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    title="&nbsp;"
                  />
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                justifyContent: 'center',
                marginBottom: '10%',
                marginLeft: '15%'
              }}
            >
              <Grid item
                style={{
                  width: '50%'
                }}
              >
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.continueButton}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUser}
        onClose={handleUserClose}
        fullWidth
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          overflow: 'hideen',
          alignContent: 'center',
        }}

      >
        <DialogContent
          style={{
            padding: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <div>
            <Grid
              container
              direction="column"
              spacing={1}
              style={{
                height: '163px',
                background: 'rgba(215, 223, 233, 0.4)',
              }}
            >
              <Grid
                item
                style={{
                  padding: 20,
                  paddingBottom: 10,
                  paddingTop: 32,
                  alignSelf: 'center',
                  display: 'flex',
                  width: '100%',
                }}>
                <Typography className={`${classes.mainTitle}`}>
                  {_t_('Add User')}
                </Typography>
              </Grid>
              <Grid item style={{ alignSelf: 'center' }}>
                <Typography className={`${classes.subTitle}`}>
                  Follow the steps to add a user
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                justifyContent: 'space-between',
                paddingTop: 32,
                width: '85%',
                margin: '0 auto',
                paddingBottom: 32,
              }}
            >
              <Grid
                item
                style={{
                  width: '50%',
                }}
              >
                <Typography className={`${classes.label}`}>
                  {_t_('User Name')}
                </Typography>
                <input
                  value={userName}
                  className={classes.select}
                  placeholder="User Name"
                  style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  onChange={handleReportNameChange}
                ></input>
              </Grid>
              <Grid
                item
                style={{
                  width: '50%',
                }}
              >
                <Typography className={`${classes.label}`}>
                  {_t_('Email')}
                </Typography>
                <input
                  value={email}
                  className={classes.select}
                  placeholder="Email"
                  style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  onChange={handleReportNameChange}
                ></input>
              </Grid>
              <Grid container style={{ justifyContent: "center", marginTop: '5%', marginBottom: '7%' }}>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.continueButton}
                >
                  Save
                </Button>

              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEditUser}
        onClose={handleEditClose}
        fullWidth
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          overflow: 'hideen',
          alignContent: 'center',
        }}
      >
        <DialogContent
          style={{
            padding: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <div>
            <Grid
              container
              direction="column"
              spacing={1}
              style={{
                height: '163px',
                background: 'rgba(215, 223, 233, 0.4)',
              }}
            >
              <Grid
                item
                style={{
                  padding: 20,
                  paddingBottom: 10,
                  paddingTop: 32,
                  alignSelf: 'center',
                  display: 'flex',
                  width: '100%',
                }}>
                <Typography className={`${classes.mainTitle}`}>
                  {_t_('Edit User')}
                </Typography>
              </Grid>
              <Grid 
              item
                style={{ alignSelf: 'center' }}>
                <Typography className={`${classes.subTitle}`}>
                  Update any details below
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                justifyContent: 'space-between',
                paddingTop: 32,
                width: '85%',
                margin: '0 auto',
                paddingBottom: 32,
              }}
            >
              <Grid
                item
                style={{
                  width: '50%',
                }}
              >
                <Typography className={`${classes.label}`}>
                  {_t_('User')}
                </Typography>
                <input
                  value={user}
                  className={classes.select}
                  placeholder="User"
                  style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  onChange={handleUserChange}
                ></input>
              </Grid>
              <Grid
                item
                style={{
                  width: '50%',
                }}
              >
                <Typography className={`${classes.label}`}>
                  {_t_('Role')}
                </Typography>
                <Select
                  value={role}
                  onChange={handleRoleChange}
                  className={classes.select}
                  placeholder="Role"
                  disableUnderline
                  label="Select"
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
                  {rolesData.map((roles) => {
                    return (
                      <MenuItem className={classes.selectValue} value={roles}>{roles}</MenuItem>
                    )
                  })}
                </Select>
              </Grid>
              <Grid
                item
                style={{
                  width: '50%',
                  marginTop: '2%'
                }}
              >
                <Typography className={`${classes.label}`}>
                  {_t_('Permission')}
                </Typography>
                <Select
                  value={permission}
                  className={classes.select}
                  onChange={handlePermissionChange}
                  disableUnderline
                  label="Select"
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
                  {permissionsData.map((permission) => {
                    return (
                      <MenuItem className={classes.selectValue} value={permission}>{permission}</MenuItem>
                    )
                  })}
                </Select>
              </Grid>
              <Grid container style={{ justifyContent: "center", marginTop: '5%', marginBottom: '7%' }}>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.continueButton}
                >
                  Save
                </Button>

              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
