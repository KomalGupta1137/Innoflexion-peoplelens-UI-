import { subYears } from 'date-fns';
import gql from 'graphql-tag';

export const GetKeyDrivers = gql`
  query keyDriversData($keyDriversInput: KeyDriversInput) {
    keyDriversData(keyDriversInput: $keyDriversInput) {
      graphValues {
        label
        title1
        title2
        legend1
        legend2
        series1Data {
          y
          label
          x
        }
        series2Data {
          x
          y
          label
        }
      }
      demoMode 
      { 
        isDemoMode 
      }
    }
  }
`;
