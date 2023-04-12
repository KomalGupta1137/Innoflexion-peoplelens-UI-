import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import StaticFunnel from './index';

export default {
  title: 'molecules/StaticFunnel',
  component: StaticFunnel,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: '500px', height: '421.92px' }}>
    <StaticFunnel
      totalNoOfCandidates={0}
      totalNoOfInterviewed={0}
      totalNoOfHired={0}
      {...args}
    />{' '}
  </div>
);

export const Default = Template.bind({});

Default.args = {
  totalNoOfCandidates: 0,
  totalNoOfInterviewed: 0,
  totalNoOfHired: 0,
};
