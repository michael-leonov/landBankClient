import { AdId, UserId } from './types';

export interface INote {
  id: number;
  description: string;
  create_at: string;
}

export interface NotesResponse {
  listNotes: INote[];
  totalCount: number;
}

export interface AddNoteResponse extends INote {
  user: UserId;
  announcement: AdId;
}

export interface AddNoteBody {
  userId: number;
  announcementId: number;
  description: string;
}
