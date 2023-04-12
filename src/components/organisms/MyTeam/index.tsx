import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import Diversity from '../../molecules/Diversity';
import MyTeamTree from '../../molecules/MyTeamTree';

export interface MyTeamProps {
  data?: any;
  span?: number | null;
  levels?: number | null;
  male?: number | null;
  female?: number | null;
  total?: number | null;
  target?: number | null;
  quarter: number;
  targetYear?: number | null;
}

const MyTeam: React.FC<MyTeamProps> = ({ data, ...props }: MyTeamProps) => {
  const useStyles = makeStyles({
    root: {
      height: 350,
    },

    spanText: {
      marginRight: 20,
      textTransform: 'uppercase',
    },
    secondElement: {
      marginTop: 20,
      // heigth: 30,
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 18px 0px ' + COLORS.REPORTS_BOX_SHADOW,
      backgroundColor: COLORS.GENERAL_WHITE,
      // paddingLeft: '4%',
    },
    fullHeight: {
      marginTop: 15,
      marginBottom: -10,
      // height: '120%',
      paddingLeft: '3%',
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <>
      <Grid container direction="column" data-testid="myTeamWidget">
        <Grid item className={classes.root}>
          <WidgetCard>
            <MyTeamTree data={data} />
          </WidgetCard>
        </Grid>

        <Grid item className={classes.secondElement}>
          {/* <WidgetCard> */}
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.fullHeight}
          >
            <Grid item>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={`${globalClasses.body1WidgetTitle} ${classes.spanText}`}
              >
                {' '}
                {_t_('Span/Levels')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                color="textPrimary"
                data-testid="spanLevelValue"
              >
                {props.span}/{props.levels}
              </Typography>
            </Grid>
          </Grid>
          {/* </WidgetCard> */}
        </Grid>
        <Grid item style={{ marginTop: 10 }}>
          <WidgetCard>
            <Diversity
              quarter={props.quarter}
              male={props.male}
              female={props.female}
              target={props.target}
              targetYear={props.targetYear}
              total={props.total}
              reports={false}
            />
          </WidgetCard>
        </Grid>
      </Grid>
    </>
  );
};

export default MyTeam;
