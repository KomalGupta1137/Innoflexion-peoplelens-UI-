import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DropDown from './index';

export default {
  title: 'Molecules/DropDown',
  component: DropDown,
} as Meta;
const names = [
  { key: 'Not Started', label: 'Not Started' },

  { key: 'In Progress', label: 'In Progress' },
  { key: 'Done', label: 'Done' },
];
const Template: Story = (args) => (
  <DropDown values={names} status="In Progress" width="fixed" disabled={false} />
);

export const Default = Template.bind({});

Default.args = {};