import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AttritionRate from './index';

export default {
  title: 'Molecules/AttritionRate',
  component: AttritionRate,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 190 }}>
    <AttritionRate {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  currVal: 19,
  prevVal: 14,
};
