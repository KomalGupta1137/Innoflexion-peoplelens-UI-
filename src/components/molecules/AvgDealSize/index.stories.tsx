import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AvgDealSize from './index';

export default {
  title: 'Molecules/AvgDealSize',
  component: AvgDealSize,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 267 }}>
    <AvgDealSize
      avgDealSize={400000}
      dealsClosed={3000}
      repInd={false}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});
