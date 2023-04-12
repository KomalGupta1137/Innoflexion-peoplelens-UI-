import Button from '@material-ui/core/Button';
import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';

export default {
  title: 'Atoms/Button',
};

export const Default = () => {
  const variantOptions = ['contained', 'text', 'outlined'];
  const sizeOptions = ['small', 'medium', 'large'];
  const buttonColorOptions = ['primary', 'secondary', 'disabled'];
  return (
    <Button
      disabled={boolean('isDisabled', false)}
      variant={select('Vairant', variantOptions, variantOptions[0])}
      size={select('Size', sizeOptions, sizeOptions[1])}
      color={select(
        'Background Color',
        buttonColorOptions,
        buttonColorOptions[0],
      )}
    >
      {text('text', 'Sample Button')}
    </Button>
  );
};
