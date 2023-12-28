/* eslint-disable no-console */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { regions } from '../../utils/data/regions.data';
import CustomButton from '../custom-button';
import SubmitingForm from '../submiting-form';
import { CalculatorFormProps } from './interface';
import { rents } from './options';
import { regionsPriceRange } from './priceRange.data';
import * as S from './styles';
import FormValues from './types';

const CalculatorForm = ({ setResult }: CalculatorFormProps) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: 'all' });

  const [regionState, setRegionState] = useState<string | null>(null);
  const [rentState, setRentState] = useState<string | null>(null);

  const onChangeSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: (v: string | null) => void,
  ) => setState(e.target.options[e.target.selectedIndex].textContent);

  const calculateResult = (data: FormValues) => {
    const { area, region, rent } = data;

    const regionData = regionsPriceRange.find(({ id }) => id === region);

    console.log(regionData);

    if (regionData?.min || regionData?.max) {
      const minArea = 100;
      const maxArea = 1000;
      let kArea = 1;

      if (area < minArea) {
        kArea = 1.15;
      } else if (area > maxArea) {
        kArea = 0.94;
      }

      const minPrice = regionData?.min * rent * kArea;
      const maxPrice = regionData?.max * rent * kArea;

      setResult({
        area,
        maxPrice,
        minPrice,
        rent: rentState as string,
        title: regionState as string,
      });
    } else {
      setResult('Нет данных');
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        calculateResult(data);
        return resolve();
      }, 1000);
    });

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.ElementFormWrapper>
        <label>Регион</label>
        <S.Select
          {...register('region', {
            required: 'Выберите регион',
            valueAsNumber: true,
          })}
          onChange={(e) => onChangeSelect(e, setRegionState)}
          defaultValue={''}
        >
          <option value='' disabled={true}>
            --Выберите регион--
          </option>
          {regions.map((region) => (
            <option key={region.kladr_id} value={region.kladr_id}>
              {region.name_with_type}
            </option>
          ))}
        </S.Select>
        {errors.region && <S.ErrorInput>{errors.region.message}</S.ErrorInput>}
      </S.ElementFormWrapper>

      <S.ElementFormWrapper>
        <label>Вид права</label>
        <S.Select
          {...register('rent', {
            required: 'Выберите вид права',
            valueAsNumber: true,
          })}
          onChange={(e) => onChangeSelect(e, setRentState)}
          defaultValue={''}
        >
          <option value='' disabled={true}>
            --Выберите вид права--
          </option>
          {rents.map((rent) => (
            <option key={rent.id} value={rent.value}>
              {rent.title}
            </option>
          ))}
        </S.Select>
        {errors.rent && <S.ErrorInput>{errors.rent.message}</S.ErrorInput>}
      </S.ElementFormWrapper>

      <S.ElementFormWrapper>
        <label>Площадь, Га</label>
        <S.Input
          type='number'
          {...register('area', {
            required: 'Введите площадь',
            valueAsNumber: true,
          })}
        />
        {errors.area && <S.ErrorInput>{errors.area.message}</S.ErrorInput>}
      </S.ElementFormWrapper>

      <div>
        <CustomButton disabled={isSubmitting} type='submit'>
          Рассчитать
        </CustomButton>
      </div>
      <SubmitingForm loading={isSubmitting} />
    </S.Form>
  );
};

export default CalculatorForm;
