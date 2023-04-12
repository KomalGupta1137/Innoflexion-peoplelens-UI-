import { Chip, makeStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { COLORS, plTheme } from '../../../plTheme';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import DoneIcon from '@material-ui/icons/Done';

export interface PLChipProps {
  variant: string;
  fixed: boolean;
  label: string;
  dropDown: boolean;
  width: string;
}

const PLChip: React.FC<PLChipProps> = ({
  variant,
  fixed,
  label,
  dropDown,
  width,
}: PLChipProps) => {
  const useStyles = makeStyles({
    root: {
      border: '1px solid #65789B',

      // border: '1px solid' + COLORS.GENERAL_CHART_1,
      backgroundColor: COLORS.AVATARS_2,
      // variant === 'success'
      //   ? COLORS.SUCCESS_HOVER
      //   : variant === 'primary'
      //   ? COLORS.PL_PRIMARY
      //   : COLORS.ERROR_HOVER,
      color: 'black',
      fontFamily: plTheme.typography.subtitle1.fontFamily,
      fontSize: dropDown ? '12.5px' : plTheme.typography.subtitle1.fontSize,
      fontWeight: 400,
      width: dropDown ? width : fixed ? '100%' : undefined,
      letterSpacing: '0em',
      height: 20,
      paddingLeft: 0,
      // lineHeight: '24px',
      textAlign: 'center',
      justifyContent: dropDown ? 'space-between' : 'center',
      paddingTop: '0.15rem',
      // alignContent: 'center',
    },
  });
  const CustomChip = withStyles(() => ({
    label: {
      // '&:hover': {
      //   borderColor: 'white',
      //   backgroundColor: 'green',
      // },
      // paddingLeft: '2',
      // width: '70%',
    },
  }))(Chip);
  const classes = useStyles();
  return (
    <>
      {dropDown ? (
        <CustomChip
          label={label}
          className={classes.root}
          deleteIcon={<ExpandMoreOutlinedIcon style={{ color: 'black' }} />}
          onDelete={() => {
          }}
        />
      ) : (
        <Chip label={label} className={classes.root} color="default" />
      )}
    </>
  );
};

export default PLChip;
