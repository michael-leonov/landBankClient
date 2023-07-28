import { DaDataAddress, DaDataSuggestion } from 'react-dadata';

interface SearchBarProps {
  value?: DaDataSuggestion<DaDataAddress>;
  setValue: (suggestion?: DaDataSuggestion<DaDataAddress> | undefined) => void;
}
export default SearchBarProps;
