import {
  Grid,
  makeStyles,
  Typography,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS, plTheme } from '../../../plTheme';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from 'react';

interface DatesDropDownProps {
  values: string[];
  currentWeek: number;
}

const DatesDropDown: React.FC<DatesDropDownProps> = ({
  values,
  currentWeek,
}: DatesDropDownProps) => {
  const useStyles = makeStyles({
    item: {
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
    },
    mainDiv: {
      marginTop: '0.8rem',
    },
    mainHeading: {
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.subtitle1.fontSize,
      fontWeight: plTheme.typography.subtitle1.fontWeight,
      lineHeight: plTheme.typography.subtitle1.lineHeight,
      fontStyle: plTheme.typography.subtitle1.fontStyle,
      marginTop: 24,
      marginBottom: 22,
      letterSpacing: 0,
    },
    outcomesHead: {
      paddingTop: 25,
    },
    formControl: {
      marginLeft: 9,
      width: '175px',
    },
    rightSubHeading: {
      fontFamily: plTheme.typography.fontFamily,
      fontSize: plTheme.typography.subtitle1.fontSize,
      fontWeight: plTheme.typography.subtitle1.fontWeight,
      lineHeight: plTheme.typography.subtitle1.lineHeight,
      fontStyle: plTheme.typography.subtitle1.fontStyle,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    dropDown: {
      height: 40,
    },
    graphElement: {
      height: 735,
    },
    leftHeading: {
      // marginTop: 20,
      // marginLeft: 51.2,
    },
    icon: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },

    selectRoot: {
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Rubik',
      lineHeight: '24px',
      letterSpacing: '0em',
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

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [selectedOption, setSelectedOption] = React.useState<number>(
    currentWeek,
  );

  return (
    <>
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
          value={currentWeek}
          onChange={(event: any) => {
            setSelectedOption(event.target.value as number);
          }}
          inputProps={{
            classes: {
              icon: classes.icon,
              root: classes.selectRoot,
              // classes.input
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
          {values.map((element, index) => (
            <MenuItem
              className={classes.rightSubHeading}
              value={index + 1}
              key={element}
            >
              {element}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DatesDropDown;
