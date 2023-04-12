import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import ActivityScores from './index';

export default {
  title: 'Organisms/ActivityScore',
};

const Template: Story = (args) => (
  <div style={{ width: 1268 }}>
    <ActivityScores activeQuarter={1} />
  </div>
);

export const Default = Template.bind({});
