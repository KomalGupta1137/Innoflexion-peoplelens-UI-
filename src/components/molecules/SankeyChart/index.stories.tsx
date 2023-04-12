import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Sankey from './index';

export default {
  title: 'molecules/sankey',
};

const Template: Story = (args) => (
  <div style={{ height: 641, width: 1280 }}>
    <Sankey {...args} />
  </div>
);

export const Default = Template.bind({});
