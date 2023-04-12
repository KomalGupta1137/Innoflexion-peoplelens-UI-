import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { COLORS } from '../../plTheme';

interface CircleProgressProps {
  percentage?: number | null;
  barColor?: string | undefined | null;
  variant?: string | null;
  font?: string | null;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  barColor,
  variant,
  font,
}: CircleProgressProps) => {
  const useStyles = makeStyles({
    ActivityScore: {
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: '0.01em',

      color: COLORS.TEXT_HIGH_EMPHASIS,
    },
    font: {},
  });

  const classes = useStyles();
  const fontClass =
    font === 'ActivityScore' ? classes.ActivityScore : classes.font;

  return (
    <CircularProgressbarWithChildren
      value={
        percentage
          ? Math.trunc(
              percentage > 96 && percentage < 100 ? 960 : percentage * 10,
            ) / 10
          : 0
      }
      styles={buildStyles({
        textColor: COLORS.GENERAL_DARK_BLUE,
        pathColor: barColor ? barColor : COLORS.PL_PRIMARY,
      })}
    >
      <Typography
        variant="h3"
        className={fontClass}
        data-testid="circleProgressValue"
      >
        {percentage ? percentage : 0}
        {font === 'ActivityScore' ? '' : '%'}
      </Typography>
    </CircularProgressbarWithChildren>
  );
};

export default CircleProgress;
