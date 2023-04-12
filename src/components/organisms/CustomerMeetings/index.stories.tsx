import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CustomerMeetings from './index';

export default {
  title: 'Organisms/CustomerMeetings',
  component: CustomerMeetings,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 411 }}>
    <CustomerMeetings />
  </div>
);

export const Default = Template.bind({});
