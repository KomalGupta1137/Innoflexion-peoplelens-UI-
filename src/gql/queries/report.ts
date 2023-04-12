import gql from 'graphql-tag';

export const GetReportData = gql`
  query report($dashboardInput: DashboardInput, $userId: String) {
    report(dashboardInput: $dashboardInput, userId: $userId) {
      salesClosed {
        maxSalesClosed
        minSalesClosed
        avgSalesClosed
      }
      dealsClosed {
        maxDealsClosed
        minDealsClosed
        avgDealsClosed
      }
      salesCylce {
        totalSalesCycle
        maxSalesCycle
        minSalesCycle
        avgSalesCycle
      }
      quotaAttainment {
        maxQuotaAttainment
        minQuotaAttainment
        avgQuotaAttainment
      }
      winRate {
        maxWinRate
        minWinRate
        avgWinRate
      }
      dealSize {
        maxDealSize
        minDealSize
      }
    }
  }
`;
