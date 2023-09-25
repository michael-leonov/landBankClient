import { UserInfo } from '../../redux/slices/userSlice/interface';

type FormValues = Pick<UserInfo, 'email'>;

export default FormValues;
