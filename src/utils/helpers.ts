import { COLORS } from '../plTheme';

export const roundNumber = (num: string) => {
  const parts = num.split(',');
  return parts.length > 1
    ? (
      Math.round(
        (parseInt(parts.join(''), 10) / Math.pow(1000, parts.length - 1)) *
        10,
      ) / 10
    )?.toString() + ['K', 'M', 'B'][parts.length - 2]
    : parts[0];
};

export const ProductColorMapping: { name: string; color: string }[] = [
  {
    name: 'Prod1',
    color: '#366FF5',
  },
  {
    name: 'Prod2',
    color: '#0B69FF',
  },
  {
    name: 'Prod3',
    color: '#5BBFF9',
  },
];
