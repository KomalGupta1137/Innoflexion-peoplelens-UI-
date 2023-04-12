import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import RepComparisonSalesActivities from '.';

export default {
  title: 'MOLECULES/RepComparisonSalesActivities',
  component: RepComparisonSalesActivities,
};

const Template: Story = (args) => (
  <RepComparisonSalesActivities
    headingName="Sales Activity"
    firstPersonValue={80}
    secondPersonValue={80}
    benchmarkValue={50}
    index={0}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  headingName: 'Sales Activity',
  benchmarkValue: 50,
  firstPersonValue: 80,
  secondPersonValue: 80,
  index: 0,
};
