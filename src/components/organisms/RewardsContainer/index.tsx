import { QueryResult, useQuery } from '@apollo/client';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import CommisionCases from '../ComissionCases';
import CommisionStructure from '../ComissionStructure';
import { GetRepDashboardData } from '../../../gql/queries/repDashboard';

import { repDashboardData as RepDashboardData } from '../../../gql/types';
import Loader from '../../atoms/Loader';

interface RewardsContainerProps {
  startDate: string;
  endDate: string;
}

const useStyles = makeStyles({
  item: {
    // borderRadius: 4,
    // border: '1px solid ' + COLORS.BORDER_PRIMARY,
    // boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
  },
  mainDiv: {
    marginTop: '0.8rem',
  },
});

const RewardsContainer: React.FC<RewardsContainerProps> = ({
  startDate,
  endDate,
}: RewardsContainerProps) => {
  const classes = useStyles();
  const {
    loading,
    error,
    data,
    refetch,
  }: QueryResult<RepDashboardData> = useQuery(GetRepDashboardData, {
    variables: {
      repDashboardInput: {
        startDate: startDate,
        endDate: endDate,
        thresholdValue: 1,
      },
    },
  });

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) return <>`Error! ${error.message}` </>;

  return (
    <Grid container direction="row" className={classes.mainDiv} spacing={3}>
      <Grid item xs={6}>
        <div className={classes.item} style={{ height: 348 }}>
          <CommisionStructure
            data={data?.RepDashboardData?.rewards?.commissionStructure}
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.item} style={{ height: 348 }}>
          <CommisionCases
            data={data?.RepDashboardData?.rewards?.commissionCases}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default RewardsContainer;
