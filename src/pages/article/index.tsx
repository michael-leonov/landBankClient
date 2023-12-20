import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';

import ErrorFetch from '../../components/error-handling';
import { useGetNewsByIdQuery } from '../../redux/services/news/newsApi';
import * as S from './styles';

import './styles.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Article = () => {
  const { id } = useParams();

  const { data: article, error, isError, isLoading } = useGetNewsByIdQuery(Number(id));

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  if (isLoading) {
    return (
      <S.LoaderWrapper>
        <ContentLoader
          height='100%'
          width='100%'
          viewBox='0 0 320 350'
          speed={2}
          backgroundColor='#d8d5d5'
          foregroundColor='#ecebeb'
        >
          <rect x='10' y='0' rx='6' ry='6' width='300' height='280' />
          <rect x='65' y='290' rx='6' ry='6' width='200' height='25' />
          <rect x='40' y='325' rx='6' ry='6' width='250' height='20' />
        </ContentLoader>
      </S.LoaderWrapper>
    );
  }

  if (isError) {
    return <ErrorFetch error={error} />;
  }

  return (
    <S.DocumentWrapper>
      <Document
        file={`${process.env.REACT_APP_API_URL}articles/${article?.article}`}
        onLoadSuccess={onDocumentLoadSuccess}
        error='Ошибка загрузки файла! Обновите страницу или попробуйте зайти позже!'
        className='article'
        loading='Загрузка статьи...'
      >
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages && (
        <>
          <S.Pages>
            Страница {pageNumber} из {numPages}
          </S.Pages>
          <S.NavPages>
            <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>
              Предыдущая
            </button>

            <button
              disabled={numPages === pageNumber}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Следующая
            </button>
          </S.NavPages>
        </>
      )}
    </S.DocumentWrapper>
  );
};

export default Article;
