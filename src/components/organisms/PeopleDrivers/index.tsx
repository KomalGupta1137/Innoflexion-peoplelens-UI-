import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { getDashboardData_getDashboardData_peopleDrivers as DashboardData } from '../../../gql/types';
import { COLORS } from '../../../plTheme';
import '../../../utils/translation/translation';
import { _t_ } from '../../../utils/translation/translation';
import AttritionRate from '../../molecules/AttritionRate';
import AvgTimeToHire from '../../molecules/AvgTimeToHire';
import MyTeam from '../MyTeam';
import RequisitionWidget from '../RequisitionWidget';
import RatingChartWidget from '../RatingChartWidget';
import WidgetCard from '../../atoms/WidgetCard';

export interface PeopleDriversProps {
  data: DashboardData | null | undefined;
  activeQuarter: number;
}

const PeopleDrivers: React.FC<PeopleDriversProps> = ({
  data,
  activeQuarter,
}: PeopleDriversProps) => {
  const useStyles = makeStyles({
    outcomesHead: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      paddingTop: 30,
    },
    outcomeDiv: {
      padding: '25px 0px',
      marginBottom: 25,
    },
    item: {
      borderRadius: 4,
      // border: '1px solid ' + COLORS.BORDER_PRIMARY,
      // boxShadow: '0px 4px 20px ' + COLORS.BOX_SHADOW_CARDS,
    },
    parent: {
      // border: "1px solid black",
      height: 530,
    },
    fullWidth: {
      width: '100%',
    },
    requistionElement: {
      height: 422,
    },
  });

  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" className={classes.outcomesHead}>
        {_t_('People Drivers')}
      </Typography>
      <Grid
        container
        direction="row"
        className={classes.outcomeDiv}
        spacing={3}
      >
        <Grid item xs={4} className={`${classes.parent}`}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.fullWidth}>
              <MyTeam
                data={data?.myTeam}
                span={data?.spanLevel?.span}
                levels={data?.spanLevel?.level}
                male={data?.diversity?.noOfMale}
                female={data?.diversity?.noOfFemale}
                target={data?.diversity?.targetCount}
                total={data?.diversity?.total}
                targetYear={data?.diversity?.targetYear}
                quarter={activeQuarter}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} className={`${classes.parent}`}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <RequisitionWidget
                requistionData={data?.requisitionInfo}
                requiredCandidates={data?.requiredCandidates}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={6}>
                  <div className={classes.item} style={{ height: 152 }}>
                    <WidgetCard>
                      <AttritionRate
                        currVal={data?.attrition?.rateInCurrentQuarter}
                        prevVal={data?.attrition?.rateInSameQuarterPreviousYear}
                      />
                    </WidgetCard>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.item} style={{ height: 152 }}>
                    <WidgetCard>
                      <AvgTimeToHire value={data?.avgTimeToHire} />
                    </WidgetCard>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.item} style={{ height: 588 }}>
            <WidgetCard>
              <RatingChartWidget data={data?.competencies} reports={false} />
            </WidgetCard>
          </div>
          {/* <div className={classes.item} style={{ height: 588 }}></div> */}
        </Grid>
      </Grid>
    </>
  );
};

export default PeopleDrivers;
