import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ManagerMeetings from './index';

export default {
  title: 'Organisms/ManagerMeetings',
  component: ManagerMeetings,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 411 }}>
    <ManagerMeetings />
  </div>
);

export const Default = Template.bind({});
