import { INote } from '../../redux/services/notes/interface';

interface NoteProps extends INote {
  i: number;
  windowWidth: number;
}

export default NoteProps;
