import { Grid, makeStyles, Typography } from '@material-ui/core';
import { COLORS } from '../../../plTheme';
import WidgetCard from '../../atoms/WidgetCard';
import { getDashboardData_getDashboardData_salesOutcome_productPenetration as DashboardProductPenetration } from '../../../gql/types';
import React from 'react';
import { _t_ } from '../../../utils/translation/translation';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import { useGlobalStyles } from '../../../plStyles';

interface ProductPenetrationProps {
  penetrationData?: (DashboardProductPenetration | null)[] | null | undefined;
  activeQuarter: number | null | undefined;
  totalDeals: number | null | undefined;
  reportInd: boolean;
}

const ProductPenetrationWidget: React.FC<ProductPenetrationProps> = ({
  penetrationData,
  activeQuarter,
  totalDeals,
  reportInd,
}: ProductPenetrationProps) => {
  const [width] = useWindowSize();

  const useStyles = makeStyles({
    root: {},
    textTransformation: {
      display: 'inline-block',
      // maxWidth: '110%',
      height: 'auto',
      whiteSpace: 'nowrap',
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
      textTransform: 'uppercase',
    },
    textcolor: {
      color: COLORS.PL_PRIMARY,
      fontSize: 18,
      paddingRight: 8,
      minWidth: 58,
      display: 'inline-block',
      textAlign: 'right',
    },
    productColor: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    dealsColor: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      paddingRight: '1%',
    },
    textPadding: {
      paddingLeft: 8,
      paddingRight: 2,
    },
    heading: {
      textTransform: 'uppercase',
      color: COLORS.GREY_100,
    },
    griditem: {
      padding: 16,
      display: 'flex',
    },
    griditem1: {
      paddingLeft: 18,
      paddingBottom: reportInd ? 9 : 18,
      display: 'flex',
      alignItems: 'baseline',
    },
    griditem2: {
      paddingLeft: 18,
      paddingBottom: 8,
      display: 'flex',
      alignItems: 'baseline',
    },
    textInfo: {
      marginBottom: '2.2%',
      height: '134px',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: 6,
        borderRadius: 10,
        marginRight: '10px',
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: '10px',
        // marginTop: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        minHeight: 40,
        backgroundColor: '#CFD6DE',
        borderRadius: '10px',
      },
    },
  });

  const classes = useStyles();

  const dealsFraction = (
    productPenetration: DashboardProductPenetration | null,
    totalDeals: number,
  ) => {
    const dealcount = productPenetration && productPenetration?.dealCount;
    return (((dealcount || 0) / totalDeals) * 100).toFixed(1);
  };

  const globalClasses = useGlobalStyles();

  return (
    <WidgetCard>
      <Grid
        container
        direction="column"
        className={classes.root}
        style={{ height: reportInd ? '100%' : 'auto' }}
      >
        <Grid item container className={classes.griditem} alignItems="baseline">
          <Typography className={globalClasses.body1WidgetTitle}>
            {_t_('Product Penetration ')}
          </Typography>
        </Grid>
        <Grid item className={classes.textInfo}>
          {penetrationData &&
            penetrationData?.map(
              (element: DashboardProductPenetration | null, key: number) => {
                return (
                  element && (
                    <Grid
                      item
                      className={
                        penetrationData.length === key - 1
                          ? classes.griditem2
                          : classes.griditem1
                      }
                      key={key}
                    >
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className={classes.textTransformation}
                      >
                        <span
                          style={{ width: '5%' }}
                          className={classes.textcolor}
                          data-testid="productPenetrationWidgetPercentage"
                        >
                          {totalDeals && dealsFraction(element, totalDeals)}%
                        </span>

                        <span
                          className={classes.dealsColor}
                          data-testid="productPenetrationWidgetPercentage"
                        >
                          {reportInd
                            ? _t_(' Deals w/ ')
                            : _t_(' OF DEALS CONTAIN ')}
                        </span>
                        <span className={classes.productColor}>
                          {element?.product?.name
                            ? element?.product?.name
                            : `Product ${key}`}
                        </span>
                      </Typography>
                    </Grid>
                  )
                );
              },
            )}
          {!penetrationData && (
            <Typography variant="subtitle1" color="textSecondary">
              {_t_('No Deals Closed')}
            </Typography>
          )}
        </Grid>
      </Grid>
    </WidgetCard>
  );
};

export default ProductPenetrationWidget;
