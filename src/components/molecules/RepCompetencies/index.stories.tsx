import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import RepCompetencies from '.';

export default {
  title: 'MOLECULES/RepCompetencies',
  component: RepCompetencies,
};

const Template: Story = (args) => (
  <RepCompetencies headingName="Leadership" {...args} />
);

export const Default = Template.bind({});
Default.args = {
  headingName: 'Leadership',
};
