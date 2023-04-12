import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TeamMember from './index';

export default {
  title: 'Molecules/TeamMember',
  component: TeamMember,
} as Meta;

const avatar =
  'https://media-exp1.licdn.com/dms/image/C4D18AQHuBnjotgfBVg/companyUpdate-article-image-shrink_627_1200/0/1598642524523?e=1619654400&v=beta&t=KKHGrKVRxfhWcaRdhPFTZp6pXr2naMpDERhrN_77kYQ';

const Template: Story = (args) => (
  <div>
    <TeamMember
      avatarSrc={avatar}
      name="Cynthia Parker"
      designation="Regional Sales VP"
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  avatarSrc: avatar,
  name: 'Cynthia Parker',
  designation: 'Regional Sales VP',
  child: true,
  subs: 25,
};
