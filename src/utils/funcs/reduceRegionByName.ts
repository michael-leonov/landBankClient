import { regions } from '../data/regions.data';

interface IRegion {
  name: string;
  type: string;
  name_with_type: string;
  federal_district: string;
  kladr_id: string | number;
  fias_id: string;
  okato: number | string;
  oktmo: number | string;
  tax_office: string | number;
  postal_code: number | string;
  iso_code: string;
  timezone: string;
  geoname_code: string;
  geoname_id: number;
  geoname_name: string;
}

export interface accProp {
  [key: string]: IRegion[];
}

const reduceRegionByName = () => {
  const reduceLetters = regions.reduce((acc: accProp, el: IRegion) => {
    const firstLetter = el.name[0];

    acc[firstLetter] = [...(acc[firstLetter] || []), el];

    return acc;
  }, {});

  return reduceLetters;
};

export default reduceRegionByName;
