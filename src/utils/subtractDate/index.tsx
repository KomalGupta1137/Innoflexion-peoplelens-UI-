import { useLayoutEffect, useState } from 'react';

export const subtractDate = (date1: string) => {
  const currDate = new Date(date1);

  const retDate = new Date(currDate.getTime());
  retDate.setFullYear(retDate.getFullYear() - 1);

  return retDate.toISOString();
};
