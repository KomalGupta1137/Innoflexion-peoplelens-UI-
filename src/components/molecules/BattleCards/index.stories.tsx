import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BattleCards from './index';
export default {
  title: 'molecules/BattleCards',
  component: BattleCards,
} as Meta;

const Template: Story = (args) => <BattleCards {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: {
    name: 'Participation',
    value: 30,
    valueType: 'continuous',
  },
};
