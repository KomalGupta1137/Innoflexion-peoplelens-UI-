import gql from 'graphql-tag';

export const GetLeaderBoardData = gql`
  query leaderBoard($dashboardInput: DashboardInput, $outComeType: String) {
    leaderBoard(dashboardInput: $dashboardInput, outComeType: $outComeType) {
      rangeCount {
        bucketNo
        bucketCount
        minRangeVal
        maxRangeVal
        avgRangeVal
      }
      minMetricVal
      maxMetricVal
      avgMetricVal
      metricDimension
      totBuckets
    }
  }
`;

export const GetRangeData = gql`
  query rangeData(
    $dashboardInput: DashboardInput
    $rangeNo: Int
    $outComeType: String
  ) {
    rangeData(
      dashboardInput: $dashboardInput
      rangeNo: $rangeNo
      outComeType: $outComeType
    ) {
      user {
        userId
        firstName
        lastName
      }
      metricValue
    }
  }
`;
