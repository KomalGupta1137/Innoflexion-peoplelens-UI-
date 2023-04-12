import gql from 'graphql-tag';

export const GetRepDashboardData = gql`
  query repDashboardData($repDashboardInput: RepDashboardInput) {
    RepDashboardData(repDashboardInput: $repDashboardInput) {
      pipeline {
        customer
        opportunity
        closedDate
        status
        relationship
        decisionMaker
        myNextStep
      }
      myLearning {
        course
        assessmentScore
        courseDate
        courseStatus
      }
      earnings {
          equity {
            vestedAmount
            vestedShares
            remainingAmount
            remainingShares
          }
          annualComp {
            base
            commission
            vestedEquity
            rate
            rank
          }
          myScenarios {
            daysToClose
          }
          demoMode {
            isDemoMode
          }
      }
      rewards {
        commissionStructure {
          threshold
          rate
          value
        }
        commissionCases {
          myDeals {
            name
            label
          }
          jointSelling {
            name
            label
          }
        }
      }
    }
  }
`;
