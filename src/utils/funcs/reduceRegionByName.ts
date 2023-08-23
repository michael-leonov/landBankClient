import { regions } from '../data/regions.data';

interface IRegion {
  name: string;
  type: string;
  name_with_type: string;
  federal_district: string;
  kladr_id: string;
  fias_id: string;
  okato: number;
  oktmo: number;
  tax_office: string;
  postal_code: number;
  iso_code: string;
  timezone: string;
  geoname_code: string;
  geoname_id: number;
  geoname_name: string;
}

type elProp = Pick<IRegion, 'name' | 'name_with_type'>;

export interface accProp {
  [key: string]: string[];
}

const reduceRegionByName = () => {
  const reduceLetters = regions.reduce((acc: accProp, el: elProp) => {
    const firstLetter = el.name[0];

    acc[firstLetter] = [...(acc[firstLetter] || []), el.name_with_type];

    return acc;
  }, {});

  return reduceLetters;
};

export default reduceRegionByName;
