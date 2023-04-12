import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import RequisitionWidget from './index';
import { getDashboardData_getDashboardData_peopleDrivers_requisitionInfo as DashboardRequisitionInfo } from '../../../gql/types';

export default {
  title: 'Organisms/RequisitionWidget',
  component: RequisitionWidget,
};

const data: DashboardRequisitionInfo[] = [
  {
    requisitionStage: 'filed',
    noOfCandidates: 140,
    __typename: 'RequisitionInfo',
  },
  {
    requisitionStage: 'interviewing',
    noOfCandidates: 60,
    __typename: 'RequisitionInfo',
  },
  {
    requisitionStage: 'hired',
    noOfCandidates: 5,
    __typename: 'RequisitionInfo',
  },
  {
    requisitionStage: 'rejected',
    noOfCandidates: 5,
    __typename: 'RequisitionInfo',
  },
];

const Template: Story = (args) => (
  <div style={{ width: '500px', height: '421.92px' }}>
    <RequisitionWidget
      requistionData={data}
      requiredCandidates={18}
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  requistionData: data,
  requiredCandidates: 18,
};
