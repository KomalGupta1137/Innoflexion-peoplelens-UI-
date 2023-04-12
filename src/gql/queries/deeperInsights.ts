import gql from 'graphql-tag';

export const GetDeeperInsights = gql`
  query deeperInsight($dashboardInput: DashboardInput) {
    deeperInsight(dashboardInput: $dashboardInput) {
      graphData {
        title1
        title2
        series
        lineSeries
      }
      demoMode 
      { 
        isDemoMode 
      }
    }
  }
`;
