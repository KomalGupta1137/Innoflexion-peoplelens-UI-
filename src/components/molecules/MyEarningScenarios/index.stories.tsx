import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Scenarios from './index';

export default {
  title: 'Organisms/MyEarningsscenarios',
  component: Scenarios,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 302, height: 192 }}>
    <Scenarios />
  </div>
);

export const Default = Template.bind({});
