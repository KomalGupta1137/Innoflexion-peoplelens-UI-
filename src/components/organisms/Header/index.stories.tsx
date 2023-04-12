import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Header from './index';

export default {
  title: 'Organisms/Navbar',
  component: Header,
} as Meta;

const Template: Story = (args) => (
  <Header
    title="peoplelens.ai"
    persona="AE"
    designation=""
    avatar="https://www.if-coaching.com/wp-content/uploads/2020/01/adobestock_176418858-600x400.jpeg"
    {...args}
  />
);

export const Default = Template.bind({});

Default.args = {
  title: 'peoplelens.ai',
  persona: 'AE',
};
