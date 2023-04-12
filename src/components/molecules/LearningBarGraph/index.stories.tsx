import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import LearningBarGraph, { ChartSeriesProps } from './index';

export default {
  title: 'Molecules/LearningBarGraph',
  component: LearningBarGraph,
} as Meta;

const chartData: ChartSeriesProps[] = [
  {
    name: 'Not Started',
    value: 1,
  },
  {
    name: 'In-Progress',
    value: 1,
  },
  {
    name: 'Completed',
    value: 3,
  },
];

const Template: Story = (args) => (
  <div style={{ width: 350 }}>
    <LearningBarGraph
      title="Learning Module Participation"
      data={chartData}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

// Default.args = {
//   closed: 45.9,
//   forecast: 43.2,
// };
