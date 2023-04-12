import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CommisionCases from './index';

export default {
  title: 'Organisms/CommisionCases',
  component: CommisionCases,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 411 }}>
    <CommisionCases />
  </div>
);

export const Default = Template.bind({});
