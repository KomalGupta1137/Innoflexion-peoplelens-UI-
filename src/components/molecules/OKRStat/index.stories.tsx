import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import OKRStat from './index';

export default {
  title: 'Molecules/OKRState',
  component: OKRStat,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 410 }}>
    <OKRStat title="Win Rate" value="30%" />
  </div>
);

export const Default = Template.bind({});
