import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Equity from './index';

export default {
  title: 'Organisms/MyEarningsEquity',
  component: Equity,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 302, height: 192 }}>
    <Equity />
  </div>
);

export const Default = Template.bind({});
