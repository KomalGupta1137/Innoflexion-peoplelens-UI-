/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';

interface OKRStatProps {
  title: string;
  value?: string;
  isHeading?: boolean;
}

const OKRStat: React.FC<OKRStatProps> = ({
  title,
  value,
  isHeading = false,
}: OKRStatProps) => {
  const useStyles = makeStyles({
    title: {
      lineHeight: '31px',
      fontWeight: isHeading ? 500 : 300,
      marginLeft: '1rem',
    },
    value: {
      // backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
      backgroundColor: '#D9D9D9',
      lineHeight: '28px',
      padding: '0 16px',
      width: 92,
      textAlign: 'center',
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <>
      <Grid container direction="row" alignItems="center" justify="flex-start">
        <Grid item style={{ width: '61%' }}>
          <Typography
            color="textPrimary"
            className={`${globalClasses.body1Light} ${classes.title}`}
          >
            {title}
          </Typography>
        </Grid>
        {value !== null && (
          <Grid item style={{ width: '29%' }}>
            <Typography
              color="textPrimary"
              className={`${globalClasses.body1Light} ${classes.value}`}
            >
              {value}
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default OKRStat;
