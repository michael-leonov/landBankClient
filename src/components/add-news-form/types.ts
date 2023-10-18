import { INews } from '../../redux/services/news/interface';

type FormValues = Pick<INews, 'title' | 'annotation' | 'section'>;

export default FormValues;
