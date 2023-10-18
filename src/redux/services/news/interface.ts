export interface INews {
  id: number;
  create_at: string;
  update_at: string;
  title: string;
  article: FormData;
  section: string;
  annotation: string;
}

export interface NewsResponse {
  listNews: INews[];
  totalCount: number;
}
