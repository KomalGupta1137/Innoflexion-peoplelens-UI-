import gql from 'graphql-tag';

export const GetSalesOKR = gql`
  query RepDashboardData($repDashboardInput: RepDashboardInput) {
    RepDashboardData(repDashboardInput: $repDashboardInput) {
      okrName {
        title
        value {
          title
          value
        }
      }
      okrSummary {
        rating
        competency {
          name
          values {
            title
            managerScore
            selfScore
          }
        }
      }
    }
  }
`;
