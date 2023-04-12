import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import NewDashboardProductPortfolio from './index';
import { getDashboardData_getDashboardData_salesOutcome_topProductContributors as DashboardTopProductContributors } from '../../../gql/types';

export default {
  title: 'Molecules/NewDashboardProductPortfolio',
  component: NewDashboardProductPortfolio,
};

const data: DashboardTopProductContributors[] = [
  {
    product: {
      id: '1',
      name: 'Prisma',
      __typename: 'Product',
    },
    totalAmount: 80,
    __typename: 'TopProductContributor',
  },
  {
    product: {
      id: '2',
      name: 'Cortext',
      __typename: 'Product',
    },
    totalAmount: 10,
    __typename: 'TopProductContributor',
  },
  {
    product: {
      id: '3',
      name: 'Strata',
      __typename: 'Product',
    },
    totalAmount: 10,
    __typename: 'TopProductContributor',
  },
];

const Template: Story = (args) => (
  <div style={{ width: 597, height: 404 }}>
    <NewDashboardProductPortfolio
      salesClosed={101373}
      portfolioPresented={50}
      data={data}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = { salesClosed: 100, portfolioPresented: 50, data: data };
