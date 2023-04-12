import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import ActivityScoreWidget from './index';
import MyTeam from '../../atoms/ActivityScore/MyTeam';
import { COLORS } from '../../../plTheme';
import ActivityScoreAvatar from '../../atoms/ActivityScore/Avatar';
import ActivityScores from '../../organisms/ActivityScore';

export default {
  title: 'Organisms/ActivityScoresWidget',
};

const Template1: Story = (args) => (
  <div style={{ width: 411 }}>
    <ActivityScoreWidget
      children={<MyTeam />}
      color={COLORS.TIMELINES_PURPLE}
      activityPercentage={30}
      objectivePercentage={30}
      activeQuarter={2}
      week="Week 9"
      {...args}
    />
  </div>
);

export const myTeam = Template1.bind({});
myTeam.args = {
  children: <MyTeam />,
  color: COLORS.TIMELINES_PURPLE,
  activityPercentage: 30,
  objectivePercentage: 30,
  week: 'Week 9',
};
const Template2: Story = (args) => (
  <div style={{ width: 411 }}>
    <ActivityScoreWidget
      children={
        <ActivityScoreAvatar
          name="Cynthia Parker"
          designation="Regional Sales VP"
        />
      }
      color={COLORS.TIMELINES_PINK}
      activityPercentage={30}
      objectivePercentage={30}
      activeQuarter={1}
      week="Week 9"
      {...args}
    />
  </div>
);

export const Avatar = Template2.bind({});
Avatar.args = {
  children: (
    <ActivityScoreAvatar
      name="Cynthia Parker"
      designation="Regional Sales VP"
    />
  ),
  color: COLORS.TIMELINES_PINK,
  activityPercentage: 98,
  objectivePercentage: 35,
  activeQuarter: 2,
  week: 'Week 9',
};
