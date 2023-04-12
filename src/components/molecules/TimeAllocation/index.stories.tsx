import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TimeAllocation from './index';

export default {
  title: 'Molecules/TeamAllocation',
  component: TimeAllocation,
} as Meta;

// const data = {
//   __typename: 'getDashboardData_peopleActivities_repTimeAllocation',
//   productMeetings: 14,
//   customerMeetings: 26,
//   systemsAdmin: 0,
//   total: 100,
// };
const Template: Story = (args) => (
  <div style={{ width: 625 }}>
    {/* <TimeAllocation
      data={data}
      startDate="2011-10-05T14:48:00.000Z"
      endDate="2011-10-05T14:48:00.000Z"
    /> */}
  </div>
);

export const Default = Template.bind({});
