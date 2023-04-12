import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SalesOKR from './index';
import { RepDashboardData_RepDashboardData_okrName as dashboardData } from '../../../gql/types';
const okrName: [dashboardData] = [
  {
    __typename: 'OKRType',
    title: 'Effectiveness',
    value: [
      {
        __typename: 'SalesOKRData',

        title: 'Win Rate',
        value: '30%',
      },
      {
        __typename: 'SalesOKRData',

        title: 'salescycle',
        value: '90 days',
      },
      {
        __typename: 'SalesOKRData',

        title: 'Portfolio Presented',
        value: '75%',
      },
    ],
  },
];
export default {
  title: 'Organisms/SalesOKR',
  component: SalesOKR,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 410 }}>
    {' '}
    <SalesOKR salesokr={okrName} />{' '}
  </div>
);

export const Default = Template.bind({});
