import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import RepLearning from './index';

export default {
  title: 'Organisms/RepLearning',
  component: RepLearning,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 410 }}>
    <RepLearning />
  </div>
);

export const Default = Template.bind({});
