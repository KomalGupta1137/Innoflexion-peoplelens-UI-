import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import WidgetCard from '../../atoms/WidgetCard';
import { COLORS } from '../../../plTheme';
import { _t_ } from '../../../utils/translation/translation';
import { _n_ } from '../../../utils/numerals/numerals';
import { useGlobalStyles } from '../../../plStyles';

export interface AvgDealSizeProps {
  avgDealSize?: number | null;
  dealsClosed?: number | null;
  repInd: boolean;
}

const AvgDealSize: React.FC<AvgDealSizeProps> = ({
  avgDealSize,
  dealsClosed,
  repInd,
}: AvgDealSizeProps) => {
  const useStyles = makeStyles({
    root: {
      height: '100%',
      // padding: 16,
    },
    heading: {
      color: COLORS.TEXT_LOW_EMPHASIS,
      textTransform: 'uppercase',
    },
    textTransformation: {
      display: 'inline-block',
      width: '250px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
    },
    textcolor: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      fontSize: 18,
      paddingRight: 8,
    },
    productColor: {
      color: COLORS.WIDGET_TITLE,
      fontSize: '14px',
      lineHeight: '24px',
    },

    mainValue: {
      color: COLORS.TEXT_HIGH_EMPHASIS,
      marginTop: 22,
      marginBottom: 14,
    },
    repSpacing: {
      marginTop: repInd ? 10 : 0,
    },
  });

  const classes = useStyles();

  const avgdealSize = avgDealSize && _n_(avgDealSize, '0,0.0a');

  const globalClasses = useGlobalStyles();

  return (
    <>
      <WidgetCard>
        <Grid
          container
          direction="column"
          className={classes.root}
          data-testid="avgDealSize"
          style={{
            padding: '17px 0 16px 17px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.textTransformation}
              style={{ height: 24 }}
            >
              <span className={globalClasses.body1WidgetTitle}>
                {_t_('Deals closed')}
              </span>
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              className={`${classes.textTransformation} ${classes.repSpacing}`}
              style={{ height: 28, lineHeight: 'normal' }}
            >
              <span className={classes.textcolor}>
                {dealsClosed?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              flexGrow: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></Grid>
          <Grid
            item
            style={{
              flexGrow: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.textTransformation}
              style={{ height: 24, lineHeight: 'normal' }}
            >
              <span className={globalClasses.body1WidgetTitle}>
                {_t_('avG. deal size (ACV)')}
              </span>
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              className={`${classes.textTransformation} ${classes.repSpacing}`}
              style={{ height: 28, lineHeight: 'normal' }}
            >
              <span className={classes.textcolor}>${avgdealSize}</span>
            </Typography>
          </Grid>
        </Grid>
      </WidgetCard>
    </>
  );
};

export default AvgDealSize;
