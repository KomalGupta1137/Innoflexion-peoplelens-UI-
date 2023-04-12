import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import CircularProgressWidget from './index';

export default {
  title: 'Molecules/Circular Progress Widget',
  component: CircularProgressWidget,
};

const Template1: Story = (args) => (
  <div
    style={{
      width: 267,
      height: 160,
    }}
  >
    <CircularProgressWidget
      percentage={50}
      variant={'small'}
      title={'Win Rate'}
      {...args}
    />
  </div>
);

export const Small = Template1.bind({});

Small.args = {
  percentage: 50,
  variant: 'small',
  title: 'Win Rate',
};

const Template2: Story = (args) => (
  <div
    style={{
      width: 276,
      height: 192,
    }}
  >
    <CircularProgressWidget
      percentage={50}
      variant={'small'}
      title={'Win Rate'}
      {...args}
    />
  </div>
);

export const Large = Template2.bind({});

Large.args = {
  percentage: 50,
  variant: 'large',
  title: 'Win Rate',
};
