/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from 'react';
import { getDashboardData_getDashboardData_productColorMap } from '../gql/types';

interface ProductColor {
  productName: string;
  name: string;
}

interface ProductColorContextProps {
  ProductColorMap:
    | (getDashboardData_getDashboardData_productColorMap | null)[]
    | null
    | undefined;
  setProductColorMap: (
    data:
      | (getDashboardData_getDashboardData_productColorMap | null)[]
      | null
      | undefined,
  ) => void;
}

const init: ProductColorContextProps = {
  ProductColorMap: [],
  setProductColorMap: (data) => {},
};

export const ProductColorContext = createContext<ProductColorContextProps>(
  init,
);

export const ProductColorProvider: React.FC = (props) => {
  const [ProductColorMap, setProductColorMap] = React.useState<any>([]);

  return (
    <ProductColorContext.Provider
      value={{ ProductColorMap, setProductColorMap }}
    >
      {props?.children}
    </ProductColorContext.Provider>
  );
};
