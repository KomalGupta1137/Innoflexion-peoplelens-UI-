import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { _t_ } from '../../../utils/translation/translation';
import { COLORS, plTheme } from '../../../plTheme';
import SalesOKR from '../SalesOKR';
import PerformanceSummary from '../PerformanceSummary';

import { QueryResult, useQuery } from '@apollo/client';
import Loader from '../../atoms/Loader';
import { GetSalesOKR } from '../../../gql/queries/salesOKR';
import { RepDashboardData as DashboardData } from '../../../gql/types';
interface OkrPerformancesProps {
  startDate: string;
  endDate: string;
}
const OkrPerformances: React.FC<OkrPerformancesProps> = ({
  startDate,
  endDate,
}: OkrPerformancesProps) => {
  const useStyles = makeStyles({
    subtitle: {
      marginTop: 13,
      fontWeight: 300,
    },
    calendarIcon: {
      width: 22,
      height: 24,
    },
    item: {},
    mainDiv: {
      marginTop: '0.8rem',
    },
    heading: {
      marginTop: 60,
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

  const dropDownDates = [
    {
      name: 'SEMI ANNUAL (H1)',
      startDate: startDate,
      endDate: endDate,
      value: 1,
    },
    {
      name: 'SEMI ANNUAL (H2)',
      startDate: startDate,
      endDate: endDate,
      value: 2,
    },
  ];
  const classes = useStyles();
  const {
    loading: loading2,
    error: error2,
    data: data2,
    refetch: refetch2,
  }: QueryResult<DashboardData> = useQuery(GetSalesOKR, {
    variables: {
      repDashboardInput: {
        startDate: startDate,
        endDate: endDate,
      },
    },
  });
  useEffect(() => {
    void refetch2();
  }, [refetch2]);

  if (error2) return <>`Error! ${error2.message}` </>;

  return (
    <>
      {' '}
      {loading2 && <Loader />}
      <Grid container direction="row" className={classes.mainDiv} spacing={3}>
        <Grid item xs={6}>
          <div className={classes.item} style={{ height: 532 }}>
            <SalesOKR salesokr={data2?.RepDashboardData?.okrName} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.item} style={{ height: 532 }}>
            <PerformanceSummary
              okrPerformance={data2?.RepDashboardData?.okrSummary}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default OkrPerformances;
