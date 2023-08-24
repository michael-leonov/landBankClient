export const getPriceWithSpaces = (price: string | undefined) => {
  if (price === undefined) {
    return 0;
  }

  return price.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
};
