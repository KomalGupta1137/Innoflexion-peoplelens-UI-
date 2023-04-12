import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TotalComparision from './index';

export default {
  title: 'Organisms/TotalComparision',
  component: TotalComparision,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 302, height: 192 }}>
    <TotalComparision />
  </div>
);

export const Default = Template.bind({});
