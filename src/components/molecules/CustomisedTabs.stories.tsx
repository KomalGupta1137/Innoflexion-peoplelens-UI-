import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CustomizedTabs, { CustomizedTabsProps } from './CustomisedTabs';

export default {
  title: 'Organisms/Tabs',
  component: CustomizedTabs,
} as Meta;

const Template: Story<CustomizedTabsProps> = (args) => (
  <CustomizedTabs {...args} />
);

export const Default = Template.bind({});

Default.args = {
  tabNames: ['MY TEAM', 'LEADERBOARD', 'MYSELF', 'REPORTS'],
  primary: true,
};
