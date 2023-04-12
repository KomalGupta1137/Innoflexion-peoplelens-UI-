import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import RepComparisonComponent from '.';

export default {
  title: 'MOLECULES/RepComparisonComponent',
  component: RepComparisonComponent,
};

const Template: Story = (args) => (
  <RepComparisonComponent
    type="amount"
    headingName="Sales Closed ($ 000)"
    firstPersonValue={360}
    secondPersonValue={1080}
    index={0}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  type: 'amount',
  headingName: 'Sales Closed ($ 000)',
  firstPersonValue: 360,
  secondPersonValue: 1080,
  index: 0,
};
