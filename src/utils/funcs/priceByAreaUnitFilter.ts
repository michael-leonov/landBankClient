import { getPriceWithSpaces } from './getPriceWithSpaces';

const priceByAreaUnitFilter = (areaUnit: string | undefined, price: number, area: number) => {
  switch (areaUnit) {
    case 'acres':
      return `${getPriceWithSpaces((price / (area / 100)).toFixed().toString())} ₽ за cотку`;

    case 'sm':
      return `${getPriceWithSpaces((price / area).toFixed().toString())} ₽ за кв.м`;

    default:
      return `${getPriceWithSpaces((price / (area / 10000)).toFixed().toString())} ₽ за гектар`;
  }
};

export default priceByAreaUnitFilter;
