import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles } from '@material-ui/core';
import { _t_ } from '../../../utils/translation/translation';
import { COLORS } from '../../../plTheme';
import WidgetCard from '../../atoms/WidgetCard';
import RatingChart from '../../molecules/RatingChart';
import { getDashboardData_getDashboardData_peopleDrivers_competencies as DashboardCompetencies } from '../../../gql/types';
import { useGlobalStyles } from '../../../plStyles';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';

interface RatingChartWidgetProps {
  data: (DashboardCompetencies | null)[] | null | undefined;
  reports: boolean | null;
}

const RatingChartWidget: React.FC<RatingChartWidgetProps> = ({
  data,
  reports,
}: RatingChartWidgetProps) => {
  const [width] = useWindowSize();
  const useStyles = makeStyles({
    ratingElement: {
      marginBottom: 3,
      marginRight: 21,
      marginLeft: '1rem',
    },
    reportsratingElement: {
      marginBottom: 3,
      marginLeft: '1rem',
    },
    main: {
      marginTop: '20',
      marginLeft: 21.08,
    },
    subHeading: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginLeft: 19.24,
      //  marginTop: '70px',
    },
    root: {
      height: '100%',
    },
    subElement1: {},
    subElement2: {
      marginBottom: 6.5,
    },
  });
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      data-testid="RatingChart"
    >
      <Grid item className={classes.main}>
        <Typography className={globalClasses.body1WidgetTitle}>
          {_t_('COMPETENCIES')}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" justify="space-between">
          {data &&
            data.map((item, index) => (
              <Grid
                item
                key={item?.ratingName}
                style={
                  reports ? { marginTop: '2rem' } : { marginTop: '4rem' }
                  // index + 1 === data.length
                  //   ? { marginTop: '4rem' }
                  //   : { marginTop: '4rem' }
                }
              >
                <Grid
                  container
                  justify="space-between"
                  direction="row"
                  className={classes.subElement1}
                >
                  <Grid item className={classes.subElement2}>
                    <Typography
                      className={classes.subHeading}
                      variant="h5"
                      style={{ width: '100%' }}
                    >
                      {item?.ratingName}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className={classes.ratingElement}
                    //style={{ width: '100%' }}
                  >
                    <RatingChart
                      value={item?.ratingValue}
                      indicator={'default'}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RatingChartWidget;
