import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PLChip from './index';

export default {
  title: 'Atoms/PLChip',
  component: PLChip,
} as Meta;

const Template: Story = (args) => (
  <PLChip
    label="In Progress"
    variant="primary"
    fixed
    dropDown={false}
    width="100%"
  />
);

export const Default = Template.bind({});
