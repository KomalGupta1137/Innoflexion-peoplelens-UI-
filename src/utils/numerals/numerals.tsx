import numeral from 'numeral';

function _n_(num: string | number, format: string) {
  return numeral(num).format(format).toUpperCase();
}

export { _n_ };
