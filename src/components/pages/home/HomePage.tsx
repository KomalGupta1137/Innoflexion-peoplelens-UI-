/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ManagerDashboard from '../../organisms/ManagerDashboard';
import Header from '../../organisms/Header';
import { useAuth0 } from '@auth0/auth0-react';
import { COLORS } from '../../../plTheme';
import RepDashboard from '../../organisms/RepDashboard/index';
import jwtDecode from 'jwt-decode';
import ReactGA from 'react-ga';
import SDRDashboard from '../../organisms/SDRDashboard';
import AdminDashboard from '../../organisms/AdminDashboard';
ReactGA.pageview(window.location.pathname);

const useStyles = makeStyles((theme) => ({
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

const HomePage: React.FC = () => {
  const { user } = useAuth0();
  const { picture } = user;

  const token = localStorage.getItem('accessToken');
  const decodedToken: DecodedTokenProps | null | '' = token && jwtDecode(token);
  const persona: string | null =
    decodedToken && decodedToken.user && decodedToken?.user?.persona;
  persona != null
    ? localStorage.setItem('persona', persona.trim())
    : localStorage.setItem('persona', '');
  const designation: string | null =
    decodedToken && decodedToken.user && decodedToken?.user?.designation;
  designation != null
    ? localStorage.setItem('designation', designation.trim())
    : localStorage.setItem('designation', '');
  const classes = useStyles();
  return (
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
              {persona === 'LEADER' && <ManagerDashboard />}
              {(persona === 'AE' || persona === 'SE') && (
                <RepDashboard persona={persona} />
              )}
              {persona === 'SDR' && <SDRDashboard />}
              {persona === 'ADMIN' && <AdminDashboard />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
