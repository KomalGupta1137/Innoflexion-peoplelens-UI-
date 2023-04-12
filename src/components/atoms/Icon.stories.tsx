import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Icon, { ImageProps } from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
} as Meta;

const Template: Story<ImageProps> = (args) => <Icon {...args} />;

export const Default = Template.bind({});

Default.args = {
  imageSrc: 'https://img.icons8.com/pastel-glyph/2x/search.png',
  imageSize: 'medium',
};
