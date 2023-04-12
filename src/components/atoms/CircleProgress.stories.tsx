import React from 'react';
import CircleProgress from './CircleProgress';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Atoms/Circle Progress Component',
  component: CircleProgress,
};

const Template: Story = (args) => (
  <div style={{ width: 111, height: 111 }}>
    <CircleProgress percentage={50} {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  percentage: 50,
};
