import { QueryResult, useQuery } from '@apollo/client';
import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { GetLearningData } from '../../../gql/queries/learning';
import {
  getLearningData,
  getLearningData_getLearningData,
} from '../../../gql/types';
import { _t_ } from '../../../utils/translation/translation';
import LearningBarGraph from '../../molecules/LearningBarGraph';
import { dates } from '../ManagerDashboard';

export interface LearningContainerProps {
  activeQuarter?: number;
  activeProductId?: string;
}

const LearningContainer: React.FC<LearningContainerProps> = ({
  activeQuarter,
  activeProductId,
}: LearningContainerProps) => {
  const useStyles = makeStyles({
    graphDiv: {
      height: '100%',
      padding: '4% 3.8%',
    },
  });

  const [activeProd, setActiveProd] = React.useState(activeProductId);

  useEffect(() => {
    setActiveProd(activeProductId);
  }, [activeProductId]);

  const { data, refetch }: QueryResult<getLearningData> = useQuery(
    GetLearningData,
    {
      variables: {
        learningInput: {
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

  // eslint-disable-next-line camelcase
  const learningData: getLearningData_getLearningData | null | undefined =
    data?.getLearningData;

  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ width: '100%', height: 363 }}
      >
        <Grid item xs={4} className={classes.graphDiv}>
          <LearningBarGraph
            title={_t_('Learning Module Participation')}
            data={learningData?.learningParticipation}
          />
        </Grid>
        <Grid item xs={4} className={classes.graphDiv}>
          <LearningBarGraph
            title={_t_('Learner Assessment')}
            data={learningData?.learnerAssessments}
          />
        </Grid>
        <Grid item xs={4} className={classes.graphDiv}>
          {' '}
          <LearningBarGraph
            title={_t_('Learner Satisfaction')}
            data={learningData?.learnerSatisfaction}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LearningContainer;
