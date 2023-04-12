import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceSummary from './index';
import { RepDashboardData_RepDashboardData_okrSummary as summaryData } from '../../../gql/types';

export default {
  title: 'Organisms/PerformanceSummary',
  component: PerformanceSummary,
} as Meta;
const okrsummary: summaryData = {
  __typename: 'OKRSummaryOutput',
  rating: 4,
  competency: [
    {
      __typename: 'CompetencyOutput',
      name: 'Competency',
      values: [
        {
          __typename: 'Score',
          title: 'Technical Skills',
          managerScore: 4,
          selfScore: 5,
        },
        {
          __typename: 'Score',
          title: 'Strategy',
          managerScore: 3,
          selfScore: 2,
        },
        {
          __typename: 'Score',
          title: 'Communication',
          managerScore: 4,
          selfScore: 3,
        },
        {
          __typename: 'Score',
          title: 'Closing Skills',
          managerScore: 4,
          selfScore: 3,
        },
        {
          __typename: 'Score',
          title: 'Product Knowledge',
          managerScore: 4,
          selfScore: 3.5,
        },
      ],
    },

    {
      __typename: 'CompetencyOutput',
      name: 'Development Needs',
      values: [
        {
          __typename: 'Score',
          title: 'Domain Expertise',
          managerScore: 4,
          selfScore: 3,
        },
        {
          __typename: 'Score',
          title: 'Problem Solving',
          managerScore: 3,
          selfScore: 2,
        },
      ],
    },
  ],
};
const Template: Story = (args) => (
  <div style={{ width: 410 }}>
    <PerformanceSummary okrPerformance={okrsummary} />{' '}
  </div>
);

export const Default = Template.bind({});
