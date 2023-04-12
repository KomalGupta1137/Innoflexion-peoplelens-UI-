import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import WidgetCard from '../../atoms/WidgetCard';
import Progressbar from '../../molecules/Progressbar';

interface RepActivityBenchmarksProps {
  benchmarks: {
    name: string;
    value: number;
    percentage: number;
    benchmarkValue: number | null | undefined;
  }[];
}

const RepActivityBenchmarks: React.FC<RepActivityBenchmarksProps> = ({
  benchmarks,
}: RepActivityBenchmarksProps) => {
  const useStyles = makeStyles({
    root: {
      padding: 16,
      height: 728,
      // background: '#D9D9D9'
    },
    leftHeading: {
      marginTop: 15,
    },
  });

  const classes = useStyles();
  return (
    <>
      <WidgetCard>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          {benchmarks.map((item, index: number) => (
            <Grid item key={index} className={classes.leftHeading}>
              <Progressbar
                name={item.name}
                value1={item.value}
                value2={item.value}
                benchmarkValue={item.benchmarkValue ? item.benchmarkValue : 0}
                percentage={item.percentage}
              />
            </Grid>
          ))}
        </Grid>
      </WidgetCard>
    </>
  );
};

export default RepActivityBenchmarks;
