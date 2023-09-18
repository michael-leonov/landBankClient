import { INote } from '../../redux/services/ads/interface';

export type EditNoteFormProps = Pick<INote, 'id' | 'description'>;
