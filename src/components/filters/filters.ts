export const formSearchItem = [
  {
    name: 'domain',
    options: [
      { label: 'Циан', value: 'cian.ru' },
      { label: 'Авито', value: 'avito.ru' },
    ],
    spanValue: 'Источник',
    type: 'checkbox',
  },
  {
    name: 'area',
    options: [
      { name: 'area_from', placeholder: 'от', suffix: 'м²' },
      { name: 'area_to', placeholder: 'до', suffix: 'м²' },
    ],
    spanValue: 'Площадь',
    type: 'list-input',
  },
  {
    name: 'price',
    options: [
      { name: 'price_from', placeholder: 'от', suffix: '₽' },
      { name: 'price_to', placeholder: 'до', suffix: '₽' },
    ],
    spanValue: 'Цена',
    type: 'list-input',
  },
  {
    params: [
      {
        name: 'domain',
        options: [
          { label: 'Циан', value: 'cian.ru' },
          { label: 'Авито', value: 'avito.ru' },
        ],
        spanValue: 'Источник',
        type: 'checkbox',
      },
      {
        name: 'area',
        options: [
          { name: 'area_from', placeholder: 'от', suffix: 'м²' },
          { name: 'area_to', placeholder: 'до', suffix: 'м²' },
        ],
        spanValue: 'Площадь',
        type: 'list-input',
      },
      {
        name: 'price',
        options: [
          { name: 'price_from', placeholder: 'от', suffix: '₽' },
          { name: 'price_to', placeholder: 'до', suffix: '₽' },
        ],
        spanValue: 'Цена',
        type: 'list-input',
      },
    ],
    spanValue: 'Фильтры',
    type: 'filters-modal',
  },
];
