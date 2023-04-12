import gql from 'graphql-tag';

export const GetBattleCards = gql`
  query battleCard(
    $dashboardInput: DashboardInput
    $outComeType: String
    $userId: String
    $battleCardType: String
  ) {
    battleCard(
      dashboardInput: $dashboardInput
      outComeType: $outComeType
      userId: $userId
      battleCardType: $battleCardType
    ) {
      user {
        userId
        firstName
        lastName
      }
      battleCardData {
        name
        value
        valueType
      }
      title
      battleCardType
      battleCardActions {
        actionName
      }
    }
  }
`;
