import gql from 'graphql-tag';

const PeopleActivitiesFragment = gql`
  fragment peopleActivitiesFrag on Query {
    peopleActivities(dashboardInput: $dashboardInput, persona: $persona) {
      followThrough {
        curQuarterVal
        prevQuarterVal
        benchMark
      }
      accountCoverage {
        curQuarterVal
        prevQuarterVal
        benchMark
      }
      pipelineDisciplineScore {
        curQuarterVal
        prevQuarterVal
        benchMark
      }
      timeAllocationScore {
        curQuarterVal
        prevQuarterVal
        benchMark
      }
      objectiveScore {
        curQuarterVal
        prevQuarterVal
        benchMark
      }
      untouchedOpps {
        curVal
        prevVal
        benchMark
      }
      dealFunnel {
        opps
        meetings
        proposals
        deals
        activeNegotiations
      }
      demoMode 
      { 
        isDemoMode 
      }
    }
  }
`;

export const GetDashboardData = gql`
  query getDashboardData($dashboardInput: DashboardInput, $persona: String) {
    getDashboardData(dashboardInput: $dashboardInput) {
      salesOutcome {
        totalSalesClosed {
          overallTotalSalesClosed
          existingTotalSalesClosed
        }
        totalSalesForecast
        noOfDeals
        winRate
        quotaAttainment
        portfolioPresented
        totalSalesCycle {
          product {
            id
            name
          }
          productCycle
        }
        topProductContributors {
          product {
            id
            name
          }
          totalAmount
        }
        productPenetration {
          product {
            id
            name
          }
          dealCount
        }
      }
      peopleDrivers {
        avgTimeToHire
        attrition {
          rateInCurrentQuarter
          rateInSameQuarterPreviousYear
        }
        diversity {
          noOfMale
          noOfFemale
          total
          targetCount
          targetYear
        }
        spanLevel {
          span
          level
        }
        myTeam {
          user {
            firstName
            lastName
          }
          personaCount {
            persona
            count
          }
        }
        requisitionInfo {
          requisitionStage
          noOfCandidates
        }
        requiredCandidates
        competencies {
          ratingName
          ratingValue
        }
      }
      productColorMap {
        productName
        color
      }
    }
    ...peopleActivitiesFrag
  }
  ${PeopleActivitiesFragment}
`;

export const GetPeopleActivitiesData = gql`
  query peopleactivityQuery($dashboardInput: DashboardInput, $persona: String) {
    ...peopleActivitiesFrag
  }
  ${PeopleActivitiesFragment}
`;
export const ProductPortfolio = gql`
  query getProductPortfolio($dashboardInput: DashboardInput) {
    getDashboardData(dashboardInput: $dashboardInput) {
      salesOutcome {
        totalSalesClosed {
          overallTotalSalesClosed
          existingTotalSalesClosed
        }

        topProductContributors {
          product {
            id
            name
          }
          totalAmount
        }
      }
    }
  }
`;
