import { getPriceWithSpaces } from './getPriceWithSpaces';

const priceByAreaUnitFilter = (areaUnit: string | undefined, unitPrice: number) => {
  switch (areaUnit) {
    case 'acres':
      return `${getPriceWithSpaces((unitPrice * 100).toFixed(2).toString())} ₽ за cотку`;

    case 'sm':
      return `${getPriceWithSpaces(unitPrice.toFixed(2).toString())} ₽ за кв.м`;

    default:
      return `${getPriceWithSpaces((unitPrice * 10000).toFixed(2).toString())} ₽ за гектар`;
  }
};

export default priceByAreaUnitFilter;
