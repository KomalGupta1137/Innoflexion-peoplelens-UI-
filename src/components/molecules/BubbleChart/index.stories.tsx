import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BubbleChart from './index';

export default {
  title: 'Molecules/BubbleChart',
  component: BubbleChart,
} as Meta;

const bubbleData = [
  { x: 5, y: 1, z: 10, bucketNo: 0, color: 'rgba(251, 98, 98, 1)' },
  { x: 15, y: 1, z: 5, bucketNo: 10, color: 'rgba(255, 164, 164, 1)' },
  {
    x: 25,
    y: 1,
    z: 10,
    bucketNo: 20,
    color: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, 'rgba(242, 135, 135, 0.9)'],
        [1, 'rgba(147, 188, 78, 0.3375)'],
      ],
    },
  },
  { x: 35, y: 1, z: 20, bucketNo: 30, color: 'rgba(221, 255, 209, 1)' },
  { x: 45, y: 1, z: 15, bucketNo: 40, color: 'rgba(176, 255, 148, 1)' },
  { x: 55, y: 1, z: 100, bucketNo: 50, color: 'rgba(123, 255, 75, 0.9)' },
  { x: 65, y: 1, z: 20, bucketNo: 60, color: 'rgba(65, 227, 6, 1)' },
  { x: 75, y: 1, z: 20, bucketNo: 70, color: 'rgba(59, 212, 3, 1)' },
  { x: 85, y: 1, z: 25, bucketNo: 80, color: 'rgba(71, 165, 36, 1)' },
  { x: 95, y: 1, z: 20, bucketNo: 90, color: 'rgba(63, 136, 37, 1)' },
  { x: 105, y: 1, z: 10, bucketNo: 100, color: 'rgba(29, 107, 1, 1)' },
  { x: 115, y: 1, z: 20, bucketNo: 110, color: 'rgba(22, 84, 0, 1)' },
];

const Template: Story = (args) => (
  <div style={{ width: 1270 }}>
    <BubbleChart
      min={0}
      max={120}
      avg={40}
      colorCutoff={20}
      prefix={''}
      suffix={'%'}
      bubbleData={bubbleData}
      bubbleOnClick={() => {
        return true;
      }}
      dropdownOnChange={() => {
        return true;
      }}
      dropdownSelection={'Quota Attainment'}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  min: 0,
  max: 120,
  avg: 40,
  colorCutoff: 20,
  prefix: '',
  suffix: '%',
  bubbleData: bubbleData,
  dropdownSelection: 'Quota Attainment',
};
