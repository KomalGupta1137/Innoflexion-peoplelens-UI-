import { Meta, Story } from '@storybook/react/types-6-0';
import MyTeamTree from './index';
import { getDashboardData_getDashboardData_peopleDrivers_myTeam } from '../../../gql/types';
import React from 'react';

export default {
  title: 'Molecules/MyTeamTree',
  component: MyTeamTree,
} as Meta;

// eslint-disable-next-line camelcase
const teamData: getDashboardData_getDashboardData_peopleDrivers_myTeam = {
  __typename: 'MyTeam',
  user: {
    __typename: 'User',
    firstName: 'Valerie',
    lastName: 'Crocombe',
    designation: '',
  },
  personaCount: [
    {
      __typename: 'PersonaCount',
      persona: 'AE',
      count: 45,
    },
  ],
};

const Template: Story = () => (
  <div style={{ width: 514 }}>
    <MyTeamTree data={teamData} />
  </div>
);

export const Default = Template.bind({});

// Default.args = {
//   data: teamData
// }
