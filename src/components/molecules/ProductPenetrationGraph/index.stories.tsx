import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import ProductPenetrationGraph from './index';
import { getDashboardData_getDashboardData_salesOutcome_productPenetration as DashboardProductPenetration } from '../../../gql/types';

export default {
  title: 'Molecules/ProductPenetrationBar',
};

const data = [
  ['Strata', '90'],
  ['Prisma', '95'],
  ['Cortex', '98'],
];
const Template: Story = (args) => (
  <ProductPenetrationGraph
    data={data}
    activeQuarter={0}
    reportInd={false}
    chartTitle={'Sales Cycle'}
    xAxisTitile={'DAYS'}
    {...args}
  />
);

export const Default = Template.bind({});
