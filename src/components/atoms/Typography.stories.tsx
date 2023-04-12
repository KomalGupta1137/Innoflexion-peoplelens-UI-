import React from 'react';
import { Typography } from '@material-ui/core';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Atoms/Typography',
};

const variantOptions = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'body1',
  body2: 'body2',
  subtitle1: 'subtitle1',
  subtitle2: 'subtitle2',
  caption: 'caption',
  button: 'button',
  link: 'link',
};

const colorOptions = {
  textPrimary: 'textPrimary',
  textSecondary: 'textSecondary',
};

const Template: Story = (args) => (
  <Typography {...args}>{args.text}</Typography>
);
export const Default = Template.bind({});
Default.args = {
  text: 'Cynthia’s lens',
};
Default.argTypes = {
  variant: { control: { type: 'select', options: variantOptions } },
  color: { control: { type: 'select', options: colorOptions } },
};
