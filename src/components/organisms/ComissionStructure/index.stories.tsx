import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CommisionStructure from './index';

export default {
  title: 'Organisms/CommisionStructure',
  component: CommisionStructure,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 411 }}>
    <CommisionStructure />
  </div>
);

export const Default = Template.bind({});
