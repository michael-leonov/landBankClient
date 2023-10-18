import { INews } from '../../redux/services/news/interface';

export type EditNewsFormProps = Pick<INews, 'id' | 'title' | 'annotation' | 'section'>;

export type FormValues = Omit<EditNewsFormProps, 'id'>;
