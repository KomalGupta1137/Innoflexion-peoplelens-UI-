import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Icon, Typography } from '@material-ui/core';
import { COLORS } from '../../plTheme';
import { SettingsOutlined, GetAppOutlined } from '@material-ui/icons';
import ReactGA from 'react-ga';

export interface CustomizedTabsProps {
  tabNames: string[];
  primary: boolean;
  activeTab?: number;
  tabName: string;
  handleTabChange?: (num: number) => void;
}

const CustomizedTabs: React.FC<CustomizedTabsProps> = ({
  tabNames,
  primary,
  activeTab,
  tabName,
  handleTabChange,
}: CustomizedTabsProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const useStyles = makeStyles({
    tabText: {
      paddingBottom: 8,
      marginRight: 30,
      cursor: 'pointer',
      color: COLORS.TEXT_LOW_EMPHASIS,
    },
    activeTab: {
      borderBottom:
        primary === true ? '2px solid ' + COLORS.MAIN_BLUE_DEFAULT : '',
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    divider: {
      borderBottom: '2px solid ' + COLORS.LIGHT_GREY_100,
      width: '89vw',
    },
    endDiv: {
      marginBottom: '-4px !important',
    },
    paper: {
      fontFamily: 'Rubik !important',
      fontWeight: 500,
      fontSize: 14,
      height: 100,
    },
    textField: {
      height: 40,
    },
    textfieldInput: {
      fontWeight: 500,
      fontSize: 14,
      height: 28,
    },
    inputAC: {
      fontFamily: 'Rubik !important',
      fontWeight: 500,
      fontSize: 14,
      padding: '0 16px',
    },
    rootAC: {
      border: '1px solid ' + COLORS.ALPHA_BACKGROUND_COLOR,
      borderRadius: 4,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    searchIcon: {
      width: '0.8em',
      height: '0.8em',
    },
  });
  const classes = useStyles();

  const handleConfigureClick = () => {
    localStorage.removeItem('reportData');
    window.dispatchEvent(new Event('reportDataRemoved'));
    setShowSearch && setShowSearch(false);
  };

  window.addEventListener('reportDataAdded', () => {
    setShowSearch && setShowSearch(true);
  });

  const saveReport = () => {
    window.print();
    ReactGA.event({
      category: 'Manager Lens - Reports',
      action: `Manager - Report downloads`,
    });
  };

  useEffect(() => {
    const reportData = localStorage.getItem('reportData');
    if (reportData != null) {
      setShowSearch && setShowSearch(true);
    }
  }, []);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={primary === true ? classes.divider : undefined}
      >
        {tabNames.map((tabName: string, tabIndex: number) => (
          <Grid item key={tabIndex}>
            <Typography
              variant="h6"
              className={
                tabIndex === activeTab
                  ? ` ${classes.tabText} ${classes.activeTab}`
                  : classes.tabText
              }
              onClick={() => handleTabChange?.(tabIndex)}
            >
              {tabName}
            </Typography>
          </Grid>
        ))}
        {activeTab == 3 && tabName == 'REPORTS' ? (
          <Grid
            style={{
              marginLeft: 'auto',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontStyle: 'normal',
                fontFamily: 'Rubik,sans-serif,Mulish',
                fontWeight: 500,
                letterSpacing: '0.01em',
                marginRight: 5,
                cursor: 'pointer',
              }}
              onClick={() => {
                handleConfigureClick();
              }}
            >
              CONFIGURE
            </div>
            <Icon
              component={SettingsOutlined}
              style={{ fontSize: 20, marginBottom: 5, cursor: 'pointer' }}
              onClick={() => {
                handleConfigureClick();
              }}
            />
            {showSearch ? (
              <>
                <div
                  style={{
                    fontSize: 12,
                    fontStyle: 'normal',
                    fontFamily: 'Rubik,sans-serif,Mulish',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    marginLeft: 17,
                    marginRight: 2,
                    cursor: 'pointer',
                  }}
                  onClick={saveReport}
                >
                  DOWNLOAD
                </div>
                <Icon
                  component={GetAppOutlined}
                  style={{ fontSize: 21, marginBottom: 3, cursor: 'pointer' }}
                  onClick={saveReport}
                />
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 12,
                    fontStyle: 'normal',
                    fontFamily: 'Rubik,sans-serif,Mulish',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    marginLeft: 17,
                    marginRight: 2,
                    color: '#7E858E',
                  }}
                >
                  DOWNLOAD
                </div>
                <Icon
                  component={GetAppOutlined}
                  style={{
                    fontSize: 21,
                    marginBottom: 3,
                    color: '#7E858E',
                  }}
                />
              </>
            )}
          </Grid>
        ) : (
          <Grid></Grid>
        )}
      </Grid>
    </div>
  );
};

export default CustomizedTabs;
