import React from 'react';

import * as XLSX from 'xlsx';

import { Ad } from '../../redux/services/ads/interface';
import CustomButton from '../custom-button';
import DownloadAdsXlsxProps from './interface';
import * as S from './styles';

const DownloadAdsXlsx = ({ isLoading, isSuccess, listAnnouncement }: DownloadAdsXlsxProps) => {
  const downloadxls = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: Ad[] | undefined,
  ) => {
    e.preventDefault();
    if (data) {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, 'Объявления.xlsx');
    }
  };

  return (
    <S.DownloadCSVBtnWrapper>
      <CustomButton
        disabled={isLoading}
        variant='outlined'
        onClick={(e) => {
          isSuccess && downloadxls(e, listAnnouncement);
        }}
      >
        Выгрузить объявления в xlsx
      </CustomButton>
    </S.DownloadCSVBtnWrapper>
  );
};

export default DownloadAdsXlsx;
