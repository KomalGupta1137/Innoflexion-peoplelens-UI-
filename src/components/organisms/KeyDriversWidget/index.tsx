import { useQuery } from '@apollo/client';
import {
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { GetAllProducts } from '../../../gql/queries/allProducts';
import { getAllProducts_allProducts } from '../../../gql/types';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import WidgetCard from '../../atoms/WidgetCard';
import KeyDriversContainer from '../KeyDriversContainer';

export interface KeyDriversWidgetProps {
  activeQuarter?: number;
}

const KeyDriversWidget: React.FC<KeyDriversWidgetProps> = ({
  activeQuarter,
}: KeyDriversWidgetProps) => {
  const useStyles = makeStyles({
    titleDesc: {
      fontWeight: 300,
      marginTop: 20,
    },
    titleDiv: {
      marginBottom: 23,
    },
    graphDiv: {
      height: '100%',
      padding: '4% 3.8%',
    },
    paper: {
      fontFamily: 'Rubik !important',
      fontWeight: 500,
      fontSize: 14,
      height: 200,
    },
    textField: {
      height: 40,
    },
    inputAC: {
      fontFamily: 'Rubik !important',
      fontWeight: 500,
      fontSize: 14,
      padding: '0 16px',
    },
    rootAC: {
      border: '1px solid ' + COLORS.ALPHA_BACKGROUND_COLOR,
      borderRadius: 2,
      backgroundColor: COLORS.GENERAL_WHITE,
    },
    textfieldInput: {
      fontWeight: 500,
      fontSize: 14,
      height: 28,
    },
    searchIcon: {
      width: '0.8em',
      height: '0.8em',
    },
    endDiv: {
      marginBottom: '-4px !important',
    },
    keyDriversHead: {
      paddingTop: 25,
    },
  });

  const [activeProduct, setActiveProduct] = React.useState<number>(0);

  const { loading, data, error } = useQuery(GetAllProducts);

  // eslint-disable-next-line camelcase
  const productsList: getAllProducts_allProducts[] = data?.allProducts;

  // eslint-disable-next-line camelcase
  const allProducts: getAllProducts_allProducts[] = [
    {
      name: 'All',
      id: '',
      __typename: 'Product',
    },
  ];

  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  const handleProductChange = (
    event: any,
    // eslint-disable-next-line camelcase
    value: getAllProducts_allProducts | null,
    reason: string,
  ) => {
    setActiveProduct(acOptions.findIndex((item) => item?.id === value?.id));
  };

  const acOptions =
    productsList && allProducts && allProducts.concat(productsList);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        style={{ width: '100%' }}
        className={classes.titleDiv}
      >
        <Grid item>
          <Typography
            variant="h2"
            color="textPrimary"
            className={classes.keyDriversHead}
          >
            {_t_('Key Drivers')}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.titleDesc}
          >
            {_t_('View whats driving your team performance over the time.')}
          </Typography>
        </Grid>
        <Grid item className={classes.endDiv}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <Typography
                className={globalClasses.body2Medium}
                color="textPrimary"
              >
                PRODUCT
              </Typography>
            </Grid>
            <Grid item>
              {' '}
              {acOptions && (
                <Autocomplete
                  id="custom-input-demo"
                  disabled={true}
                  options={acOptions}
                  renderOption={(option) => <>{option?.name}</>}
                  getOptionLabel={(option) => option?.name}
                  // onChange={handleProductChange}
                  classes={{
                    paper: classes.paper,
                    input: classes.inputAC,
                    root: classes.rootAC,
                  }}
                  defaultValue={acOptions[0]}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <TextField
                        style={{
                          height: 40,
                          width: 240,
                          border: 'none',
                        }}
                        type="text"
                        InputProps={{
                          disableUnderline: true,
                          classes: { input: classes.textfieldInput },
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchOutlined className={classes.searchIcon} />
                            </InputAdornment>
                          ),
                        }}
                        {...params.inputProps}
                      />
                    </div>
                  )}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <WidgetCard>
        <KeyDriversContainer
          activeQuarter={activeQuarter}
          activeProductId={acOptions?.[activeProduct].id}
        />
      </WidgetCard>
    </>
  );
};

export default KeyDriversWidget;
