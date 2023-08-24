/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressFilterType from './types';

interface AddressFilterProps extends AddressFilterType {
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

export default AddressFilterProps;
