import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { getDashboardData_getDashboardData_peopleDrivers_competencies as DashboardCompetencies } from '../../../gql/types';
import RatingChartWidget from './index';

export default {
  title: 'Organisms/RatingChartWidget',
  component: RatingChartWidget,
};

const data: DashboardCompetencies[] = [
  {
    ratingName: 'Leadership',
    ratingValue: 4,
    __typename: 'Competency',
  },
  {
    ratingName: 'Strategy',
    ratingValue: 3,
    __typename: 'Competency',
  },
  {
    ratingName: 'Communication',
    ratingValue: 3,
    __typename: 'Competency',
  },
  {
    ratingName: 'Product Knowledge',
    ratingValue: 2,
    __typename: 'Competency',
  },
  {
    ratingName: 'Technical Skills',
    ratingValue: 3,
    __typename: 'Competency',
  },
];

const Template: Story = (args) => (
  <div style={{ width: '500px', height: '900px' }}>
    <RatingChartWidget data={data} reports={false} {...args} />
  </div>
);

export const Default = Template.bind({});
