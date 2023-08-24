import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form/dist/types/form';

import FormValues from '../types';

interface FiltersByPropListProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;

  setValue: UseFormSetValue<FormValues>;
}

export default FiltersByPropListProps;
