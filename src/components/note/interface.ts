import { INote } from '../../redux/services/ads/interface';

interface NoteProps extends INote {
  i: number;
  windowWidth: number;
}

export default NoteProps;
