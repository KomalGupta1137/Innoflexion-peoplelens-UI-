import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PortfolioPieChart from './index';

export default {
  title: 'Molecules/PortfolioPieChart',
  component: PortfolioPieChart,
} as Meta;

const currentData = [
  { name: 'Prisma', y: 65 },
  { name: 'Cortex', y: 25 },
  { name: 'Strata', y: 10 },
];

const prevData = [
  { name: 'Prisma', y: 65 },
  { name: 'Cortex', y: 25 },
  { name: 'Strata', y: 10 },
];

const Template: Story = (args) => (
  <div style={{ width: 295 }}>
    <PortfolioPieChart currentData={currentData} previousData={prevData} />
  </div>
);

export const Default = Template.bind({});
