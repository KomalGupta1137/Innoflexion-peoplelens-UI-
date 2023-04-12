import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PieChart from '.';
import { COLORS } from '../../../plTheme';

export default {
  title: 'ATOMS/Pie',
  component: PieChart,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: '1000px' }}>
    <PieChart {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  chartData: [
    {
      name: 'Cortex',
      y: 20,
      color: COLORS.MAIN_BLUE_PRESSED,
    },
    {
      name: 'Prisma',
      y: 30,
      color: COLORS.MAIN_HUE_2,
    },
    {
      name: 'Strata',
      y: 40.2,
      color: COLORS.MAIN_BLUE_HOVER,
    },
    {
      name: 'Others',
      y: 9.8,
      color: COLORS.MAIN_HOVER_LIGHT,
    },
  ],
  previousChartData: [{ y: 0 }, { y: 0 }, { y: 0 }],
};
