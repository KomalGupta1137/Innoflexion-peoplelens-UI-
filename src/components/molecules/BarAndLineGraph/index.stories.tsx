import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BarAndLineGraph from './index';

export default {
  title: 'Molecules/BarAndLineGraph',
  component: BarAndLineGraph,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 350 }}>
    <BarAndLineGraph
      title1={'Product Knowledge'}
      title2={'Quota Attainment'}
      legend1={'Assessment Scores'}
      legend2={'Quota Attainment'}
      series1Data={[1.0, 1.0, 3.0, 2.0]}
      series2Data={[3.0, 4.0, 3.0, 2.0]}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  title1: 'Product Knowledge',
  title2: 'Quota Attainment',
  legend1: 'Assessment Scores',
  legend2: 'Quota Attainment',
  series1Data: [2.0, 3.0, 4.0, 5.0],
  series2Data: [5.0, 5.25, 6.0, 6.5],
};
