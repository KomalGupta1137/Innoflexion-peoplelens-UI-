import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import BubbleChartPopup, { PersonProps } from './index';

export default {
  title: 'Organisms/BubbleChartPopup',
  component: BubbleChartPopup,
} as Meta;

const data: PersonProps[] = [
  {
    avatar: '',
    name: 'Mike',
    lastName: 'Foggatory',
    value: 100,
  },
  {
    avatar: '',
    name: 'John',
    lastName: 'Pretley',
    value: 110,
  },
  {
    avatar: '',
    name: 'Bob',
    lastName: 'Foggatory',
    value: 102,
  },
  {
    avatar: '',
    name: 'Sid',
    lastName: 'Broose',
    value: 105,
  },
];

const Template: Story = (args) => <BubbleChartPopup data={data} />;

export const Default = Template.bind({});
