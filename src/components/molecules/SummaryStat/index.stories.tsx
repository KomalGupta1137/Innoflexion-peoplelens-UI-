import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SummaryStat from './index';

export default {
  title: 'Molecules/SummaryStat',
  component: SummaryStat,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 410 }}>
    <SummaryStat title="Win Rate" managerScore={3} selfScore={3} demoMode={false} />
  </div>
);

export const Default = Template.bind({});
