import gql from 'graphql-tag';

export const GetPortfolioGrossMargin = gql`
  query portfolioGrossMargin($dashboardInput: DashboardInput) {
    portfolioGrossMargin(dashboardInput: $dashboardInput) {
      grossMarginData {
        productName
        productPercentage
      }
    }
  }
`;
