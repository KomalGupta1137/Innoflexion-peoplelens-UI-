import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

import { _t_ } from '../../../utils/translation/translation';
import React, { useState } from 'react';
import { COLORS, plTheme } from '../../../plTheme';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getDashboardData_getDashboardData_peopleDrivers_myTeam_personaCount as PersonaData } from '../../../gql/types';
import { getPersonaFullForm } from '../../molecules/MyTeamTree';
import PeopleActivitiesContainer from '../PeopleActivitiesContainer';
import WidgetCard from '../../atoms/WidgetCard';
interface PeopleActivitiesProps {
  teamData?: (PersonaData | null)[] | null;
  activeQuarter: number;
}

const useStyles = makeStyles({
  mainHeading: {
    fontFamily: plTheme.typography.fontFamily,
    fontSize: plTheme.typography.h3.fontSize,
    fontWeight: plTheme.typography.h5.fontWeight,
    lineHeight: plTheme.typography.h2.lineHeight,
    fontStyle: plTheme.typography.h3.fontStyle,
    marginTop: 24,
    marginBottom: 22,
    letterSpacing: 0,
  },
  item: {
    borderRadius: 4,
    border: '1px solid ' + COLORS.BORDER_PRIMARY,
    boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
  },
  outcomesHead: {
    paddingTop: 25,
  },
  rightHeading: {
    marginBottom: 22,
  },
  formControl: {
    marginLeft: 22,
    width: '216px',
    marginBottom: -10,
  },
  rightSubHeading: {
    fontFamily: plTheme.typography.fontFamily,
    fontSize: plTheme.typography.subtitle1.fontSize,
    fontWeight: plTheme.typography.h2.fontWeight,
    lineHeight: plTheme.typography.subtitle1.lineHeight,
    fontStyle: plTheme.typography.h3.fontStyle,
    backgroundColor: COLORS.GENERAL_WHITE,
  },
  dropDown: {
    height: 40,
  },
  graphElement: {
    height: 735,
    width: 'max-content',
  },
  leftHeading: {
    marginTop: 20,
    marginLeft: 51.2,
  },
  icon: {
    color: COLORS.TEXT_HIGH_EMPHASIS,
  },
  spiderChartElement: {
    marginTop: 70,
    marginBottom: 70,
  },
  selectRoot: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
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
});

const PeopleActivitiesWidget: React.FC<PeopleActivitiesProps> = ({
  teamData,
  activeQuarter,
}: PeopleActivitiesProps) => {
  const classes = useStyles();
  const [persona, setPersona] = useState('AE');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersona(event.target.value as string);
  };

  return (
    <>
      <Typography variant="h2" className={classes.outcomesHead}>
        {_t_('People Activities')}
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item>
          <Typography className={classes.mainHeading}>
            {_t_('Know how your team is performing against these activities')}
          </Typography>
        </Grid>
        <Grid item style={{ marginBottom: 10 }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
            className={classes.rightHeading}
          >
            <Grid item>
              <Typography variant="h6"> {_t_('TEAM')} </Typography>
            </Grid>
            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                classes={{
                  root: classes.quantityRoot,
                }}
              >
                <Select
                  IconComponent={ExpandMoreIcon}
                  className={`${classes.dropDown} ${classes.rightSubHeading}`}
                  displayEmpty
                  value={persona}
                  onChange={handleChange}
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
                  {teamData &&
                    teamData?.map(
                      (personas: PersonaData | null, index: number) => (
                        <MenuItem
                          key={index}
                          className={classes.rightSubHeading}
                          value={personas?.persona ? personas?.persona : ''}
                        >
                          {personas?.persona
                            ? getPersonaFullForm(personas?.persona)
                            : ''}
                        </MenuItem>
                      ),
                    )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <WidgetCard>
        <PeopleActivitiesContainer
          persona={persona}
          activeQuarter={activeQuarter}
        />
      </WidgetCard>
    </>
  );
};

export default PeopleActivitiesWidget;
