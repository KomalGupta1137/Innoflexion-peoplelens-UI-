/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ArrowIcon from '../../../assets/Union.png';
import { _n_ } from '../../../utils/numerals/numerals';

export interface PersonProps {
  avatar?: string;
  name?: string;
  lastName?: string;
  value?: number;
  id?: string;
}

export interface BubbleChartPopupProps {
  data?: PersonProps[];
  selectPerson?: (person: PersonProps) => void;
  prefix?: string;
  suffix?: string;
}

const BubbleChartPopup: React.FC<BubbleChartPopupProps> = ({
  data,
  selectPerson,
  prefix,
  suffix,
}: BubbleChartPopupProps) => {
  const useStyles = makeStyles({
    root: {
      width: 430,
    },
    heading: {
      padding: '24px 0 0 24px',
    },
    textFieldDiv: {
      padding: '28px 0 0 24px',
      marginBottom: 16,
    },
    input: {
      width: 375,
      height: 50,
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
      width: 375,
      height: 62,
      margin: '0 26px 0 24px',
      padding: '0 14px 0 12px',
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
      paddingTop: '3px',
    },
    boldName: {
      fontWeight: 500,
    },
    avatar: {
      height: 33,
      width: 33,
    },
    selectedPersonDiv: {
      backgroundColor: '#E8ECF1',
    },
    personsList: {
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
  });

  const classes = useStyles();

  const [searchedData, setSearchedData] = useState<PersonProps[] | undefined>(
    () => data,
  );

  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setSearchedData(data);
    setSearchTerm('');
  }, [data]);

  const handleSearchChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchedData(data);
    } else {
      const data1: PersonProps[] = [];
      data?.filter((item) => {
        if (
          item.name?.toLowerCase().includes(searchTerm.trim().toLowerCase())
        ) {
          data1.push(item);
        }
        return item.name
          ?.toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      }),
        setSearchedData(data1);
    }
  }, [searchTerm]);

  return (
    <>
      <Grid>
        <Typography
          variant="h2"
          color="textPrimary"
          className={classes.heading}
        >
          Select a person
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.textFieldDiv}
          spacing={2}
        >
          <Grid item>
            <TextField
              inputProps={{ style: { color: '#000', opacity: 1 } }}
              className={classes.input}
              variant="outlined"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                classes: { input: classes.input },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined className={classes.searchIcon} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid className={classes.personsList}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {searchedData &&
              searchedData
                ?.slice()
                .sort((a: PersonProps | null, b: PersonProps | null) =>
                  a && b && a.value !== undefined && b.value !== undefined
                    ? b?.value - a?.value
                    : 0,
                )
                .map((item: PersonProps, index: number) => (
                  <Grid
                    item
                    className={classes.personDiv}
                    key={item.id}
                    onClick={() => selectPerson && selectPerson(item)}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      style={{ height: '100%', width: '100%' }}
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          // alignItems="center"
                          spacing={5}
                        >
                          <Grid item>
                            <Avatar
                              style={{ fontSize: '16px' }}
                              src={item.avatar}
                              className={classes.avatar}
                              children={
                                item.name &&
                                item.lastName &&
                                item.name.charAt(0) + item.lastName.charAt(0)
                              }
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h5"
                              color="textPrimary"
                              className={classes.name}
                            >
                              {item.name} {item.lastName}
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
                          {prefix}
                          {item?.value
                            ? suffix === 'Days'
                              ? _n_(item?.value, '0,0a')
                              : _n_(item?.value, '0,0.0a')
                            : item.value}{' '}
                          {suffix}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BubbleChartPopup;
