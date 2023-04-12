import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BasicTable from './index';
export default {
  title: 'molecules/table',
  component: BasicTable,
} as Meta;

const Template: Story = (args) => (
  <div>
    <BasicTable activeQuarter={0} {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {};
