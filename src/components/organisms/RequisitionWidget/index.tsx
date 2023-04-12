import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../plTheme';
import StaticFunnel from '../../molecules/StaticFunnel';
import WidgetCard from '../../atoms/WidgetCard';
import { _t_ } from '../../../utils/translation/translation';
import { getDashboardData_getDashboardData_peopleDrivers_requisitionInfo as DashboardRequisitionInfo } from '../../../gql/types';
import { useGlobalStyles } from '../../../plStyles';
import { _n_ } from '../../../utils/numerals/numerals';

interface RequisitionProps {
  requistionData: (DashboardRequisitionInfo | null)[] | null | undefined;
  requiredCandidates: number | null | undefined;
}

const useStyles = makeStyles({
  main: {
    marginTop: '18px',
  },

  heading: {
    marginLeft: '16.29px',
  },
  rightHeading: {
    color: COLORS.TEXT_HIGH_EMPHASIS,
    marginRight: '21.94px',
  },
  element: {
    marginTop: '50px',
    marginBottom: '60px',
  },
  root: {
    height: '422px',
  },
});

const RequisitionWidget: React.FC<RequisitionProps> = ({
  requistionData,
  requiredCandidates,
}: RequisitionProps) => {
  const classes = useStyles();
  const [totalNoOfHired, setTotalNoOfHired] = useState(0);
  const [totalNoOfCandidates, setTotalNoOfCandidates] = useState(0);
  const [totalNoOfInterviewed, setTotalNoOfInterviewed] = useState(0);
  const [
    totalNoOfRequiredCandidates,
    setTotalNoOfRequiredCandidates,
  ] = useState(requiredCandidates);

  useEffect(() => {
    if (!requistionData) {
      return;
    }
    let noOfHired = 0;
    let noOfCandidates = 0;
    let noOfInterviewed = 0;
    for (let i = 0; i < requistionData?.length; i++) {
      const value = requistionData[i]?.noOfCandidates;
      if (requistionData[i]?.requisitionStage === 'hired') {
        noOfHired += value ? value : 0;
      } else if (requistionData[i]?.requisitionStage === 'interviewing') {
        noOfInterviewed += value ? value : 0;
      } else if (requistionData[i]?.requisitionStage === 'rejected') {
        noOfInterviewed += value ? value : 0;
      }
      noOfCandidates += value ? value : 0;
    }

    if (noOfHired === 0 && noOfCandidates === 0 && noOfInterviewed === 0) {
      setTotalNoOfRequiredCandidates(0);
    }
    setTotalNoOfHired(noOfHired);
    setTotalNoOfInterviewed(noOfInterviewed);
    setTotalNoOfCandidates(noOfCandidates);
  }, [requistionData, requiredCandidates]);

  const globalClasses = useGlobalStyles();
  return (
    <WidgetCard>
      <Grid
        container
        justify="space-between"
        direction="column"
        className={classes.root}
        data-testid="requistionWidget"
      >
        <Grid item>
          <Grid
            container
            justify="space-between"
            direction="row"
            className={classes.main}
          >
            <Grid item>
              <Typography
                className={`${globalClasses.body1WidgetTitle} ${classes.heading}`}
              >
                {' '}
                {_t_('RECRUITING')}{' '}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" className={classes.rightHeading}>
                {' '}
                {_t_('REQS')} :{' '}
                {totalNoOfRequiredCandidates &&
                  _n_(totalNoOfRequiredCandidates, '0,0')}{' '}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.element}>
          <StaticFunnel
            totalNoOfCandidates={totalNoOfCandidates}
            totalNoOfHired={totalNoOfHired}
            totalNoOfInterviewed={totalNoOfInterviewed}
          />
        </Grid>
      </Grid>
    </WidgetCard>
  );
};

export default RequisitionWidget;
