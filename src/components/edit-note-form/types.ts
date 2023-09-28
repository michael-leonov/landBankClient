import { INote } from '../../redux/services/notes/interface';

export type EditNoteFormProps = Pick<INote, 'id' | 'description'>;
