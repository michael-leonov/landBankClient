interface AdPagesProps {
  limit: number;
  totalCount: number;
  pageState: number | string;
  setPageState: React.Dispatch<React.SetStateAction<number | string>>;
  isLoading: boolean;
  isFetching: boolean;
}

export default AdPagesProps;
