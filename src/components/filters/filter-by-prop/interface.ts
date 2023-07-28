import { PropsWithChildren } from 'react';
import { FieldErrors } from 'react-hook-form';

import FormValues from '../types';

interface FilterByPropProps extends PropsWithChildren {
  filterName: string;
  errors: FieldErrors<FormValues>;
}

export default FilterByPropProps;
