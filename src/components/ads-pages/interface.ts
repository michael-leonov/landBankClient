interface AdPagesProps {
  limit: number;
  totalCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default AdPagesProps;
