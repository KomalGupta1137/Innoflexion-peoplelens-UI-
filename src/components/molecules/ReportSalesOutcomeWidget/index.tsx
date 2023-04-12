/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { getDashboardData_getDashboardData_salesOutcome as SalesOutComeData } from '../../../gql/types';
import { report_report as ReportResponse } from '../../../gql/types';
import RepComparisonSalesOutcome from '../RepComparisonSalesOutcome';

interface ReportSalesOutcomeWidgetProps {
  data1?: SalesOutComeData | null;
  data2?: SalesOutComeData | null;
  reportData?: ReportResponse | null;
  reportData1?: ReportResponse | null;
}
const useStyles = makeStyles({
  page6MainComponent: {
    marginTop: 10,
    marginLeft: -25,
  },
  page6NextComponent: {
    marginTop: 10,
    marginLeft: -25,
  },
});

const ReportSalesOutcomeWidget: React.FC<ReportSalesOutcomeWidgetProps> = ({
  data1,
  data2,
  reportData,
  reportData1,
}: ReportSalesOutcomeWidgetProps) => {
  const page6SalesOutcomeData = [
    {
      type: 'amount',
      headingName: 'Sales Closed ($ 000)',
      firstPersonTotalValue: data1?.totalSalesClosed?.overallTotalSalesClosed,
      secondPersonTotalValue: data2?.totalSalesClosed?.overallTotalSalesClosed,
      avgValue: reportData?.salesClosed?.avgSalesClosed,
      maxValue: reportData?.salesClosed?.maxSalesClosed,
      minValue: reportData?.salesClosed?.minSalesClosed,
    },
    {
      type: 'dealsClosed',
      headingName: 'Deals Closed',
      firstPersonTotalValue: data1?.noOfDeals,
      secondPersonTotalValue: data2?.noOfDeals,
      avgValue: reportData?.dealsClosed?.avgDealsClosed,
      maxValue: reportData?.dealsClosed?.maxDealsClosed,
      minValue: reportData?.dealsClosed?.minDealsClosed,
    },
    {
      type: 'dealSizeAmount',
      headingName: 'Deal Size ($ 000)',
      firstPersonTotalValue:
        data1?.totalSalesClosed?.overallTotalSalesClosed &&
        data1?.noOfDeals &&
        Math.round(
          data1?.totalSalesClosed?.overallTotalSalesClosed / data1?.noOfDeals,
        ),
      secondPersonTotalValue:
        data2?.totalSalesClosed?.overallTotalSalesClosed &&
        data2?.noOfDeals &&
        Math.round(
          data2?.totalSalesClosed?.overallTotalSalesClosed / data2?.noOfDeals,
        ),
      avgValue:
        data1?.totalSalesClosed?.overallTotalSalesClosed &&
        data1?.noOfDeals &&
        data2?.totalSalesClosed?.overallTotalSalesClosed &&
        data2?.noOfDeals &&
        (data1?.totalSalesClosed?.overallTotalSalesClosed / data1?.noOfDeals +
          data2?.totalSalesClosed?.overallTotalSalesClosed / data2?.noOfDeals) /
          2,
      maxValue: reportData?.dealSize?.maxDealSize,
      minValue: reportData?.dealSize?.minDealSize,
      // avgValue:
      //   reportData?.salesClosed?.avgSalesClosed &&
      //   reportData?.dealsClosed?.avgDealsClosed &&
      //   Math.round(
      //     reportData?.salesClosed?.avgSalesClosed /
      //       reportData?.dealsClosed?.avgDealsClosed,
      //   ),
      // reportData?.salesClosed?.maxSalesClosed &&
      // reportData?.dealsClosed?.maxDealsClosed &&
      // Math.round(
      //   reportData?.salesClosed?.maxSalesClosed /
      //     reportData?.dealsClosed?.maxDealsClosed,
      // ),
    },
    {
      type: 'percentage',
      headingName: 'Quota Attainment',
      firstPersonTotalValue:
        data1?.quotaAttainment && Math.round(data1?.quotaAttainment),
      secondPersonTotalValue:
        data2?.quotaAttainment && Math.round(data2?.quotaAttainment),
      avgValue: reportData?.quotaAttainment?.avgQuotaAttainment,
      maxValue: reportData?.quotaAttainment?.maxQuotaAttainment,
      minValue: reportData?.quotaAttainment?.minQuotaAttainment,
    },
    {
      type: 'winRatePercentage',
      headingName: 'Win Rate',
      firstPersonTotalValue: data1?.winRate && Math.round(data1?.winRate),
      secondPersonTotalValue: data2?.winRate && Math.round(data2?.winRate),
      avgValue: reportData?.winRate?.avgWinRate,
      maxValue: reportData?.winRate?.maxWinRate,
      minValue: reportData?.winRate?.minWinRate,
    },
    {
      type: 'days',
      headingName: 'Sales Cycle (Days)',
      firstPersonTotalValue: reportData?.salesCylce?.totalSalesCycle,
      secondPersonTotalValue: reportData1?.salesCylce?.totalSalesCycle,
      avgValue: reportData?.salesCylce?.avgSalesCycle,
      maxValue: reportData?.salesCylce?.maxSalesCycle,
      minValue: reportData?.salesCylce?.minSalesCycle,
    },
  ];

  const classes = useStyles();

  return (
    <Grid container justify="space-between" direction="column">
      {page6SalesOutcomeData.map((item, index) => (
        <Grid
          item
          className={
            index === 0
              ? classes.page6MainComponent
              : classes.page6NextComponent
          }
          key={index}
        >
          <RepComparisonSalesOutcome
            type={item.type}
            firstPersonValue={item.firstPersonTotalValue}
            secondPersonValue={item.secondPersonTotalValue}
            headingName={item.headingName}
            maxValue={item.maxValue}
            minValue={item.minValue}
            avgValue={item.avgValue}
            index={index}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportSalesOutcomeWidget;
