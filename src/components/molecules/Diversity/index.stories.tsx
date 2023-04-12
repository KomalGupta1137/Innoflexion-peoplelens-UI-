import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Diversity from './index';

export default {
  title: 'Molecules/Diversity',
  component: Diversity,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 550 }}>
    <Diversity
      quarter={0}
      male={40}
      female={58}
      targetYear={2022}
      total={100}
      reports={false}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  target: 45,
  male: 40,
  female: 58,
  quarter: 0,
  targerYear: 2020,
  total: 100,
};
