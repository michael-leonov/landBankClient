import FormValues from '../auth-form/types';

type ChangeFormValues = Pick<FormValues, 'password' | 'passwordRepeat'>;

export default ChangeFormValues;
