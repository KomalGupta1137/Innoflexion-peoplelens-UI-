import React from 'react';
import SpiderChart from '.';

import { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'molecules/SpiderChart',
  component: SpiderChart,
};

const Template: Story = (args) => (
  <SpiderChart
    chartData={[85, 90, 46, 65, 85]}
    chartDataCategories={[
      'Objective/Activity',
      'Time Allocation',
      'Pipeline Discipline',
      'Followup Ratio',
      'Account Activity',
    ]}
    {...args}
  />
);

// const Template = () => <SpiderChart chartData={chartData} chartDataCategories={chartDataCategories} />;

export const Default = Template.bind({});

Default.args = {
  chartData: [85, 90, 46, 65, 85],
  chartDataCategories: [
    'Objective/Activity',
    'Time Allocation',
    'Pipeline Discipline',
    'Followup Ratio',
    'Account Activity',
  ],
};
