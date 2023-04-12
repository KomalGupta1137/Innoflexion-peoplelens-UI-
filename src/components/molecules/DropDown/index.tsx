/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  Grid,
  makeStyles,
  Tooltip,
  Typography,
  withStyles,
  createStyles,
  Icon,
} from '@material-ui/core';
import React, { useState } from 'react';
import { _t_ } from '../../../utils/translation/translation';
import { useGlobalStyles } from '../../../plStyles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import PLChip from '../../atoms/PLChip/index';
export interface namesArray {
  key: string;
  label: string;
}
export interface DropDownProps {
  values: namesArray[];
  status: string;
  width: string;
  disabled: boolean
}

const DropDown: React.FC<DropDownProps> = ({
  values,
  status,
  width,
}: DropDownProps) => {
  const useStyles = makeStyles({
    icon: {
      paddingRight: 0,
      '&&': {
        paddingRight: 0, // only way to override
        paddingLeft: 0,
      },
    },
    icon1: {
      color: 'white',
    },
  });
  //   const SelectIcon = withStyles(() =>
  //     createStyles({
  //       MuiSelect: {

  //       },
  //     }),
  //   )(Select);

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  // const names = [
  //   { key: 'Not Started', label: 'Not Started' },

  //   { key: 'In Progress', label: 'In Progress' },
  //   { key: 'Done', label: 'Done' },
  // ];
  const [option, setOption] = useState(status);
  const [names, setNames] = useState(values);
  const handleChange = (event: any) => {
    setOption(event.target.value);
  };
  return (
    <div>
      <FormControl>
        <Select
          disabled={true}
          // eslint-disable-next-line react/jsx-boolean-value
          autoWidth={true}
          data-testid="select"
          disableUnderline={true}
          labelId="select-label"
          id="demo-controlled-open-select"
          value={option}
          onChange={handleChange}
          IconComponent={Icon}
          displayEmpty
          classes={{ select: classes.icon, icon: classes.icon1 }}
          // anchorEl={null}
          // getContentAnchorEl={null}
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
          // transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          renderValue={(selected: any) => (
            <PLChip
              label={String(selected)}
              variant={'success'}
              dropDown={true}
              fixed={true}
              width={width}
            />
          )}
        >
          {names.map((name) => (
            <MenuItem key={name.label} value={name.label}>
              <PLChip
                label={name.label}
                fixed={true}
                width={width}
                variant={'success'}
                dropDown={false}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropDown;
