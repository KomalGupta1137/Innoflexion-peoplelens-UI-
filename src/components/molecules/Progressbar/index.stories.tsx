import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Progressbar from '.';

export default {
  title: 'Molecules/Progressbar',
  component: Progressbar,
};

const Template: Story = (args) => (
  <Progressbar
    name="Objective / Activity"
    value1={85}
    value2={85}
    benchmarkValue={50}
    percentage={-28}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  name: 'Objective / Activity',
  value: 85,
  benchmarkValue: 50,
  percentage: -28,
};
