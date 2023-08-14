import { PropsWithChildren } from 'react';
import { FieldErrors } from 'react-hook-form';

import FormValues from '../types';

interface FilterByPropProps extends PropsWithChildren {
  filterName: string;
  errors: FieldErrors<FormValues>;
  activeKey: string;
  setActiveKey: (v: string) => void;
}

export default FilterByPropProps;
