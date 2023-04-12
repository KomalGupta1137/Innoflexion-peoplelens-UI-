/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect, useReducer, useState } from 'react';
import { _t_ } from '../../../utils/translation/translation';
import ArrowBackButton from '@material-ui/icons/ArrowBack';
import ReactGA from 'react-ga';
ReactGA.pageview(window.location.pathname);

import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputAdornment,
  LinearProgress,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { COLORS, plTheme } from '../../../plTheme';
import Reports from '../Reports';
import { dates } from '../ManagerDashboard';
import { _n_ } from '../../../utils/numerals/numerals';
import { SearchOutlined } from '@material-ui/icons';
import '../ReportBuilder/styles.css';
import Loader from '../../atoms/Loader';
export interface ReportBuilderProps {}
const QUARTER_NAMES = ['Q1', 'Q2', 'Q3', 'Q4', 'H1', 'H2'];

const ReportBuilder: React.FC<ReportBuilderProps> = ({}: ReportBuilderProps) => {
  const [reportData, setReportData] = useState<any>();
  const [hide, setHide] = useState<boolean>(false);

  const [
    highPerformerSearchTerm,
    setHighPerformerSearchTerm,
  ] = useState<string>('');
  const [
    highPotentialSearchTerm,
    setHighPotentialSearchTerm,
  ] = useState<string>('');
  const [loading, setLoader] = useState<boolean>(false);
  const [managerSearchTerm, setManagerSearchTerm] = useState<string>('');
  const [productSearchTerm, setProductSearchTerm] = useState<string>('');
  const [progressValue, setProgressValue] = useState(0);
  const [activeQuarter, setActiveQuarter] = useState<number>(0);
  const [managerName, setManagerName] = useState<string>('');
  const [highPotentialUsers, setHighPotentialUsers] = useState<any[]>([]);
  const [highPerformerUsers, setHighPerformerUsers] = useState<any[]>([]);
  const [highPotentialUser, setHighPotentialUser] = useState<any>();
  const [highPerformerUser, setHighPerformerUser] = useState<any>();
  const [manager, setManager] = useState<any>();
  const [product, setProduct] = useState<any>();
  const [products, setProducts] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [
    highPotentialUsersSearchedData,
    setHighPotentialUsersSearchedData,
  ] = useState<any[] | undefined>(() => highPotentialUsers);
  const [
    highPerformerUsersSearchedData,
    setHighPerformerUsersSearchedData,
  ] = useState<any[] | undefined>(() => highPerformerUsers);
  const [managersSearchedData, setManagersSearchedData] = useState<
    any[] | undefined
  >(() => managers);
  const [productsSearchedData, setProductsSearchedData] = useState<
    any[] | undefined
  >(() => products);
  const [highPotentialUsersList, setHighPotentialUsersList] = useState<any[]>(
    [],
  );
  const [highPerformerUsersList, setHighPerformerUsersList] = useState<any[]>(
    [],
  );
  const [managersList, setManagersList] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<any[]>([]);

  const getProducts = async () => {
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getProducts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantId: localStorage.getItem('tenantId'),
        }),
      },
    );
    var jsonData = await fetchResponse.json();
    var prods: string[] = [];
    jsonData.map((element: { id: any; name: any }) => {
      prods.push(element.name);
    });
    setProductsList && setProductsList(prods);
    setProducts && setProducts(prods);
  };

  const getManagers = async () => {
    setLoader && setLoader(true);
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getManagers`,
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
    const mngrs = await fetchResponse.json();
    setManagersList && setManagersList(mngrs);
    setManagers && setManagers(mngrs);
    setManagersSearchedData && setManagersSearchedData(mngrs);
    setManagerName &&
      setManagerName(mngrs[0].firstName + ' ' + mngrs[0].lastName);
    void getUsers(mngrs[0].userId);
  };

  const getUsers = async (userId: string) => {
    const fetchResponse = await fetch(
      `${process.env.REACT_APP_API_BASE || ''}/api/getUsers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentId: userId,
          tenantId: localStorage.getItem('tenantId'),
          userId: localStorage.getItem('userId'),
          startDate: dates?.[activeQuarter + 1].startDate,
          endDate: dates?.[activeQuarter + 1].endDate,
        }),
      },
    );
    setLoader && setLoader(false);
    const jsonData: any[] = await fetchResponse.json();
    if (jsonData.length == 2) {
      const highPotentialUsers: any[] = [];
      const highPerformerUsers: any[] = [];

      highPotentialUsers.push(jsonData[0]);
      highPerformerUsers.push(jsonData[1]);
      setHighPotentialUsersList &&
        setHighPotentialUsersList(highPotentialUsers);
      setHighPerformerUsersList &&
        setHighPerformerUsersList(highPerformerUsers);
      setHighPotentialUsers && setHighPotentialUsers(highPotentialUsers);
      setHighPerformerUsers && setHighPerformerUsers(highPerformerUsers);
      setHighPotentialUser &&
        setHighPotentialUser({
          userId: highPotentialUsers[0].userId,
          name:
            highPotentialUsers[0].user.firstName +
            ' ' +
            highPotentialUsers[0].user.lastName,
        });
      setHighPerformerUser({
        userId: highPerformerUsers[0].userId,
        name:
          highPerformerUsers[0].user.firstName +
          ' ' +
          highPerformerUsers[0].user.lastName,
      });
    } else {
      const highPotentialUsers = jsonData
        .filter((user) => user.metricValue < 50)
        .sort((a, b) => (a.metricValue > b.metricValue ? 1 : -1));
      const highPerformerUsers = jsonData
        .filter((user) => user.metricValue >= 50)
        .sort((a, b) => (a.metricValue > b.metricValue ? 1 : -1));
      setHighPotentialUsersList &&
        setHighPotentialUsersList(highPotentialUsers);
      setHighPerformerUsersList &&
        setHighPerformerUsersList(highPerformerUsers);
      setHighPotentialUsers && setHighPotentialUsers(highPotentialUsers);
      setHighPerformerUsers && setHighPerformerUsers(highPerformerUsers);
      highPotentialUsers.length > 0
        ? setHighPotentialUser &&
          setHighPotentialUser({
            userId: highPotentialUsers[0].userId,
            name:
              highPotentialUsers[0].user.firstName +
              ' ' +
              highPotentialUsers[0].user.lastName,
          })
        : setHighPotentialUser({ userId: '', name: '' });
      highPerformerUsers.length > 0
        ? setHighPerformerUser &&
          setHighPerformerUser({
            userId: highPerformerUsers[0].userId,
            name:
              highPerformerUsers[0].user.firstName +
              ' ' +
              highPerformerUsers[0].user.lastName,
          })
        : setHighPerformerUser({ userId: '', name: '' });
    }
  };

  const useStyles = makeStyles({
    root1: {
      '& .MuiLinearProgress-colorPrimary': {
        'background-color': 'rgb(182, 188, 226)',
      },
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#0B69FF',
      },
    },
    buttonStyles: {
      marginRight: '10px',
      width: '46px',
      height: '42px',
      border: 'none',
      // '& .MuiButton-containedPrimary': {
      //   'background-color': 'rgb(182, 188, 226)',
      // },
    },
    page: {
      width: '625px',
      height: '383px',
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      padding: '0px',
      flex: 'none',
      'box-sizing': 'border-box',
      margin: '10mm auto',
      boxSizing: 'border-box',
      border: '1px #D3D3D3 solid',
      borderRadius: '5px',
      background: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      pageBreakAfter: 'always',
    },
    page1: {
      width: '975px',
      height: '383px',
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      padding: '0px',
      flex: 'none',
      'box-sizing': 'border-box',
      margin: '10mm auto',
      boxSizing: 'border-box',
      border: '1px #D3D3D3 solid',
      borderRadius: '5px',
      background: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      pageBreakAfter: 'always',
    },
    coverPage: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '100% 100%',
    },
    footer: {
      padding: '5mm 0mm',
    },
    subpage: {
      padding: '1cm',
      border: '5px red solid',
      height: '257mm',
      outline: '2cm #FFEAEA solid',
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
      width: '509px',
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
    date: {
      color: COLORS.GENERAL_CHART_1,
    },
    footerImage: {
      height: 33,
      width: 116,
    },
    spanText: {
      marginRight: 20,
      textTransform: 'uppercase',
    },
    fullHeight: {
      height: '100%',
    },
    rightHeading: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      marginRight: '21.94px',
      fontSize: 14,
    },
    rightHeading1: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginRight: '21.94px',
      marginTop: -5,
      fontWeight: 400,
    },
    widgets: {
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 18px 0px ' + COLORS.REPORTS_BOX_SHADOW,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    hideWhenPrint: {},
    [`@media print`]: {
      '@page': {
        margin: '0 0',
        padding: 0,
        width: '8.5in',
        height: '11in',
      },
      widgets: {
        boxShadow: 'none',
      },
      page: {
        boxShadow: 'none',
        margin: 0,
        border: 0,
        background: 'white',
      },
      hideWhenPrint: {
        pageBreakAfter: 'always',
        padding: '0mm',
        border: '0px',
        borderRadius: '0px',
        background: 'white',
        boxShadow: '0 0 0px rgba(0, 0, 0, 0.1)',
      },
    },
    page6Heading: {
      lineHeight: '20px',

      marginTop: -20,
    },
    page6HeadingComponent: {
      marginLeft: 25,

      width: '93%',
    },
    page6Avatar: {
      width: '45px',
      height: '45px',
      marginTop: -30,
      marginLeft: 50,
    },
    page6AvatarName: {
      lineHeight: '20px',
      marginTop: -20,
      marginLeft: 10,
    },
    salesActivitiesHeading: {
      marginTop: 10,
      lineHeight: '20px',
      marginLeft: 25,
      marginBottom: 10,
    },
    timePeriod: {
      'font-family': 'Rubik',
      'font-style': 'normal',
      'font-weight': 500,
      'font-size': '16px',
      paddingBottom: '20px',
      paddingTop: 32,
    },
    rightSubHeading: {
      'font-family': 'Rubik',
      'font-style': 'normal',
      'font-weight': 500,
      'font-size': 14,
      paddingLeft: 10,
    },
    dropDown: {
      height: 40,
      border: '1px solid #D7DFE9',
      borderRadius: 7,
      width: 375,
      padding: 5,
      paddingLeft: 10,
      paddingTop: 9,
    },
    icon: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    selectRoot: {
      '&:focus': {
        backgroundColor: 'transparent',
      },
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
    root: {
      width: 430,
    },
    heading: {
      // padding: '24px 0 0 24px',
    },
    textFieldDiv: {
      padding: '28px 0 0 0',
      marginBottom: 16,
    },
    input: {
      width: 280,
      height: 30,
      fontWeight: 400,

      fontSize: 16,
      marginTop: '-15px',
      '& .MuiOutlinedInput-input': {
        padding: '16px 10px 2px 6px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#E8ECF1',
      },
      '& .MuiInputBase-input': {
        color: '#111111',
      },
    },
    searchButton: {
      marginTop: '-15px',
      height: 51,
      width: 51,
      borderRadius: 4,
      border: '0.5px solid #E8ECF1',
      cursor: 'pointer',
    },
    personDiv: {
      width: 340,
      height: 50,
      margin: '0 00 5px',
      // padding: '0 14px 0 12px',
      borderRadius: 4,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#E5E5E5 !important',
      },
    },
    searchIcon: {
      width: '1em',
      height: '1em',
    },
    arrowIcon: {
      width: 20,
      height: 20,
      margin: '15.6px',
    },
    name: {
      fontWeight: 400,
      alignSelf: 'center',
    },
    boldName: {
      fontWeight: 500,
    },
    avatar: {
      height: 36,
      width: 36,
    },
    selectedPersonDiv: {
      backgroundColor: '#E8ECF1',
    },
    personsList: {
      // maxHeight: 225,
      overflowY: 'scroll',
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
    personsList1: {
      maxHeight: 225,
      overflowY: 'scroll',
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
    label: {
      'font-family': 'Rubik',
      'font-style': 'normal',
      'font-weight': 500,
      'font-size': 16,
      // 'line-height': 24,
    },
  });

  const handleContinueClick = (value: number) => {
    setProgressValue && setProgressValue(value);
  };

  const handleGenerateClick = () => {
    setProgressValue && setProgressValue(100);
    var reportData = {
      activeQuarter: activeQuarter,
      highPotentialUser: highPotentialUser,
      highPerformerUser: highPerformerUser,
      managerName: managerName,
    };
    localStorage.setItem('reportData', JSON.stringify(reportData));
    window.dispatchEvent(new Event('reportDataAdded'));
  };

  const handleBackClick = (value: number) => {
    setProgressValue && setProgressValue(value);
  };

  const handleActiveQuarterChange = (value: number) => {
    setActiveQuarter(value);
    setProgressValue && setProgressValue(33);
  };

  const handleHighPotentialUserSelect = (e: any) => {
    var user = highPotentialUsers.find(
      (user) => user.user.userId == e.target.value,
    );
    if (user != undefined) {
      setHighPotentialUser &&
        setHighPotentialUser({
          userId: e.target.value,
          name: user.user.firstName + ' ' + user.user.lastName,
        });
    } else {
      setHighPotentialUser && setHighPotentialUser(highPotentialUser);
    }
    setHighPotentialUsers && setHighPotentialUsers(highPotentialUsersList);
  };

  const handleHighPerformerUserSelect = (e: any) => {
    const user = highPerformerUsers.find(
      (user) => user.user.userId == e.target.value,
    );
    if (user != undefined) {
      setHighPerformerUser &&
        setHighPerformerUser({
          userId: e.target.value,
          name: user.user.firstName + ' ' + user.user.lastName,
        });
    } else {
      setHighPerformerUser && setHighPerformerUser(highPerformerUser);
    }
    setHighPerformerUsers && setHighPerformerUsers(highPerformerUsersList);
  };

  const handleManagerSelect = (e: any) => {
    const mngr = managers.find((mngr) => mngr.userId == e.target.value);
    if (mngr != undefined) {
      setManager &&
        setManager({
          userId: e.target.value,
          name: mngr.firstName + ' ' + mngr.lastName,
        });
      getUsers(e.target.value);
      setManagerName && setManagerName(mngr.firstName + ' ' + mngr.lastName);
    } else {
      setManager && setManager(manager);
    }
    setManagers && setManagers(managersList);
  };

  const handleProductSelect = (e: any) => {
    const product = products.find((prod) => prod.id == e.target.value);
    if (product != undefined)
      setProduct &&
        setProduct({
          id: e.target.value,
          name: product.name,
        });
    setProducts && setProducts(productsList);
  };

  const setHighPotentialSearchText = (e: any) => {
    if (e != '') {
      var users = highPotentialUsersList.filter((user) =>
        user.user.firstName
          ?.toLowerCase()
          .includes(e.target.value.trim().toLowerCase()),
      );
      if (users.length > 0) {
        setHighPotentialUsers && setHighPotentialUsers(users);
      }
    }
  };

  const setHighPerformerSearchText = (e: any) => {
    if (e != '') {
      var users = highPerformerUsersList.filter((user) =>
        user.user.firstName
          ?.toLowerCase()
          .includes(e.target.value.trim().toLowerCase()),
      );
      if (users.length > 0) {
        setHighPerformerUsers && setHighPerformerUsers(users);
      }
    }
  };

  const setManagerSearchText = (e: any) => {
    if (e != '') {
      var managers = managersList.filter((mngr) =>
        mngr.firstName
          ?.toLowerCase()
          .includes(e.target.value.trim().toLowerCase()),
      );
      if (managers.length > 0) {
        setManagers && setManagers(managers);
      }
    }
  };

  const setProductSearchText = (e: any) => {
    if (e != '') {
      var products = productsList.filter((prod) =>
        prod.name?.toLowerCase().includes(e.target.value.trim().toLowerCase()),
      );
      if (products.length > 0) {
        setProducts && setProducts(products);
      }
    }
  };

  const focusUsernameInputField = (input: any) => {
    if (input) {
      setTimeout(() => {
        input.focus();
      }, 100);
    }
  };

  const classes = useStyles();

  window.addEventListener('reportDataRemoved', () => {
    setReportData && setReportData(null);
    setProgressValue && setProgressValue(0);
    setActiveQuarter && setActiveQuarter(0);
  });

  useEffect(() => {
    setHighPotentialUsersSearchedData(highPotentialUsers);
    setHighPotentialSearchTerm('');
  }, [highPotentialUsers]);

  useEffect(() => {
    setHighPerformerUsersSearchedData(highPerformerUsers);
    setHighPerformerSearchTerm('');
  }, [highPerformerUsers]);

  useEffect(() => {
    setManagersSearchedData(managers);
    setManagerSearchTerm('');
  }, [managers]);

  useEffect(() => {
    setProductsSearchedData(products);
    setProductSearchTerm('');
  }, [products]);

  useEffect(() => {
    void getProducts();
    void getManagers();
    const localObject = localStorage.getItem('reportData');
    if (localObject) {
      setReportData && setReportData(JSON.parse(localObject));
      setProgressValue && setProgressValue(100);
    }

    if (highPotentialSearchTerm.trim() === '') {
      setHighPotentialUsersSearchedData(highPotentialUsers);
    } else {
      const data1: any[] = [];
      highPotentialUsers?.filter((item) => {
        if (
          item.user.firstName
            ?.toLowerCase()
            .includes(highPotentialSearchTerm.trim().toLowerCase())
        ) {
          data1.push(item);
        }
        return item.firstName
          ?.toLowerCase()
          .includes(highPotentialSearchTerm.trim().toLowerCase());
      }),
        setHighPotentialUsersSearchedData(data1);
    }

    if (highPerformerSearchTerm.trim() === '') {
      setHighPerformerUsersSearchedData(highPerformerUsers);
    } else {
      const data2: any[] = [];
      highPerformerUsers?.filter((item) => {
        if (
          item.user.firstName
            ?.toLowerCase()
            .includes(highPerformerSearchTerm.trim().toLowerCase())
        ) {
          data2.push(item);
        }
        return item.firstName
          ?.toLowerCase()
          .includes(highPerformerSearchTerm.trim().toLowerCase());
      }),
        setHighPerformerUsersSearchedData(data2);
    }

    if (managerSearchTerm.trim() === '') {
      setManagersSearchedData(managers);
    } else {
      const data3: any[] = [];
      managers?.filter((item) => {
        if (
          item.firstName
            ?.toLowerCase()
            .includes(managerSearchTerm.trim().toLowerCase())
        ) {
          data3.push(item);
        }
        return item.firstName
          ?.toLowerCase()
          .includes(managerSearchTerm.trim().toLowerCase());
      }),
        setManagersSearchedData(data3);
    }

    if (productSearchTerm.trim() === '') {
      setProductsSearchedData(products);
    } else {
      const data2: any[] = [];
      products?.filter((item) => {
        if (
          item.name
            ?.toLowerCase()
            .includes(productSearchTerm.trim().toLowerCase())
        ) {
          data2.push(item);
        }
        return item.name
          ?.toLowerCase()
          .includes(productSearchTerm.trim().toLowerCase());
      }),
        setProductsSearchedData(data2);
    }
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // if (error) return <>`Error! ${error.message}` </>;

  if (reportData != undefined || reportData != null) {
    return (
      <>
        <div id="reportComponent">
          <Reports
            activeQuarter={reportData.activeQuarter}
            highPerformerUser={reportData.highPerformerUser}
            highPotentialUser={reportData.highPotentialUser}
            managerName={reportData.managerName}
          ></Reports>
        </div>
      </>
    );
  } else
    return (
      <>
        <div id="reportBuilder">
          {progressValue == 0 ? (
            <div
              hidden={false}
              className={`${classes.page1} ${classes.coverPage}`}
            >
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
                    width: '509px',
                  }}
                >
                  <Typography className={`${classes.mainTitle}`}>
                    {_t_('Report Builder')}
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: 'center' }}>
                  <Typography className={`${classes.subTitle}`}>
                    {_t_('Follow the steps to configure and generate report')}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    alignSelf: 'center',
                    width: '279px',
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
              <Typography className={`${classes.timePeriod}`}>
                Select time period
              </Typography>
              <Grid container style={{ justifyContent: 'space-around' }}>
                <Grid item className={`${classes.hideWhenPrint}`}>
                  <Grid
                    item
                    style={{
                      width: '545px',
                      height: '46px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      padding: 0,
                      gap: 6,
                      flex: 'none',
                      order: 1,
                      flexGrow: 0,
                      justifyContent: 'space-between',
                    }}
                  >
                    {QUARTER_NAMES.map((quarterName, quarterIndex) => (
                      <Button
                        key={quarterIndex}
                        variant={
                          activeQuarter === quarterIndex
                            ? 'contained'
                            : 'outlined'
                        }
                        color={
                          activeQuarter === quarterIndex ? 'primary' : 'default'
                        }
                        className={classes.buttonStyles}
                        onClick={() => {
                          handleActiveQuarterChange(quarterIndex);
                        }}
                      >
                        {quarterName}
                      </Button>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          ) : progressValue == 33 ? (
            <div className={`${classes.page1} ${classes.coverPage}`}>
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
                  <Icon
                    component={ArrowBackButton}
                    style={{ color: '#65789B', alignSelf: 'center' }}
                    onClick={() => {
                      handleBackClick(0);
                    }}
                  />
                  <Typography className={`${classes.mainTitle}`}>
                    {_t_('Report Builder')}
                  </Typography>
                  <Icon />
                </Grid>
                <Grid item style={{ alignSelf: 'center' }}>
                  <Typography className={`${classes.subTitle}`}>
                    {_t_('Follow the steps to select manager and product.')}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    alignSelf: 'center',
                    width: '279px',
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
              <Grid
                container
                style={{
                  justifyContent: 'space-around',
                  paddingTop: 32,
                  width: '100%',
                }}
              >
                <Grid item>
                  <Typography
                    style={{ textAlign: 'center' }}
                    className={`${classes.label}`}
                  >
                    {_t_('Pick Manager')}
                  </Typography>
                  <FormControl id="form-control" style={{ paddingTop: 10 }}>
                    <Select
                      className={`${classes.dropDown} ${classes.rightSubHeading}`}
                      disableUnderline={true}
                      defaultValue={managers[0].userId}
                      renderValue={(selected: any) => {
                        const rep = managers.find((x) => x.userId == selected);
                        if (rep == undefined) {
                          return (
                            managers[0].firstName + ' ' + managers[0].lastName
                          );
                        }
                        return rep.firstName + ' ' + rep.lastName;
                      }}
                      onChange={handleManagerSelect}
                      onClose={() => setManagerSearchText('')}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                          root: classes.selectRoot,
                        },
                      }}
                      MenuProps={{
                        autoFocus: false,
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                        PaperProps: {
                          className: classes.personsList1,
                          style: {
                            width: 320,
                          },
                        },
                      }}
                    >
                      <ListSubheader style={{ position: 'relative' }}>
                        <TextField
                          style={{ paddingTop: 0 }}
                          onClickCapture={(e) => e.stopPropagation()}
                          size="small"
                          autoFocus
                          placeholder="Search"
                          fullWidth
                          InputProps={{
                            style: { fontSize: 15, paddingBottom: 5 },
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchOutlined
                                  style={{ height: 16, width: 16 }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          onChange={setManagerSearchText}
                          onKeyDown={(e) => {
                            if (e.key !== 'Escape') {
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {managersSearchedData &&
                        managersSearchedData.map((item: any, index: number) => (
                          <MenuItem
                            className={classes.rightSubHeading}
                            value={item.userId}
                            key={item.userId}
                            style={{ justifyContent: 'space-between' }}
                          >
                            <Grid className={classes.root}>
                              <Grid className={classes.personsList}>
                                <Grid
                                  container
                                  direction="column"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid
                                    item
                                    className={classes.personDiv}
                                    key={item.userId}
                                  >
                                    <Grid
                                      container
                                      direction="row"
                                      justify="space-between"
                                      alignItems="center"
                                      style={{
                                        height: '100%',
                                        width: '100%',
                                      }}
                                    >
                                      <Grid item>
                                        <Grid
                                          container
                                          direction="row"
                                          spacing={5}
                                        >
                                          <Grid
                                            item
                                            // style={{ paddingRight: 0 }}
                                          >
                                            <Avatar
                                              style={{ fontSize: '18px' }}
                                              src={item.avatar}
                                              className={classes.avatar}
                                              children={
                                                item.firstName &&
                                                item.lastName &&
                                                item.firstName.charAt(0) +
                                                  item.lastName.charAt(0)
                                              }
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            style={{ alignSelf: 'center' }}
                                          >
                                            <Typography
                                              variant="h5"
                                              color="textPrimary"
                                              className={classes.name}
                                            >
                                              {item.firstName} {item.lastName}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item> */}
                {/* Commented out for now, need it in future when it is moved to a different screen */}
                {/* <Typography className={`${classes.label}`}>
                    {_t_('Pick Product')}
                  </Typography>
                  <FormControl id="form-control" style={{ paddingTop: 10 }}>
                    <Select
                      className={`${classes.dropDown} ${classes.rightSubHeading}`}
                      disableUnderline={true}
                      defaultValue={products[0]}
                      renderValue={(selected: any) => {
                        var rep = products.find((x) => x == selected);
                        if (rep == undefined) {
                          return products[0];
                        }
                        return rep;
                      }}
                      onChange={handleProductSelect}
                      onClose={() => setProductSearchText('')}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                          root: classes.selectRoot,
                        },
                      }}
                      MenuProps={{
                        autoFocus: false,
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                        PaperProps: {
                          className: classes.personsList1,
                          style: {
                            width: 320,
                          },
                        },
                      }}
                    >
                      <ListSubheader style={{ position: 'relative' }}>
                        <TextField
                          onClickCapture={(e) => e.stopPropagation()}
                          size="small"
                          autoFocus
                          placeholder="Search"
                          fullWidth
                          InputProps={{
                            style: { fontSize: 15, paddingBottom: 5 },
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchOutlined
                                  style={{ height: 16, width: 16 }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          onChange={setProductSearchText}
                          onKeyDown={(e) => {
                            if (e.key !== 'Escape') {
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {productsSearchedData &&
                        productsSearchedData.map((item: any, index: number) => (
                          <MenuItem
                            className={classes.rightSubHeading}
                            value={item}
                            key={item}
                            style={{ justifyContent: 'space-between' }}
                          >
                            <Grid className={classes.root}>
                              <Grid className={classes.personsList}>
                                <Grid
                                  container
                                  direction="column"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid
                                    item
                                    className={classes.personDiv}
                                    key={item}
                                  >
                                    <Grid
                                      container
                                      direction="row"
                                      justify="space-between"
                                      alignItems="center"
                                      style={{
                                        height: '100%',
                                        width: '100%',
                                      }}
                                    >
                                      <Grid item>
                                        <Grid
                                          container
                                          direction="row"
                                          spacing={5}
                                        >
                                          <Grid
                                            item
                                            // style={{ paddingRight: 0 }}
                                          >
                                            <Avatar
                                              style={{ fontSize: '18px' }}
                                              src={item.avatar}
                                              className={classes.avatar}
                                              children={item && item.charAt(0)}
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            style={{ alignSelf: 'center' }}
                                          >
                                            <Typography
                                              variant="h5"
                                              color="textPrimary"
                                              className={classes.name}
                                            >
                                              {item}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl> */}
                {/* </Grid> */}
              </Grid>
              <Grid
                container
                style={{
                  justifyContent: 'center',
                  paddingTop: 25,
                }}
              >
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleContinueClick(66);
                  }}
                  className={classes.continueButton}
                >
                  Continue
                </Button>
              </Grid>
            </div>
          ) : progressValue == 66 ? (
            <div className={`${classes.page1} ${classes.coverPage}`}>
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
                  <Icon
                    component={ArrowBackButton}
                    style={{ color: '#65789B', alignSelf: 'center' }}
                    onClick={() => {
                      handleBackClick(33);
                    }}
                  />
                  <Typography className={`${classes.mainTitle}`}>
                    {_t_('Report Builder')}
                  </Typography>
                  <Icon />
                </Grid>
                <Grid item style={{ alignSelf: 'center' }}>
                  <Typography className={`${classes.subTitle}`}>
                    {_t_(
                      'Follow the steps to select reps based on their quota attainment.',
                    )}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    alignSelf: 'center',
                    width: '279px',
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
              <Grid
                container
                style={{
                  justifyContent: 'space-around',
                  paddingTop: 32,
                  width: '100%',
                }}
              >
                <Grid item>
                  <Typography className={`${classes.label}`}>
                    {_t_('High Potential - Rep')}
                  </Typography>
                  <FormControl id="form-control" style={{ paddingTop: 10 }}>
                    <Select
                      className={`${classes.dropDown} ${classes.rightSubHeading}`}
                      disableUnderline={true}
                      defaultValue={highPotentialUsers[0].userId}
                      renderValue={(selected: any) => {
                        var rep = highPotentialUsers.find(
                          (x) => x.userId == selected,
                        );
                        if (rep == undefined) {
                          return (
                            highPotentialUsers[0].user.firstName +
                            ' ' +
                            highPotentialUsers[0].user.lastName
                          );
                        }
                        return rep.user.firstName + ' ' + rep.user.lastName;
                      }}
                      onChange={handleHighPotentialUserSelect}
                      onClose={() => setHighPotentialSearchText('')}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                          root: classes.selectRoot,
                        },
                      }}
                      MenuProps={{
                        autoFocus: false,
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                        PaperProps: {
                          className: classes.personsList1,
                          style: {
                            width: 320,
                          },
                        },
                      }}
                    >
                      <ListSubheader style={{ position: 'relative' }}>
                        <TextField
                          onClickCapture={(e) => e.stopPropagation()}
                          size="small"
                          autoFocus
                          placeholder="Search"
                          fullWidth
                          InputProps={{
                            style: { fontSize: 15, paddingBottom: 5 },
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchOutlined
                                  style={{ height: 16, width: 16 }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          onChange={setHighPotentialSearchText}
                          onKeyDown={(e) => {
                            if (e.key !== 'Escape') {
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {highPotentialUsersSearchedData &&
                        highPotentialUsersSearchedData
                          ?.slice()
                          .sort((a: any | null, b: any | null) =>
                            a &&
                            b &&
                            a.value !== undefined &&
                            b.value !== undefined
                              ? b?.value - a?.value
                              : 0,
                          )
                          .map((item: any, index: number) => (
                            <MenuItem
                              className={classes.rightSubHeading}
                              value={item.userId}
                              key={item.userId}
                              style={{ justifyContent: 'space-between' }}
                            >
                              <Grid className={classes.root}>
                                <Grid className={classes.personsList}>
                                  <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                  >
                                    <Grid
                                      item
                                      className={classes.personDiv}
                                      key={item.user.userId}
                                    >
                                      <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                        style={{
                                          height: '100%',
                                          width: '100%',
                                        }}
                                      >
                                        <Grid item>
                                          <Grid
                                            container
                                            direction="row"
                                            spacing={5}
                                          >
                                            <Grid
                                              item
                                              // style={{ paddingRight: 0 }}
                                            >
                                              <Avatar
                                                style={{ fontSize: '18px' }}
                                                src={item.avatar}
                                                className={classes.avatar}
                                                children={
                                                  item.user.firstName &&
                                                  item.user.lastName &&
                                                  item.user.firstName.charAt(
                                                    0,
                                                  ) +
                                                    item.user.lastName.charAt(0)
                                                }
                                              />
                                            </Grid>
                                            <Grid
                                              item
                                              style={{ alignSelf: 'center' }}
                                            >
                                              <Typography
                                                variant="h5"
                                                color="textPrimary"
                                                className={classes.name}
                                              >
                                                {item.user.firstName}{' '}
                                                {item.user.lastName}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Typography
                                            variant="h5"
                                            color="textPrimary"
                                            className={classes.boldName}
                                          >
                                            {item?.metricValue
                                              ? _n_(item?.metricValue, '0,0.0a')
                                              : item.value}{' '}
                                            {'%'}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Typography className={`${classes.label}`}>
                    {_t_('High Performer - Rep')}
                  </Typography>
                  <FormControl id="form-control" style={{ paddingTop: 10 }}>
                    <Select
                      className={`${classes.dropDown} ${classes.rightSubHeading}`}
                      disableUnderline={true}
                      defaultValue={
                        highPerformerUsers.length > 0
                          ? highPerformerUsers[0].userId
                          : ''
                      }
                      renderValue={(selected: any) => {
                        var rep = highPerformerUsers.find(
                          (x) => x.userId == selected,
                        );
                        if (rep == undefined) {
                          return highPerformerUsers.length > 0
                            ? highPerformerUsers[0].user.firstName +
                                ' ' +
                                highPerformerUsers[0].user.lastName
                            : '';
                        }
                        return rep.user.firstName + ' ' + rep.user.lastName;
                      }}
                      onChange={handleHighPerformerUserSelect}
                      onClose={() => setHighPerformerSearchText('')}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                          root: classes.selectRoot,
                        },
                      }}
                      MenuProps={{
                        autoFocus: false,
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                        PaperProps: {
                          className: classes.personsList1,
                          style: {
                            width: 320,
                          },
                        },
                      }}
                    >
                      <ListSubheader style={{ position: 'relative' }}>
                        <TextField
                          onClickCapture={(e) => e.stopPropagation()}
                          size="small"
                          autoFocus
                          placeholder="Search"
                          fullWidth
                          InputProps={{
                            style: { fontSize: 15, paddingBottom: 5 },
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchOutlined
                                  style={{ height: 16, width: 16 }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          onChange={setHighPerformerSearchText}
                          onKeyDown={(e) => {
                            if (e.key !== 'Escape') {
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {highPerformerUsersSearchedData &&
                        highPerformerUsersSearchedData
                          ?.slice()
                          .sort((a: any | null, b: any | null) =>
                            a &&
                            b &&
                            a.value !== undefined &&
                            b.value !== undefined
                              ? b?.value - a?.value
                              : 0,
                          )
                          .map((item: any, index: number) => (
                            <MenuItem
                              className={classes.rightSubHeading}
                              value={item.userId}
                              key={item.userId}
                              style={{ justifyContent: 'space-between' }}
                            >
                              <Grid className={classes.root}>
                                <Grid className={classes.personsList}>
                                  <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                  >
                                    <Grid
                                      item
                                      className={classes.personDiv}
                                      key={item.user.userId}
                                    >
                                      <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                        style={{
                                          height: '100%',
                                          width: '100%',
                                        }}
                                      >
                                        <Grid item>
                                          <Grid
                                            container
                                            direction="row"
                                            spacing={5}
                                          >
                                            <Grid
                                              item
                                              // style={{ paddingRight: 0 }}
                                            >
                                              <Avatar
                                                style={{ fontSize: '18px' }}
                                                src={item.avatar}
                                                className={classes.avatar}
                                                children={
                                                  item.user.firstName &&
                                                  item.user.lastName &&
                                                  item.user.firstName.charAt(
                                                    0,
                                                  ) +
                                                    item.user.lastName.charAt(0)
                                                }
                                              />
                                            </Grid>
                                            <Grid
                                              item
                                              style={{ alignSelf: 'center' }}
                                            >
                                              <Typography
                                                variant="h5"
                                                color="textPrimary"
                                                className={classes.name}
                                              >
                                                {item.user.firstName}{' '}
                                                {item.user.lastName}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Typography
                                            variant="h5"
                                            color="textPrimary"
                                            className={classes.boldName}
                                          >
                                            {item?.metricValue
                                              ? _n_(item?.metricValue, '0,0.0a')
                                              : item.value}{' '}
                                            {'%'}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                style={{
                  justifyContent: 'center',
                  paddingTop: 25,
                }}
              >
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleGenerateClick();
                  }}
                  className={classes.continueButton}
                >
                  Generate
                </Button>
              </Grid>
            </div>
          ) : (
            <div id="reportComponent">
              <Reports
                activeQuarter={activeQuarter}
                highPotentialUser={highPotentialUser}
                highPerformerUser={highPerformerUser}
                managerName={managerName}
              ></Reports>
            </div>
          )}
        </div>
      </>
    );
};

export default ReportBuilder;
