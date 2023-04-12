import { Meta, Story } from '@storybook/react/types-6-0';
import MyTeam from './index';

export default {
  title: 'Organisms/MyTeam',
  component: MyTeam,
} as Meta;

const teamData = {
  __typename: 'MyTeam',
  userInfo: {
    __typename: 'User',
    firstName: 'Valerie',
    lastName: 'Crocombe',
  },
  count: 85,
  children: [
    {
      __typename: 'MyTeam',
      userInfo: {
        __typename: 'User',
        firstName: 'Dino',
        lastName: 'Posselt',
      },
      count: 1,
    },
    {
      __typename: 'MyTeam',
      userInfo: {
        __typename: 'User',
        firstName: 'Matilde',
        lastName: 'Fenner',
      },
      count: 0,
    },
    {
      __typename: 'MyTeam',
      userInfo: {
        __typename: 'User',
        firstName: 'Jemimah',
        lastName: 'Le Jean',
      },
      count: 14,
    },
    {
      __typename: 'MyTeam',
      userInfo: {
        __typename: 'User',
        firstName: 'Ignace',
        lastName: 'Tremonte',
      },
      count: 65,
    },
    {
      __typename: 'MyTeam',
      userInfo: {
        __typename: 'User',
        firstName: 'Ursulina',
        lastName: 'Dufaire',
      },
      count: 0,
    },
  ],
};
const Template: Story = (args) => (
  <div style={{ width: 494 }}>
    <MyTeam
      span={5}
      levels={8}
      male={58}
      female={40}
      total={100}
      quarter={1}
      target={45}
      targetYear={2022}
      data={teamData}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  data: teamData,
};
