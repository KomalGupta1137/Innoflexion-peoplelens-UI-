import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import RepCompetencies from '../RepCompetencies';
import { getDashboardData_getDashboardData_peopleDrivers_competencies as CompetenciesData } from '../../../gql/types';
interface ReportCompetenciesWidgetProps {
  data1?: (CompetenciesData | null)[] | null;
  data2?: (CompetenciesData | null)[] | null;
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

interface page6CompetenciesDataProps {
  ratingName?: string | null;
  firstPersonRatingValue?: number | null;
  secondPersonRatingValue?: number | null;
}

const ReportCompetenciesWidget: React.FC<ReportCompetenciesWidgetProps> = ({
  data1,
  data2,
}: ReportCompetenciesWidgetProps) => {
  const page6CompetenciesData: page6CompetenciesDataProps[] = [
    { ratingName: '', firstPersonRatingValue: 0, secondPersonRatingValue: 0 },
    { ratingName: '', firstPersonRatingValue: 0, secondPersonRatingValue: 0 },
    { ratingName: '', firstPersonRatingValue: 0, secondPersonRatingValue: 0 },
    { ratingName: '', firstPersonRatingValue: 0, secondPersonRatingValue: 0 },
    { ratingName: '', firstPersonRatingValue: 0, secondPersonRatingValue: 0 },
  ];
  if (data1) {
    for (let i = 0; i < data1?.length; i++) {
      page6CompetenciesData[i].ratingName = data1[i]?.ratingName;
      page6CompetenciesData[i].firstPersonRatingValue = data1[i]?.ratingValue;
    }
  }
  if (data2) {
    for (let i = 0; i < data2?.length; i++) {
      page6CompetenciesData[i].secondPersonRatingValue = data2[i]?.ratingValue;
    }
  }

  const classes = useStyles();
  return (
    <Grid container justify="space-between" direction="column">
      {page6CompetenciesData.map(
        (item: page6CompetenciesDataProps, index: number) => (
          <Grid
            item
            className={
              index === 0 ? classes.page6Component : classes.page6NextComponent
            }
            key={index}
          >
            <RepCompetencies
              headingName={item?.ratingName}
              firstPersonRatingValue={
                item?.firstPersonRatingValue ? item?.firstPersonRatingValue : 0
              }
              secondPersonRatingValue={
                item?.secondPersonRatingValue
                  ? item?.secondPersonRatingValue
                  : 0
              }
              index={index}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
};

export default ReportCompetenciesWidget;
