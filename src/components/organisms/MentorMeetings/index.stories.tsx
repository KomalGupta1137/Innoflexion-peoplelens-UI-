import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import MentorMeetings from './index';

export default {
  title: 'Organisms/MentorMeetings',
  component: MentorMeetings,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 411 }}>
    <MentorMeetings />
  </div>
);

export const Default = Template.bind({});
