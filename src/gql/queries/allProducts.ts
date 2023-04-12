import gql from 'graphql-tag';

export const GetAllProducts = gql`
  query getAllProducts {
    allProducts {
      name
      id
    }
  }
`;
