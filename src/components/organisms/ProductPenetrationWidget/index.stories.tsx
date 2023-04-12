import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import { getDashboardData_getDashboardData_salesOutcome_productPenetration as DashboardProductPenetration } from '../../../gql/types';
import ProductPenetration from './index';

export default {
  title: 'Organisms/ProductPenetrationWidget',
};

const data: any = [
  {
    __typename: 'ProductPenetration',
    product: {
      id: '1',
      name: 'Prisma',
    },
    dealcount: 45,
  },
  {
    __typename: 'ProductPenetration',
    product: {
      id: '2',
      name: 'Cortext',
    },
    dealcount: 50,
  },
  {
    __typename: 'ProductPenetration',
    product: {
      id: '3',
      name: 'Strata',
    },
    dealcount: 30,
  },
];
const Template: Story = (args) => (
  <div style={{ width: 480 }}>
    <ProductPenetration
      penetrationData={data}
      activeQuarter={0}
      totalDeals={1}
      reportInd={false}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});
