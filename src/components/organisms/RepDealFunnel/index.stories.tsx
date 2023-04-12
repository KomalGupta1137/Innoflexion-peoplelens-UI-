import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import RepDealFunnel from './index';

export default {
  title: 'Organisms/RepDealFunnel',
  component: RepDealFunnel,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 625 }}>
    <RepDealFunnel
      activeNegotiations={5}
      opps={279}
      meetings={200}
      proposals={175}
      deals={5}
    />
  </div>
);

export const Default = Template.bind({});
