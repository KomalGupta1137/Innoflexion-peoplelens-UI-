import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Nudges from './index';

export default {
  title: 'Organisms/Nudges',
  component: Nudges,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 411 }}>
    <Nudges />
  </div>
);

export const Default = Template.bind({});
