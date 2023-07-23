interface AdPagesProps {
  limit: number;
  totalCount: number;
  pageState: number | string;
  setPageState: React.Dispatch<React.SetStateAction<number | string>>;
}

export default AdPagesProps;
