import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import KeyInputDriverBattleCards from '.';

import BattleCardImage1 from '../../../../src/assets/BattleCardsImages/battlecards1.png';

export default {
  title: 'organisms/KeyInputDriverBattleCards',
  component: KeyInputDriverBattleCards,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 600, height: 628 }}>
    <KeyInputDriverBattleCards userId={''} {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  battleCardData: [
    {
      name: 'Participation',
      value: 30,
      valueType: 'continuous',
    },
    {
      name: 'Assesstment',
      value: 2,
      valueType: 'discrete',
    },
    {
      name: 'Satisfaction',
      value: 45,
      valueType: 'continuous',
    },
    {
      name: 'Satisfaction',
      value: 45,
      valueType: 'continuous',
    },
  ],
  battleCardActions: [
    {
      actionName: 'action1',
    },
  ],
  name: 'Mike',
  userId: '1',
  image: BattleCardImage1,
  heading: 'High Potential',
  trainingName: 'Cortex Learning - Intermediate level',
};
