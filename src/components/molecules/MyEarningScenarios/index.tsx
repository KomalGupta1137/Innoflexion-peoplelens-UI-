import {
  FormControl,
  Grid,
  Icon,
  makeStyles,
  Typography,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { COLORS, plTheme } from '../../../plTheme';
import { SSL_OP_NO_TLSv1_1 } from 'constants';
import { repDashboardData_RepDashboardData_earnings_myScenarios as ScenariosData } from '../../../gql/types';

interface ScenariosProps {
  data?: ScenariosData | null;
  demoMode?: boolean;
}

const Scenarios: React.FC<ScenariosProps> = ({ data, demoMode }: ScenariosProps) => {
  const useStyles = makeStyles({
    root: {
      padding: 16,
      height: 192,
      background: demoMode ? '#D9D9D9' : 'white',
      opacity: demoMode ? 0.6 : 1
    },
    dropdownheight: {
      height: 40,
    },
    closeDays: {
      fontFamily: 'Rubik',
      fontSize: 14,
      fontWeight: 300,
      lineHeight: '20px',
      letterSpacing: '0em',
    },
    quantityRoot: {
      // '& .MuiOutlinedInput-notchedOutline': {
      //   border: '1px solid rgba(215, 223, 233, 0.4)',
      //   borderRadius: '2px',
      // },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid rgba(215, 223, 233, 0.4)',
        borderRadius: '2px',
      },
      // '&:hover .MuiOutlinedInput-notchedOutline': {
      //   border: '1px solid rgba(215, 223, 233, 0.4)',
      //   borderRadius: '2px',
      // },
    },
    Days: {
      // styleName: Product - Body 1∙ 14|24/Regular;
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '21px',

      letterSpacing: '0em',
    },
    icon: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    selectRoot: {
      //paddingTop: 100,
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
    formControl: {
      // marginLeft: 22,
      width: '270px',
      // marginBottom: -10,
    },
    rightSubHeading: {
      fontFamily: plTheme.typography.fontFamily,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '24px',
      fontStyle: plTheme.typography.h3.fontStyle,
      height: 40,
      borderBottom: '1px  solid #D7DFE9',
    },
    dropdownStyle: {
      border: '1px  solid #D7DFE9',
    },
  });
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const [userId, setUserId] = useState('1. QTD OUTLOOK');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserId(event.target.value as string);
  };

  return (
    <>
      {' '}
      <WidgetCard>
        <Grid container direction="column" className={classes.root}>
          <Grid
            item
            style={{ width: '100%', display: 'flex', flexDirection: 'row' }}
          >
            <Typography
              className={globalClasses.body1WidgetTitle}
              style={{ flex: 60 }}
            >
              {_t_('my SCENARIOs')}
            </Typography>
            <Typography className={classes.closeDays} style={{ flex: 40 }}>
              {_t_('Days to Close')}
              {': '} <span className={classes.Days}>{data?.daysToClose} </span>
            </Typography>
          </Grid>
          <Grid item style={{ width: '100%', paddingTop: '8%' }}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              classes={{
                root: classes.quantityRoot,
              }}
            >
              <Select
                // aria-setsize={1}
                IconComponent={ExpandMoreIcon}
                className={` ${classes.rightSubHeading}`}
                displayEmpty
                value={userId}
                MenuProps={{
                  MenuListProps: {
                    disablePadding: true,
                  },
                  classes: { paper: classes.dropdownStyle },
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                }}
                onChange={handleChange}
                disabled={demoMode ? true : false}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                    root: classes.selectRoot,
                    input: classes.dropdownheight,
                  },
                }}
              >
                <MenuItem
                  value="1. QTD OUTLOOK"
                  className={classes.rightSubHeading}
                >
                  1. QTD OUTLOOK
                </MenuItem>
                <MenuItem
                  value="2. YTD OUTLOOK"
                  className={classes.rightSubHeading}
                >
                  2. YTD OUTLOOK
                </MenuItem>
                <MenuItem
                  value="3. MY DREAM !"
                  className={classes.rightSubHeading}
                >
                  3. MY DREAM !
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default Scenarios;
