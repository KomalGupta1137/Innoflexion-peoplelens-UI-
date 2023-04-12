import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../../plTheme';
import RatingChart from '../RatingChart';

interface RepCompetenciesProps {
  headingName?: string | null;
  firstPersonRatingValue?: number | null;
  secondPersonRatingValue?: number | null;
  index?: number;
}

const RepCompetencies: React.FC<RepCompetenciesProps> = ({
  headingName,
  firstPersonRatingValue,
  secondPersonRatingValue,
  index,
}: RepCompetenciesProps) => {
  const useStyles = makeStyles({
    root: {
      width: '90%',
      height: '40px',
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
      marginLeft: 20,
      width: '172px',
      fontWeight: 400,
    },
    headingElement: {
      marginTop: 10,
    },
    ratingChartElement: {
      marginTop: 5,
      marginLeft: 30,
    },
    secondRatingChartElement: {
      marginTop: 5,
      marginRight: -30,
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
      <Grid item className={classes.headingElement} xs={4}>
        <Typography variant="h5" className={classes.heading}>
          {headingName}
        </Typography>
      </Grid>
      <Grid item className={classes.ratingChartElement} xs={4}>
        <RatingChart value={firstPersonRatingValue} indicator={'nonDefault'} />
      </Grid>
      <Grid item className={classes.secondRatingChartElement} xs={4}>
        <RatingChart value={secondPersonRatingValue} indicator={'nonDefault'} />
      </Grid>
    </Grid>
  );
};

export default RepCompetencies;
