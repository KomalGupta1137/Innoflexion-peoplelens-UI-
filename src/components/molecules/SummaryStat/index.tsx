import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../../../plStyles';
import { COLORS } from '../../../plTheme';

interface SummaryStatProps {
  title: string;
  managerScore: number | null | undefined;
  selfScore: number | null | undefined;
  demoMode: boolean;
}

const SummaryStat: React.FC<SummaryStatProps> = ({
  title,
  managerScore,
  selfScore,
  demoMode
}: SummaryStatProps) => {
  const useStyles = makeStyles({
    title: {
      //lineHeight: '31px',
      fontWeight: 300,
    },
    value: {
      background: demoMode ? '#D9D9D9' : COLORS.HOMEPAGE_BACKGROUND,
      // backgroundColor: COLORS.HOMEPAGE_BACKGROUND,
      lineHeight: '28px',
      padding: '0 16px',
      width: 58,
    },
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  return (
    <>
      <Grid container direction="row" alignItems="center" justify="flex-start">
        <Grid item style={{ flex: 55 }}>
          <Typography
            color="textPrimary"
            className={`${globalClasses.body1Light} ${classes.title}`}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item style={{ flex: 25 }}>
          <Typography
            color="textPrimary"
            className={`${globalClasses.body1Light} ${classes.value}`}
            align="center"
          >
            {managerScore && managerScore.toFixed(1)}
          </Typography>
        </Grid>
        <Grid item style={{ flex: 25 }}>
          <Typography
            color="textPrimary"
            className={`${globalClasses.body1Light} ${classes.value}`}
            align="center"
            style={{ justifyContent: 'center' }}
          >
            {selfScore && selfScore.toFixed(1)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SummaryStat;
