import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import LineGraph from './index';

export default {
  title: 'molecules/LineChart',
};
const series = [
  [14, 250],
  [18, 320],
  [19, 310],
  [20, 360],
  [21, 439],
  [23, 400],
  [37, 490],
  [39, 495],
  [38, 520],
];
const lineSeries = [
  [0, 179.11],
  [50, 590],
];
const xaxisRange = [14, 38];
const yaxisRange = [250, 520];

const Template: Story = (args) => (
  <LineGraph
    title1="Product Knowledge"
    title2="Quota Attainment"
    series={Object.assign([], series)}
    lineSeries={Object.assign([], lineSeries)}
    report={false}
    xaxisRange={Object.assign([], xaxisRange)}
    yaxisRange={Object.assign([], yaxisRange)}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  title1: 'Product Knowledge',
  title2: 'Quota Attainment',
  series: Object.assign([], series),
  lineSeries: Object.assign([], lineSeries),
  xaxisRange: Object.assign([], xaxisRange),
  yaxisRange: Object.assign([], yaxisRange),
};
