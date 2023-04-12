import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { COLORS } from '../../../plTheme';
import LineGraph from '../../molecules/DepperInsightsGraph/index';
import close from '../../../../src/assets/close.png';
import { _t_ } from '../../../utils/translation/translation';
import { deeperInsight_deeperInsight as DashboardData } from '../../../gql/types';
import WidgetCard from '../../atoms/WidgetCard';

interface DeeperInsightsProps {
  onclose: any;
  data: DashboardData | null | undefined;
}

const useStyles = makeStyles({
  root: {
    paddingLeft: 30,
    padding: '1%',
    background: '#D9D9D9',
    opacity: 0.6,
  },
  outcomesHead: {
    color: COLORS.TEXT_HIGH_EMPHASIS,
    paddingTop: 30,
    paddingBottom: 20,
  },
  outcomeDiv: {
    paddingLeft: '5px ',
  },
  title: {
    fontWeight: 500,
    fontSize: '20px',
  },
  item: {
    height: 605,
    width: 'auto',
  },
  buttonFont: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: 14,
    textTransform: 'none',
  },
  GraphPadding: {
    paddingRight: '50px',
  },
  GraphPadding1: {
    paddingRight: '0px',
  },
  graphroot: {
    height: 400,
    width: 430,
    padding: '0 12px',
  },
});

const DeeperInsights: React.FC<DeeperInsightsProps> = ({
  onclose,
  data,
}: DeeperInsightsProps) => {
  const classes = useStyles();
  const imageClick = () => {
    onclose();
  };
  const xaxisRange = [
    [1, 5],
    [40, 80],
    [10, 50],
    [10, 50],
    [10, 100],
  ];
  const yaxisRange = [
    [30, 60],
    [30, 60],
    [200, 550],
    [300, 550],
    [0, 60],
  ];
  return (
    <>
      <div className={classes.item}>
        <Grid container direction="column" className={classes.root}>
          <Grid item>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Typography variant="h3" className={classes.title}>
                  {_t_('Deeper insights')}
                  {/* {' : '}
                  {data?.graphData?.length} */}
                </Typography>
              </Grid>
              <Grid item style={{ paddingRight: '6rem' }}>
                <img
                  src={close}
                  alt="close"
                  style={{ width: 23, height: 23 }}
                  onClick={() => imageClick()}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: 20, width: 1010 }}>
            <Grid
              container
              direction="column"
              justify="space-between"
              style={{ height: '440px', width: '915px', overflow: 'auto' }}
            >
              {data?.graphData?.map((element, index) => (
                <Grid
                  item
                  className={
                    index + 1 !== data.graphData?.length
                      ? classes.GraphPadding
                      : classes.GraphPadding1
                  }
                  key={index}
                >
                  <WidgetCard>
                    <div className={classes.graphroot}>
                      <LineGraph
                        title1={element?.title1 ? element.title1 : ''}
                        title2={element?.title2 ? element.title2 : ''}
                        series={Object.assign([], element?.series)}
                        report={false}
                        lineSeries={Object.assign([], element?.lineSeries)}
                        xaxisRange={xaxisRange[index]}
                        yaxisRange={yaxisRange[index]}
                      />
                      <div style={{ paddingTop: '2%' }}></div>
                    </div>
                  </WidgetCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: 26, paddingBottom: 15 }}>
            <Grid
              container
              direction="row"
              style={{ justifyContent: 'space-evenly', width: 915 }}
            >
              <Grid item>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  style={{ width: '300px', height: 40 }}
                  classes={{ containedSizeLarge: classes.buttonFont }}
                >
                  {_t_('Act')}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  style={{ width: '300px', height: 40 }}
                  classes={{ sizeLarge: classes.buttonFont }}
                >
                  {_t_('Do it later')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DeeperInsights;
