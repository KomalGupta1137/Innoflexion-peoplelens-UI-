import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ClosedSalesChart from './index';

export default {
  title: 'Molecules/Closed Sales Chart',
  component: ClosedSalesChart,
} as Meta;

const Template: Story = (args) => (
  <ClosedSalesChart reportInd={'main'} {...args} />
);

export const Default = Template.bind({});

Default.args = {
  closed: 45.9,
  forecast: 43.2,
  reportInd: 'main',
};
