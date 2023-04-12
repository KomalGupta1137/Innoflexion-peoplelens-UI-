/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllProducts
// ====================================================

export interface getAllProducts_allProducts {
  __typename: 'Product';
  name: string;
  id: string;
}

export interface getAllProducts {
  allProducts: (getAllProducts_allProducts | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: battleCard
// ====================================================

export interface battleCard_battleCard_user {
  __typename: 'User';
  userId: string;
  firstName: string;
  lastName: string;
}

export interface battleCard_battleCard_battleCardData {
  __typename: 'BattleCardData';
  name: string | null;
  value: number | null;
  valueType: string | null;
}

export interface battleCard_battleCard_battleCardActions {
  __typename: 'BattleCardActions';
  actionName: string | null;
  header: string | null;
  course: string | null;
  rec_id: string | null;
}

export interface battleCard_battleCard {
  __typename: 'BattleCardOutput';
  user: battleCard_battleCard_user | null;
  battleCardData: (battleCard_battleCard_battleCardData | null)[] | null;
  title: string | null;
  battleCardType: string | null;
  battleCardActions: (battleCard_battleCard_battleCardActions | null)[] | null;
}

export interface battleCard {
  battleCard: (battleCard_battleCard | null)[] | null;
}

export interface battleCardVariables {
  dashboardInput?: DashboardInput | null;
  outComeType?: string | null;
  userId?: string | null;
  battleCardType?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDashboardData
// ====================================================

export interface getDashboardData_getDashboardData_salesOutcome_totalSalesClosed {
  __typename: 'TotalSalesClosed';
  overallTotalSalesClosed: number | null;
  existingTotalSalesClosed: number | null;
}

export interface getDashboardData_getDashboardData_salesOutcome_totalSalesCycle_product {
  __typename: 'Product';
  id: string;
  name: string;
}

export interface getDashboardData_getDashboardData_salesOutcome_totalSalesCycle {
  __typename: 'TotalSalesCycle';
  product: getDashboardData_getDashboardData_salesOutcome_totalSalesCycle_product | null;
  productCycle: number | null;
}

export interface getDashboardData_getDashboardData_salesOutcome_topProductContributors_product {
  __typename: 'Product';
  id: string;
  name: string;
}

export interface getDashboardData_getDashboardData_salesOutcome_topProductContributors {
  __typename: 'TopProductContributor';
  product: getDashboardData_getDashboardData_salesOutcome_topProductContributors_product | null;
  totalAmount: number | null;
}

export interface getDashboardData_getDashboardData_salesOutcome_productPenetration_product {
  __typename: 'Product';
  id: string;
  name: string;
}

export interface getDashboardData_getDashboardData_salesOutcome_productPenetration {
  __typename: 'ProductPenetration';
  product: getDashboardData_getDashboardData_salesOutcome_productPenetration_product | null;
  dealCount: number | null;
}

export interface getDashboardData_getDashboardData_salesOutcome {
  __typename: 'SalesOutcome';
  totalSalesClosed: getDashboardData_getDashboardData_salesOutcome_totalSalesClosed | null;
  totalSalesForecast: number | null;
  noOfDeals: number | null;
  winRate: number | null;
  quotaAttainment: number | null;
  portfolioPresented: number | null;
  totalSalesCycle:
  | (getDashboardData_getDashboardData_salesOutcome_totalSalesCycle | null)[]
  | null;
  topProductContributors:
  | (getDashboardData_getDashboardData_salesOutcome_topProductContributors | null)[]
  | null;
  productPenetration:
  | (getDashboardData_getDashboardData_salesOutcome_productPenetration | null)[]
  | null;
}

export interface getDashboardData_getDashboardData_peopleDrivers_attrition {
  __typename: 'Attrition';
  rateInCurrentQuarter: number | null;
  rateInSameQuarterPreviousYear: number | null;
}

export interface getDashboardData_getDashboardData_peopleDrivers_diversity {
  __typename: 'Diversity';
  noOfMale: number | null;
  noOfFemale: number | null;
  total: number | null;
  targetCount: number | null;
  targetYear: number | null;
}

export interface getDashboardData_getDashboardData_peopleDrivers_spanLevel {
  __typename: 'SpanLevel';
  span: number | null;
  level: number | null;
}

export interface getDashboardData_getDashboardData_peopleDrivers_myTeam_user {
  __typename: 'User';
  firstName: string;
  lastName: string;
  designation: string;
}

export interface getDashboardData_getDashboardData_peopleDrivers_myTeam_personaCount {
  __typename: 'PersonaCount';
  persona: string | null;
  count: number | null;
}

export interface getDashboardData_getDashboardData_peopleDrivers_myTeam {
  __typename: 'MyTeam';
  user: getDashboardData_getDashboardData_peopleDrivers_myTeam_user | null;
  personaCount:
  | (getDashboardData_getDashboardData_peopleDrivers_myTeam_personaCount | null)[]
  | null;
}

export interface getDashboardData_getDashboardData_peopleDrivers_requisitionInfo {
  __typename: 'RequisitionInfo';
  requisitionStage: string | null;
  noOfCandidates: number | null;
}

export interface getDashboardData_getDashboardData_peopleDrivers_competencies {
  __typename: 'Competency';
  ratingName: string | null;
  ratingValue: number | null;
}

export interface getDashboardData_getDashboardData_peopleDrivers {
  __typename: 'PeopleDrivers';
  avgTimeToHire: number | null;
  attrition: getDashboardData_getDashboardData_peopleDrivers_attrition | null;
  diversity: getDashboardData_getDashboardData_peopleDrivers_diversity | null;
  spanLevel: getDashboardData_getDashboardData_peopleDrivers_spanLevel | null;
  myTeam: getDashboardData_getDashboardData_peopleDrivers_myTeam | null;
  requisitionInfo:
  | (getDashboardData_getDashboardData_peopleDrivers_requisitionInfo | null)[]
  | null;
  requiredCandidates: number | null;
  competencies:
  | (getDashboardData_getDashboardData_peopleDrivers_competencies | null)[]
  | null;
}

export interface getDashboardData_getDashboardData_productColorMap {
  __typename: 'ProductColorMap';
  productName: string | null;
  color: string | null;
}

export interface getDashboardData_getDashboardData {
  __typename: 'DashboardOutput';
  salesOutcome: getDashboardData_getDashboardData_salesOutcome | null;
  peopleDrivers: getDashboardData_getDashboardData_peopleDrivers | null;
  productColorMap:
  | (getDashboardData_getDashboardData_productColorMap | null)[]
  | null;
}

export interface getDashboardData_peopleActivities_followThrough {
  __typename: 'FollowThrough';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface getDashboardData_peopleActivities_accountCoverage {
  __typename: 'AccountCoverage';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface getDashboardData_peopleActivities_pipelineDisciplineScore {
  __typename: 'PipelineDisciplineScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface getDashboardData_peopleActivities_timeAllocationScore {
  __typename: 'TimeAllocationScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface getDashboardData_peopleActivities_objectiveScore {
  __typename: 'ObjectiveScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface getDashboardData_peopleActivities_untouchedOpps {
  __typename: 'UntouchedOpps';
  curVal: string | null;
  prevVal: string | null;
  benchMark: number | null;
}

// export interface getDashboardData_peopleActivities_repTimeAllocation {
//   __typename: 'RepTimeAllocation';
//   productMeetings: number | null;
//   customerMeetings: number | null;
//   internalTeamMeetings: number | null;
//   total: number | null;
// }

export interface getDashboardData_peopleActivities_dealFunnel {
  __typename: 'DealFunnel';
  opps: number | null;
  meetings: number | null;
  proposals: number | null;
  deals: number | null;
  activeNegotiations: number | null;
}

export interface getDashboardData_peopleActivities_demoMode {
  __typename: 'DemoMode';
  isDemoMode: boolean | null;
}

export interface getDashboardData_peopleActivities {
  __typename: 'PeopleActivityOutput';
  followThrough: getDashboardData_peopleActivities_followThrough | null;
  accountCoverage: getDashboardData_peopleActivities_accountCoverage | null;
  pipelineDisciplineScore: getDashboardData_peopleActivities_pipelineDisciplineScore | null;
  timeAllocationScore: getDashboardData_peopleActivities_timeAllocationScore | null;
  objectiveScore: getDashboardData_peopleActivities_objectiveScore | null;
  untouchedOpps: getDashboardData_peopleActivities_untouchedOpps | null;
  // repTimeAllocation: getDashboardData_peopleActivities_repTimeAllocation | null;
  dealFunnel: getDashboardData_peopleActivities_dealFunnel | null;
  demoMode: getDashboardData_peopleActivities_demoMode | null;
}

export interface getDashboardData {
  getDashboardData: getDashboardData_getDashboardData | null;
  __typename: 'Query';
  peopleActivities: getDashboardData_peopleActivities | null;
}

export interface getDashboardDataVariables {
  dashboardInput?: DashboardInput | null;
  persona?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: peopleactivityQuery
// ====================================================

export interface peopleactivityQuery_peopleActivities_followThrough {
  __typename: 'FollowThrough';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleactivityQuery_peopleActivities_accountCoverage {
  __typename: 'AccountCoverage';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleactivityQuery_peopleActivities_pipelineDisciplineScore {
  __typename: 'PipelineDisciplineScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleactivityQuery_peopleActivities_timeAllocationScore {
  __typename: 'TimeAllocationScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleactivityQuery_peopleActivities_objectiveScore {
  __typename: 'ObjectiveScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleactivityQuery_peopleActivities_untouchedOpps {
  __typename: 'UntouchedOpps';
  curVal: string | null;
  prevVal: string | null;
  benchMark: number | null;
}

export interface peopleactivityQuery_peopleActivities_repTimeAllocation {
  __typename: 'RepTimeAllocation';
  productMeetings: number | null;
  customerMeetings: number | null;
  internalTeamMeetings: number | null;
  total: number | null;
}

export interface peopleactivityQuery_peopleActivities_dealFunnel {
  __typename: 'DealFunnel';
  opps: number | null;
  meetings: number | null;
  proposals: number | null;
  deals: number | null;
  activeNegotiations: number | null;
}

export interface peopleactivityQuery_peopleActivities_demoMode {
  __typename: 'DemoMode';
  isDemoMode: boolean | null;
}

export interface peopleactivityQuery_peopleActivities {
  __typename: 'PeopleActivityOutput';
  followThrough: peopleactivityQuery_peopleActivities_followThrough | null;
  accountCoverage: peopleactivityQuery_peopleActivities_accountCoverage | null;
  pipelineDisciplineScore: peopleactivityQuery_peopleActivities_pipelineDisciplineScore | null;
  timeAllocationScore: peopleactivityQuery_peopleActivities_timeAllocationScore | null;
  objectiveScore: peopleactivityQuery_peopleActivities_objectiveScore | null;
  untouchedOpps: peopleactivityQuery_peopleActivities_untouchedOpps | null;
  repTimeAllocation: peopleactivityQuery_peopleActivities_repTimeAllocation | null;
  dealFunnel: peopleactivityQuery_peopleActivities_dealFunnel | null;
  demoMode: peopleactivityQuery_peopleActivities_demoMode | null;
}

export interface peopleactivityQuery {
  __typename: 'Query';
  peopleActivities: peopleactivityQuery_peopleActivities | null;
}

export interface peopleactivityQueryVariables {
  dashboardInput?: DashboardInput | null;
  persona?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProductPortfolio
// ====================================================

export interface getProductPortfolio_getDashboardData_salesOutcome_totalSalesClosed {
  __typename: 'TotalSalesClosed';
  overallTotalSalesClosed: number | null;
  existingTotalSalesClosed: number | null;
}

export interface getProductPortfolio_getDashboardData_salesOutcome_topProductContributors_product {
  __typename: 'Product';
  id: string;
  name: string;
}

export interface getProductPortfolio_getDashboardData_salesOutcome_topProductContributors {
  __typename: 'TopProductContributor';
  product: getProductPortfolio_getDashboardData_salesOutcome_topProductContributors_product | null;
  totalAmount: number | null;
}

export interface getProductPortfolio_getDashboardData_salesOutcome {
  __typename: 'SalesOutcome';
  totalSalesClosed: getProductPortfolio_getDashboardData_salesOutcome_totalSalesClosed | null;
  topProductContributors:
  | (getProductPortfolio_getDashboardData_salesOutcome_topProductContributors | null)[]
  | null;
}

export interface getProductPortfolio_getDashboardData {
  __typename: 'DashboardOutput';
  salesOutcome: getProductPortfolio_getDashboardData_salesOutcome | null;
}

export interface getProductPortfolio {
  getDashboardData: getProductPortfolio_getDashboardData | null;
}

export interface getProductPortfolioVariables {
  dashboardInput?: DashboardInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: deeperInsight
// ====================================================

export interface deeperInsight_deeperInsight_graphData {
  __typename: 'GraphData';
  title1: string | null;
  title2: string | null;
  series: ((number | null)[] | null)[] | null;
  lineSeries: ((number | null)[] | null)[] | null;
}

export interface deeperInsight_deeperInsight_demoMode {
  __typename: 'DemoMode';
  isDemoMode: boolean | null;
}

export interface deeperInsight_deeperInsight {
  __typename: 'DeeperInsightOutput';
  graphData: (deeperInsight_deeperInsight_graphData | null)[] | null;
  demoMode: deeperInsight_deeperInsight_demoMode | null;
}

export interface deeperInsight {
  deeperInsight: deeperInsight_deeperInsight | null;
}

export interface deeperInsightVariables {
  dashboardInput?: DashboardInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: portfolioGrossMargin
// ====================================================

export interface portfolioGrossMargin_portfolioGrossMargin_grossMarginData {
  __typename: 'GrossMarginData';
  productName: string | null;
  productPercentage: number | null;
}

export interface portfolioGrossMargin_portfolioGrossMargin {
  __typename: 'GrossMarginOutput';
  grossMarginData:
  | (portfolioGrossMargin_portfolioGrossMargin_grossMarginData | null)[]
  | null;
}

export interface portfolioGrossMargin {
  portfolioGrossMargin: portfolioGrossMargin_portfolioGrossMargin | null;
}

export interface portfolioGrossMarginVariables {
  dashboardInput?: DashboardInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: keyDriversData
// ====================================================

export interface keyDriversData_keyDriversData_graphValues_series1Data {
  __typename: 'SeriesDataType';
  y: number | null;
  label: string | null;
  x: number;
}

export interface keyDriversData_keyDriversData_graphValues_series2Data {
  __typename: 'SeriesDataType';
  x: number;
  y: number | null;
  label: string | null;
}

export interface keyDriversData_keyDriversData_graphValues {
  __typename: 'GraphValues';
  label: string | null;
  title1: string | null;
  title2: string | null;
  legend1: string | null;
  legend2: string | null;
  series1Data:
  | (keyDriversData_keyDriversData_graphValues_series1Data | null)[]
  | null;
  series2Data:
  | (keyDriversData_keyDriversData_graphValues_series2Data | null)[]
  | null;
}

export interface keyDriversData_keyDriversData_demoMode {
  __typename: 'DemoMode';
  isDemoMode: boolean | null;
}

export interface keyDriversData_keyDriversData {
  __typename: 'KeyDriversOutput';
  graphValues: (keyDriversData_keyDriversData_graphValues | null)[] | null;
  demoMode: keyDriversData_keyDriversData_demoMode | null;
}

export interface keyDriversData {
  keyDriversData: keyDriversData_keyDriversData | null;
}

export interface keyDriversDataVariables {
  keyDriversInput?: KeyDriversInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: leaderBoard
// ====================================================

export interface leaderBoard_leaderBoard_rangeCount {
  __typename: 'RangeCount';
  bucketNo: number | null;
  bucketCount: number | null;
  minRangeVal: number | null;
  maxRangeVal: number | null;
  avgRangeVal: number | null;
}

export interface leaderBoard_leaderBoard {
  __typename: 'LeaderBoardOutput';
  rangeCount: (leaderBoard_leaderBoard_rangeCount | null)[] | null;
  minMetricVal: number | null;
  maxMetricVal: number | null;
  avgMetricVal: number | null;
  metricDimension: string | null;
  totBuckets: number | null;
}

export interface leaderBoard {
  leaderBoard: leaderBoard_leaderBoard | null;
}

export interface leaderBoardVariables {
  dashboardInput?: DashboardInput | null;
  outComeType?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: rangeData
// ====================================================

export interface rangeData_rangeData_user {
  __typename: 'User';
  userId: string;
  firstName: string;
  lastName: string;
}

export interface rangeData_rangeData {
  __typename: 'RangeData';
  user: rangeData_rangeData_user | null;
  metricValue: string | null;
}

export interface rangeData {
  rangeData: (rangeData_rangeData | null)[] | null;
}

export interface rangeDataVariables {
  dashboardInput?: DashboardInput | null;
  rangeNo?: number | null;
  outComeType?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLearningData
// ====================================================

export interface getLearningData_getLearningData_learningParticipation {
  __typename: 'LearningValues';
  name: string | null;
  value: number | null;
}

export interface getLearningData_getLearningData_learnerAssessments {
  __typename: 'LearningValues';
  name: string | null;
  value: number | null;
}

export interface getLearningData_getLearningData_learnerSatisfaction {
  __typename: 'LearningValues';
  name: string | null;
  value: number | null;
}

export interface getLearningData_getLearningData {
  __typename: 'LearningOutput';
  learningParticipation:
  | (getLearningData_getLearningData_learningParticipation | null)[]
  | null;
  learnerAssessments:
  | (getLearningData_getLearningData_learnerAssessments | null)[]
  | null;
  learnerSatisfaction:
  | (getLearningData_getLearningData_learnerSatisfaction | null)[]
  | null;
}

export interface getLearningData {
  getLearningData: getLearningData_getLearningData | null;
}

export interface getLearningDataVariables {
  learningInput?: LearningInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: repDashboardData
// ====================================================

export interface repDashboardData_RepDashboardData_pipeline {
  __typename: 'Pipeline';
  customer: string | null;
  opportunity: number | null;
  closedDate: any | null;
  status: string | null;
  relationship: string | null;
  decisionMaker: string | null;
  myNextStep: string | null;
}

export interface repDashboardData_RepDashboardData_myLearning {
  __typename: 'MyLearning';
  course: string | null;
  assessmentScore: number | null;
  courseDate: string | null;
  courseStatus: string | null;
}

export interface repDashboardData_RepDashboardData_earnings_equity {
  __typename: 'Equity';
  vestedAmount: number | null;
  vestedShares: number | null;
  remainingAmount: number | null;
  remainingShares: number | null;
}

export interface repDashboardData_RepDashboardData_earnings_annualComp {
  __typename: 'AnnualComp';
  base: number | null;
  commission: number | null;
  vestedEquity: number | null;
  rate: number | null;
  rank: number | null;
}

export interface repDashboardData_RepDashboardData_earnings_myScenarios {
  __typename: 'MyScenarios';
  daysToClose: number | null;
}

export interface repDashboardData_RepDashboardData_earnings_demoMode {
  __typename: 'DemoMode';
  isDemoMode: boolean | null;
}

export interface repDashboardData_RepDashboardData_earnings {
  __typename: 'Earnings';
  equity: repDashboardData_RepDashboardData_earnings_equity | null;
  annualComp: repDashboardData_RepDashboardData_earnings_annualComp | null;
  myScenarios: repDashboardData_RepDashboardData_earnings_myScenarios | null;
  demoMode: repDashboardData_RepDashboardData_earnings_demoMode | null;
}

export interface repDashboardData_RepDashboardData_rewards_commissionStructure {
  __typename: 'CommissionStructure';
  threshold: number | null;
  rate: number | null;
  value: number | null;
}

export interface repDashboardData_RepDashboardData_rewards_commissionCases_myDeals {
  __typename: 'Generic';
  name: string | null;
  label: string | null;
}

export interface repDashboardData_RepDashboardData_rewards_commissionCases_jointSelling {
  __typename: 'Generic';
  name: string | null;
  label: string | null;
}

export interface repDashboardData_RepDashboardData_rewards_commissionCases {
  __typename: 'CommissionCases';
  myDeals:
  | (repDashboardData_RepDashboardData_rewards_commissionCases_myDeals | null)[]
  | null;
  jointSelling:
  | (repDashboardData_RepDashboardData_rewards_commissionCases_jointSelling | null)[]
  | null;
}

export interface repDashboardData_RepDashboardData_rewards {
  __typename: 'Rewards';
  commissionStructure:
  | (repDashboardData_RepDashboardData_rewards_commissionStructure | null)[]
  | null;
  commissionCases: repDashboardData_RepDashboardData_rewards_commissionCases | null;
}

export interface repDashboardData_RepDashboardData {
  __typename: 'RepDashboardOutput';
  pipeline: (repDashboardData_RepDashboardData_pipeline | null)[] | null;
  myLearning: (repDashboardData_RepDashboardData_myLearning | null)[] | null;
  earnings: repDashboardData_RepDashboardData_earnings | null;
  rewards: repDashboardData_RepDashboardData_rewards | null;
}

export interface repDashboardData {
  RepDashboardData: repDashboardData_RepDashboardData | null;
}

export interface repDashboardDataVariables {
  repDashboardInput?: RepDashboardInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: report
// ====================================================

export interface report_report_salesClosed {
  __typename: 'SalesClosed';
  maxSalesClosed: number | null;
  minSalesClosed: number | null;
  avgSalesClosed: number | null;
}

export interface report_report_dealsClosed {
  __typename: 'DealsClosed';
  maxDealsClosed: number | null;
  minDealsClosed: number | null;
  avgDealsClosed: number | null;
}

export interface report_report_dealSize {
  __typename: 'DealSize';
  maxDealSize: number | null;
  minDealSize: number | null;
}

export interface report_report_salesCylce {
  __typename: 'SalesCycle';
  totalSalesCycle: number | null;
  maxSalesCycle: number | null;
  minSalesCycle: number | null;

  avgSalesCycle: number | null;
}

export interface report_report_quotaAttainment {
  __typename: 'QuotaAttainment';
  maxQuotaAttainment: number | null;
  minQuotaAttainment: number | null;
  avgQuotaAttainment: number | null;
}

export interface report_report_winRate {
  __typename: 'WinRate';
  maxWinRate: number | null;
  minWinRate: number | null;
  avgWinRate: number | null;
}

export interface report_report {
  __typename: 'ReportOutput';
  salesClosed: report_report_salesClosed | null;
  dealsClosed: report_report_dealsClosed | null;
  dealSize: report_report_dealSize | null;
  salesCylce: report_report_salesCylce | null;
  quotaAttainment: report_report_quotaAttainment | null;
  winRate: report_report_winRate | null;
}

export interface report {
  report: report_report | null;
}

export interface reportVariables {
  dashboardInput?: DashboardInput | null;
  userId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RepDashboardData
// ====================================================

export interface RepDashboardData_RepDashboardData_okrName_value {
  __typename: 'SalesOKRData';
  title: string | null;
  value: string | null;
}

export interface RepDashboardData_RepDashboardData_okrName {
  __typename: 'OKRType';
  title: string | null;
  value: (RepDashboardData_RepDashboardData_okrName_value | null)[] | null;
}

export interface RepDashboardData_RepDashboardData_okrSummary_competency_values {
  __typename: 'Score';
  title: string | null;
  managerScore: number | null;
  selfScore: number | null;
}

export interface RepDashboardData_RepDashboardData_okrSummary_competency {
  __typename: 'CompetencyOutput';
  name: string | null;
  values:
  | (RepDashboardData_RepDashboardData_okrSummary_competency_values | null)[]
  | null;
}

export interface RepDashboardData_RepDashboardData_okrSummary {
  __typename: 'OKRSummaryOutput';
  rating: number | null;
  competency:
  | (RepDashboardData_RepDashboardData_okrSummary_competency | null)[]
  | null;
}

export interface RepDashboardData_RepDashboardData {
  __typename: 'RepDashboardOutput';
  okrName: (RepDashboardData_RepDashboardData_okrName | null)[] | null;
  okrSummary: RepDashboardData_RepDashboardData_okrSummary | null;
}

export interface RepDashboardData {
  RepDashboardData: RepDashboardData_RepDashboardData | null;
}

export interface RepDashboardDataVariables {
  repDashboardInput?: RepDashboardInput | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: peopleActivitiesFrag
// ====================================================

export interface peopleActivitiesFrag_peopleActivities_followThrough {
  __typename: 'FollowThrough';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleActivitiesFrag_peopleActivities_accountCoverage {
  __typename: 'AccountCoverage';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleActivitiesFrag_peopleActivities_pipelineDisciplineScore {
  __typename: 'PipelineDisciplineScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleActivitiesFrag_peopleActivities_timeAllocationScore {
  __typename: 'TimeAllocationScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleActivitiesFrag_peopleActivities_objectiveScore {
  __typename: 'ObjectiveScore';
  curQuarterVal: string | null;
  prevQuarterVal: string | null;
  benchMark: number | null;
}

export interface peopleActivitiesFrag_peopleActivities_untouchedOpps {
  __typename: 'UntouchedOpps';
  curVal: string | null;
  prevVal: string | null;
  benchMark: number | null;
}

export interface peopleActivitiesFrag_peopleActivities_repTimeAllocation {
  __typename: 'RepTimeAllocation';
  productMeetings: number | null;
  customerMeetings: number | null;
  internalTeamMeetings: number | null;
  total: number | null;
}

export interface peopleActivitiesFrag_peopleActivities_dealFunnel {
  __typename: 'DealFunnel';
  opps: number | null;
  meetings: number | null;
  proposals: number | null;
  deals: number | null;
  activeNegotiations: number | null;
}

export interface peopleActivitiesFrag_peopleActivities_demoMode {
  __typename: 'DemoMode';
  isDemoMode: boolean | null;
}

export interface peopleActivitiesFrag_peopleActivities {
  __typename: 'PeopleActivityOutput';
  followThrough: peopleActivitiesFrag_peopleActivities_followThrough | null;
  accountCoverage: peopleActivitiesFrag_peopleActivities_accountCoverage | null;
  pipelineDisciplineScore: peopleActivitiesFrag_peopleActivities_pipelineDisciplineScore | null;
  timeAllocationScore: peopleActivitiesFrag_peopleActivities_timeAllocationScore | null;
  objectiveScore: peopleActivitiesFrag_peopleActivities_objectiveScore | null;
  untouchedOpps: peopleActivitiesFrag_peopleActivities_untouchedOpps | null;
  repTimeAllocation: peopleActivitiesFrag_peopleActivities_repTimeAllocation | null;
  dealFunnel: peopleActivitiesFrag_peopleActivities_dealFunnel | null;
  demoMode: peopleActivitiesFrag_peopleActivities_demoMode | null;
}

export interface peopleActivitiesFrag {
  __typename: 'Query';
  peopleActivities: peopleActivitiesFrag_peopleActivities | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface DashboardInput {
  startDate?: string | null;
  endDate?: string | null;
  userId?: string | null;
}

export interface KeyDriversInput {
  startDate?: string | null;
  endDate?: string | null;
  productId?: string | null;
}

export interface LearningInput {
  startDate?: string | null;
  endDate?: string | null;
  productId?: string | null;
}

export interface RepDashboardInput {
  startDate?: string | null;
  endDate?: string | null;
  thresholdValue?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
