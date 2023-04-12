import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import RatingChart from '.';
import { Typography } from '@material-ui/core';

export default {
  title: 'Molecules/RatingChart',
  component: RatingChart,
};

const Template: Story = (args) => (
  <div style={{ width: '500px', height: '900px' }}>
    <Typography>Leadership</Typography>
    <RatingChart value={4} indicator={'main'} {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  value: 4,
  reportInd: false,
};
