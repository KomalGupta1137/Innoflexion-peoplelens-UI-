import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import BarGraph from './index';

export default {
  title: 'molecules/BarChart',
};

const Template: Story = (args) => <BarGraph {...args} />;

export const Default = Template.bind({});
