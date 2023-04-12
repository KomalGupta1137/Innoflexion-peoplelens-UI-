import gql from 'graphql-tag';

export const GetLearningData = gql`
  query getLearningData($learningInput: LearningInput) {
    getLearningData(learningInput: $learningInput) {
      learningParticipation {
        name
        value
      }
      learnerAssessments {
        name
        value
      }
      learnerSatisfaction {
        name
        value
      }
    }
  }
`;
