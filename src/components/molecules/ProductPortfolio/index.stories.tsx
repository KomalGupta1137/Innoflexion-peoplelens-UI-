import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import ProductPortfolio from './index';
import { getDashboardData_getDashboardData_salesOutcome_topProductContributors as DashboardTopProductContributors } from '../../../gql/types';

export default {
  title: 'Molecules/ProductPortfolio',
  component: ProductPortfolio,
};

const data: DashboardTopProductContributors[] = [
  {
    product: {
      id: '1',
      name: 'Prisma',
      __typename: 'Product',
    },
    totalAmount: 7108.28,
    __typename: 'TopProductContributor',
  },
  {
    product: {
      id: '2',
      name: 'Cortext',
      __typename: 'Product',
    },
    totalAmount: 7108.28,
    __typename: 'TopProductContributor',
  },
  {
    product: {
      id: '3',
      name: 'Strata',
      __typename: 'Product',
    },
    totalAmount: 7108.28,
    __typename: 'TopProductContributor',
  },
];

const Template: Story = (args) => (
  <div style={{ width: 600, height: 298 }}>
    <ProductPortfolio data={data} salesClosed={101373} {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  data: [
    {
      product: {
        id: '1',
        name: 'Prisma',
        __typename: 'Product',
      },
      totalAmount: 30,
      __typename: 'TopProductContributor',
    },
    {
      product: {
        id: '2',
        name: 'Cortext',
        __typename: 'Product',
      },
      totalAmount: 30,
      __typename: 'TopProductContributor',
    },
    {
      product: {
        id: '3',
        name: 'Strata',
        __typename: 'Product',
      },
      totalAmount: 30,
      __typename: 'TopProductContributor',
    },
  ],
  salesClosed: 100,
};
