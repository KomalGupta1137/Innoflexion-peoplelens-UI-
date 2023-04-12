import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    height: '40px',
    width: '25px',
  },
  small: {
    height: '10.61px',
    width: '11.21px',
  },
  medium: {
    height: '21px',
    width: '21px',
  },
  smallMedium: {
    height: '18px',
    width: '18px',
  },
}));

export interface ImageProps {
  title: string;
  imageSrc: any;
  imageSize: string;
  height?: any;
  width?: any;
}

const Icon: React.FC<ImageProps> = ({
  title,
  imageSrc,
  imageSize,
  height = '',
  width = '',
}: ImageProps) => {
  const classes = useStyles();
  let className = classes.small;
  if (imageSize === 'large') {
    className = classes.large;
  } else if (imageSize === 'medium') {
    className = classes.medium;
  } else if (imageSize === 'smallMedium') {
    className = classes.smallMedium;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  if (height != '' && width != '')
    return (
      <CardMedia
        style={{ height: height, width: width }}
        title={title}
        image={imageSrc}
      />
    );
  else
    return <CardMedia className={className} title={title} image={imageSrc} />;
};

export default Icon;
