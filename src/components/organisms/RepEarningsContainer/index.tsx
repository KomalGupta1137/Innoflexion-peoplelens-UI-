/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Scenarios from '../../molecules/MyEarningScenarios';
import Equity from '../../molecules/MYEarningsEquity';
import TotalComparision from '../../molecules/MyEarningTotalComparision';
import { repDashboardData as RepDashboardData } from '../../../gql/types';

interface RepEarningsContainerProps {
  data: RepDashboardData | undefined;
}

const useStyles = makeStyles({
  item: {
    // borderRadius: 4,
    // border: '1px solid ' + COLORS.BORDER_PRIMARY,
    // boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
  },
  mainDiv: {
    marginTop: '0.73rem',
  },
});

const RepEarningsContainer: React.FC<RepEarningsContainerProps> = ({
  data,
}: RepEarningsContainerProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.mainDiv}
      //  style={{ marginTop: '0.3rem' }}
    >
      <Grid item>
        <div className={classes.item} style={{ height: 192 }}>
          <TotalComparision
            data={data?.RepDashboardData?.earnings?.annualComp}
            demoMode={data?.RepDashboardData?.earnings?.demoMode?.isDemoMode!}
          />
        </div>
      </Grid>
      <Grid item>
        <div className={classes.item} style={{ height: 192 }}>
          <Equity
            data={data?.RepDashboardData?.earnings?.equity}
            demoMode={true}
          />
        </div>
      </Grid>
      <Grid item>
        <div className={classes.item} style={{ height: 192 }}>
          <Scenarios
            data={data?.RepDashboardData?.earnings?.myScenarios}
            demoMode={true}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default RepEarningsContainer;
