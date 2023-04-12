import { QueryResult, useQuery } from '@apollo/client';
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { GetKeyDrivers } from '../../../gql/queries/keyDrivers';
import {
  keyDriversData,
  keyDriversData_keyDriversData,
} from '../../../gql/types';
import { _t_ } from '../../../utils/translation/translation';
import BarAndLineGraph from '../../molecules/BarAndLineGraph';
import { dates } from '../ManagerDashboard';

export interface KeyDriversContainerProps {
  activeQuarter?: number;
  activeProductId?: string;
}

const json = [
  {
    label: 'Graph1',
    title1: 'Product Knowledge',
    title2: 'Quota Attainment',
    legend1: 'Assessment Scores',
    legend2: 'Quota Attainment',
    series1Data: [1.0, 1.0, 3.0, 2.0],
    series2Data: [3.0, 4.0, 3.0, 2.0],
  },
  {
    label: 'Graph2',
    title1: 'Time Allocation',
    title2: 'Deal Size',
    legend1: 'Time w/ Product Teams',
    legend2: 'Deal Size',
    series1Data: [1.0, 2.0, 5.0, 4.0],
    series2Data: [3.0, 4.0, 5.0, 6.0],
  },
  {
    label: 'Graph3',
    title1: 'Pipeline Discipline',
    title2: 'Win Rate',
    legend1: 'Product Demos',
    legend2: 'Win Rate',
    series1Data: [1.0, 3.0, 5.0, 7.0],
    series2Data: [5.0, 4.0, 3.0, 2.0],
  },
];

const KeyDriversContainer: React.FC<KeyDriversContainerProps> = ({
  activeQuarter,
  activeProductId,
}: KeyDriversContainerProps) => {
  const useStyles = makeStyles({
    graphDiv: {
      padding: '2% 2% 2% 2%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      overflow: 'auto',
      padding: '0% 0% 0% 0%',
    },
  });

  const [activeProd, setActiveProd] = React.useState(activeProductId);

  useEffect(() => {
    setActiveProd(activeProductId);
  }, [activeProductId]);

  const { data, refetch }: QueryResult<keyDriversData> = useQuery(
    GetKeyDrivers,
    {
      variables: {
        keyDriversInput: {
          startDate:
            activeQuarter !== undefined ? dates[activeQuarter].startDate : '',
          endDate:
            activeQuarter !== undefined ? dates[activeQuarter].endDate : '',
          productId: activeProductId === '' ? null : activeProductId,
        },
      },
    },
  );
  
  useEffect(() => {
    void refetch();
  }, [activeQuarter, refetch, activeProd]);

  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.graphDiv}
        style={{ width: '100%', height: 363, background: data?.keyDriversData?.demoMode?.isDemoMode ? '#D9D9D9' : 'white', opacity: data?.keyDriversData?.demoMode?.isDemoMode ? 0.6 : 0 }}
      >
        <GridList
          className={classes.gridList}
          cols={3}
          style={{ width: '100%' }}
        >
          {data?.keyDriversData?.graphValues &&
            data?.keyDriversData?.graphValues.map(
              (item) =>
                item && (
                  <GridListTile
                    key={item.label}
                    style={{
                      height: '100%',
                    }}
                  >
                    <BarAndLineGraph
                      title1={_t_(item.title1 ? item.title1 : '')}
                      title2={_t_(item.title2 ? item.title2 : '')}
                      legend1={_t_(item.legend1 ? item.legend1 : '')}
                      legend2={_t_(item.legend2 ? item.legend2 : '')}
                      series1Data={item.series1Data}
                      series2Data={item.series2Data}
                    />
                  </GridListTile>
                ),
            )}
        </GridList>
      </Grid>
    </>
  );
};

export default KeyDriversContainer;
