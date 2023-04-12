import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';

import ReportSalesActivity from '../../atoms/ReportSalesActivity';
import { _t_ } from '../../../utils/translation/translation';

interface RepComparisonSalesActivitiesProps {
  headingName: string;
  firstPersonValue?: number;
  secondPersonValue: number;
  benchmarkValue: number;
  index: number;
}

const RepComparisonSalesActivities: React.FC<RepComparisonSalesActivitiesProps> = ({
  headingName,
  firstPersonValue,
  secondPersonValue,
  benchmarkValue,
  index,
}: RepComparisonSalesActivitiesProps) => {
  const useStyles = makeStyles({
    root: {
      // width: '784px',
      width: '90%',
      height: '45px',
      backgroundColor: COLORS.REPORTPAGE6BACKGROUNDCOLOR,
      border:
        index == 1 ? '1px solid #2E6FF2' : '1px solid rgba(215, 223, 233, 0.2)',
      position: 'relative',
      marginLeft: 50,
      marginRight: 50,
    },
    heading: {
      lineHeight: '20px',
      color: COLORS.REPCOMPARISONHEADINGCOLOR,
      marginLeft: -5, // change fro subpage2 from 24 to
      width: '172px',
      marginTop: 10,
      fontWeight: 400,
    },
    headingElement: {
      // marginTop: 14,
    },
    firstProgressBarElement: {
      marginLeft: -10, // change for subpage2 from 80 to
    },
    secondProgressBarElement: {
      marginRight: -40, // change for subpage2 from -15 to
    },
  });
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h5" className={classes.heading}>
          {_t_(headingName)}
        </Typography>
      </Grid>
      <Grid item>
        <ReportSalesActivity
          value={firstPersonValue}
          benchmarkValue={benchmarkValue}
        />
      </Grid>
      <Grid item>
        <ReportSalesActivity
          value={secondPersonValue}
          benchmarkValue={benchmarkValue}
        />
      </Grid>
    </Grid>
  );
};

export default RepComparisonSalesActivities;
