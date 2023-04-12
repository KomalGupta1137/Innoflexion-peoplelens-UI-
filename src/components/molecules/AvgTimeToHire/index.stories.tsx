import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AvgTimeToHire from './index';

export default {
  title: 'Molecules/AvgTimeToHire',
  component: AvgTimeToHire,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 190 }}>
    <AvgTimeToHire {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  value: 120,
};
