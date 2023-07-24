export const getPriceWithSpaces = (price: string) =>
  price.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
