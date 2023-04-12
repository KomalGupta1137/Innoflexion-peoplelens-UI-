/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles, withStyles } from '@material-ui/core';
import { RepComparisonProperties } from '../../molecules/RepComparisonSalesOutcome/RepComparisonProperties';
import { COLORS } from '../../../plTheme';
// import { BorderLinearProgressBar } from '../ProgressBarExports';

interface RepProgressBarProps {
  value: number | null | undefined;
  type: string | undefined;
  maxValue: number | null | undefined;
  minValue: number | null | undefined;
}

const RepProgressBar: React.FC<RepProgressBarProps> = ({
  value,
  type,
  maxValue,
  minValue,
}: RepProgressBarProps) => {
  let barBackgroundColor = '';

  let amountValuetoPercentage = 0;

  if (type === 'amount') {
    if (value && value < minValue!) {
      barBackgroundColor = COLORS.AVATARS_RED_2;
    } else if (value && value >= RepComparisonProperties.amount.positiveValue) {
      barBackgroundColor = COLORS.SUCCESS_PRESSED;
    } else {
      barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
    }
    if (value) {
      if (maxValue && maxValue != 0) {
        amountValuetoPercentage = Math.round((value / maxValue) * 100);
      }
    }
    value = amountValuetoPercentage;
  } else if (type === 'dealSizeAmount') {
    if (value && value < minValue!) {
      barBackgroundColor = COLORS.AVATARS_RED_2;
    } else if (value && value >= maxValue!) {
      barBackgroundColor = COLORS.SUCCESS_PRESSED;
    } else {
      barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
    }
    if (value) {
      if (maxValue && maxValue != 0) {
        amountValuetoPercentage = Math.round((value / maxValue) * 100);
      }
    }
    value = amountValuetoPercentage;
  } else if (type === 'percentage') {
    if (value && value < minValue!) {
      barBackgroundColor = COLORS.AVATARS_RED_2;
    } else if (value && value >= maxValue!) {
      barBackgroundColor = COLORS.SUCCESS_PRESSED;
    } else {
      barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
    }
    if (value) {
      if (maxValue && maxValue != 0) {
        amountValuetoPercentage = Math.round((value / maxValue) * 100);
      }
    }
    value = amountValuetoPercentage;
  } else if (type === 'winRatePercentage') {
    if (value && value < minValue!) {
      barBackgroundColor = COLORS.AVATARS_RED_2;
    } else if (value && value >= maxValue!) {
      barBackgroundColor = COLORS.SUCCESS_PRESSED;
    } else {
      barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
    }
  } else if (type === 'dealsClosed') {
    if (value && value < minValue!) {
      barBackgroundColor = COLORS.AVATARS_RED_2;
    } else if (value && value >= maxValue!) {
      barBackgroundColor = COLORS.SUCCESS_PRESSED;
    } else {
      barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
    }
    if (value) {
      if (maxValue && maxValue != 0) {
        amountValuetoPercentage = Math.round((value / maxValue) * 100);
      }
    }
    value = amountValuetoPercentage;
  } else if (type === 'days') {
    if (value && value >= maxValue!) {
      barBackgroundColor = COLORS.AVATARS_RED_2;
    } else if (value && value < minValue!) {
      barBackgroundColor = COLORS.SUCCESS_PRESSED;
    } else {
      barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
    }
    if (value) {
      if (maxValue && maxValue != 0) {
        amountValuetoPercentage = Math.round((value / maxValue) * 100);
      }
    }
    value = amountValuetoPercentage;
  } else if (type === 'salesActivity') {
    if (value && value < minValue!) {
      barBackgroundColor = COLORS.AVATARS_RED_2;
    } else if (value && value >= maxValue!) {
      barBackgroundColor = COLORS.SUCCESS_PRESSED;
    } else {
      barBackgroundColor = COLORS.TERTIARY_COLOR_ORANGE;
    }
  }

  const BorderLinearProgressBar = withStyles(() =>
    createStyles({
      root: {
        height: '5.79px',
        width: '150px',
        borderRadius: 5,
      },
      colorPrimary: {
        backgroundColor: 'rgba(143, 146, 161, 0.2)',
      },
      bar: {
        borderRadius: 5,
        backgroundColor: `${barBackgroundColor}`,
      },
    }),
  )(LinearProgress);
  return (
    <BorderLinearProgressBar
      variant="determinate"
      value={value ? (value > 100 ? value / 2 : value) : 0}
    />
  );
};

export default RepProgressBar;
