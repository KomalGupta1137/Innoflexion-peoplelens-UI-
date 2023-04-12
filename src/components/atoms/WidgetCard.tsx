import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../../plTheme';

export interface WidgetCardProps {
  children: React.ReactNode;
  margin?: boolean;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  children,
  margin,
  ...props
}: WidgetCardProps) => {
  const useStyles = makeStyles({
    root: {
      borderRadius: 4,
      border: '1px solid ' + COLORS.BORDER_PRIMARY,
      boxShadow: '0px 4px 20px 0px ' + COLORS.BOX_SHADOW_CARDS,
      //    box-shadow: 0px 4px 20px 0px #7E858E1F; 1
      backgroundColor: COLORS.GAMMA_WHITE,
      marginBottom: margin ? 10 : 0,
      width: 'inherit',
    },
    [`@media print`]: {
      root: {
        boxShadow: 'none',
      },
    },
  });

  const classes = useStyles();
  return (
    <Grid className={classes.root} {...props}>
      {children}
    </Grid>
  );
};

export default WidgetCard;
