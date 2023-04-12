import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { getDashboardData_peopleActivities as SalesActivitiesData } from '../../../gql/types';
import RepComparisonSalesActivities from '../RepComparisonSalesActivities';

interface ReportSalesActivitiesWidgetProps {
  data1?: SalesActivitiesData | null;
  data2?: SalesActivitiesData | null;
}

const useStyles = makeStyles({
  page6Component: {
    marginTop: 5,
    marginLeft: -25,
  },
  page6NextComponent: {
    marginTop: 10,
    marginLeft: -25,
  },
});
const ReportSalesActivitiesWidget: React.FC<ReportSalesActivitiesWidgetProps> = ({
  data1,
  data2,
}: ReportSalesActivitiesWidgetProps) => {
  const classes = useStyles();
  const page6SalesActivitiesData = [
    {
      name: 'Total Activity',
      firstPersonValue: Math.round(
        Number(data1?.objectiveScore?.curQuarterVal),
      ),
      secondPersonValue: Math.round(
        Number(data2?.objectiveScore?.curQuarterVal),
      ),
      benchmarkValue: Number(data1?.objectiveScore?.benchMark),
    },
    {
      name: 'Customer Activity',
      firstPersonValue: Math.round(
        Number(data1?.timeAllocationScore?.curQuarterVal),
      ),
      secondPersonValue: Math.round(
        Number(data2?.timeAllocationScore?.curQuarterVal),
      ),
      benchmarkValue: Number(data1?.timeAllocationScore?.benchMark),
    },
    {
      name: 'Pipeline Discpline',
      firstPersonValue: Math.round(
        Number(data1?.pipelineDisciplineScore?.curQuarterVal),
      ),
      secondPersonValue: Math.round(
        Number(data2?.pipelineDisciplineScore?.curQuarterVal),
      ),
      benchmarkValue: Number(data1?.pipelineDisciplineScore?.benchMark),
    },
    {
      name: 'Followup Ratio',
      firstPersonValue: Math.round(Number(data1?.followThrough?.curQuarterVal)),
      secondPersonValue: Math.round(
        Number(data2?.followThrough?.curQuarterVal),
      ),
      benchmarkValue: Number(data1?.followThrough?.benchMark),
    },
  ];

  return (
    <Grid container justify="space-between" direction="column">
      {page6SalesActivitiesData.map((item, index) => (
        <Grid
          item
          className={
            index === 0 ? classes.page6Component : classes.page6NextComponent
          }
          key={index}
        >
          <RepComparisonSalesActivities
            secondPersonValue={item.secondPersonValue}
            firstPersonValue={item.firstPersonValue}
            benchmarkValue={item.benchmarkValue}
            headingName={item.name}
            index={index}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportSalesActivitiesWidget;
