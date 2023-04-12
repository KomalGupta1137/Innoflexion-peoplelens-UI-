import React from 'react';
import Rating from '@material-ui/lab/Rating';
import {
  makeStyles,
  withStyles,
  useMediaQuery,
  CardMedia,
} from '@material-ui/core';

import checkedIcon from '../../../assets/CompetencieIcons/checkedIcon.png';
import uncheckedIcon from '../../../assets/CompetencieIcons/uncheckedIcon.png';

interface RatingChartProps {
  value?: number | null;
  indicator: string;
}

const RatingChart: React.FC<RatingChartProps> = ({
  value,
  indicator,
}: RatingChartProps) => {
  const StyledRating = withStyles({
    icon: {
      padding: indicator === 'customized' ? 13 : 8,
    },
  })(Rating);
  const matches = useMediaQuery('(min-width:1500px)');
  const useStyles = makeStyles({
    emptyIconLargeScreen: {
      width: indicator === 'nonDefault' ? '16px' : '18px',
      height: indicator === 'nonDefault' ? '16px' : '18px',
    },
    iconLargeScreen: {
      width: indicator === 'nonDefault' ? '16px' : '18px',
      height: indicator === 'nonDefault' ? '16px' : '18px',
    },
    emptyIconSmallScreen: {
      width: indicator === 'nonDefault' ? '12px' : '16px',
      height: indicator === 'nonDefault' ? '12px' : '16px',
    },
    iconSmallScreen: {
      width: indicator === 'nonDefault' ? '12px' : '16px',
      height: indicator === 'nonDefault' ? '12px' : '16px',
    },
  });
  const classes = useStyles();
  return (
    <StyledRating
      name="read-only"
      value={value}
      icon={
        <img
          className={
            matches
              ? `${classes.iconLargeScreen}`
              : `${classes.iconSmallScreen}`
          }
          src={checkedIcon}
        />
      }
      emptyIcon={
        <img
          className={
            matches
              ? `${classes.emptyIconLargeScreen}`
              : `${classes.emptyIconSmallScreen}`
          }
          src={uncheckedIcon}
        />
      }
      readOnly
      max={5}
      size="large"
    />
  );
};

export default RatingChart;
