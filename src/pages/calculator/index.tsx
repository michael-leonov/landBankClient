import React, { useState } from 'react';

import betaIcon from '../../assets/beta.png';
import CalculatorForm from '../../components/calculator-form';
import { StyledContainer, StyledSection } from '../../styles/common-styled-components/styles';
import { ICalculatorResult } from './interface';
import * as S from './styles';

const Calculator = () => {
  const [result, setResult] = useState<ICalculatorResult | string | null>(null);

  return (
    <StyledSection>
      <StyledContainer>
        <S.Block>
          <S.FormBlock>
            <S.TitleWrapper>
              <h1>Калькулятор cтоимости сельхозугодий</h1>
              <img src={betaIcon} width={40} />
            </S.TitleWrapper>
            <S.Description>
              Среднерыночный диапозон стоимости 1 га земель сельскохозяйственного назначения,
              используемых в качестве пашни.
            </S.Description>
            <CalculatorForm setResult={setResult} />
          </S.FormBlock>
          {result && (
            <S.ResultBlock>
              {typeof result !== 'string' ? (
                <div>
                  <p>
                    Для региона: <b>{result.title}</b>
                  </p>
                  <p>
                    C видом права: <b>{result.rent}</b>
                  </p>
                  <p>
                    С площадью: <b>{result.area} Га</b>
                  </p>
                  <p>
                    Среднерыночный диапозон стоимости 1 га равен{' '}
                    <b>
                      {result.minPrice.toFixed(0)} - {result.maxPrice.toFixed(0)} ₽
                    </b>
                  </p>
                </div>
              ) : (
                <p>{result}</p>
              )}
            </S.ResultBlock>
          )}
        </S.Block>
      </StyledContainer>
    </StyledSection>
  );
};

export default Calculator;
