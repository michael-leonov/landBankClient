import React from 'react';

import * as XLSX from 'xlsx';

import { useGetAdsQuery } from '../../redux/services/ads/adsApi';
import { Ad } from '../../redux/services/ads/interface';
import FiltersAdsState from '../../redux/slices/filtersAdsSlice/interface';
import CustomButton from '../custom-button';
import * as S from './styles';

const DownloadAdsXlsx = ({ filtersAds }: { filtersAds: FiltersAdsState }) => {
  const { data, isError, isLoading, isSuccess } = useGetAdsQuery({
    limit: undefined,
    page: undefined,
    provideTag: undefined,
    ...filtersAds,
  });

  const downloadxls = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: Ad[]) => {
    e.preventDefault();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'Объявления.xlsx');
  };

  if (isError) {
    return null;
  }

  return (
    <S.DownloadCSVBtnWrapper>
      <CustomButton
        disabled={isLoading}
        variant='outlined'
        onClick={(e) => {
          isSuccess && downloadxls(e, data.listAnnouncement);
        }}
      >
        Выгрузить объявления в xlsx
      </CustomButton>
    </S.DownloadCSVBtnWrapper>
  );
};

export default DownloadAdsXlsx;
