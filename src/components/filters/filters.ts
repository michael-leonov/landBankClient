export const formSearchItem = [
  {
    spanValue: 'Источник',
    type: 'checkbox',
    name: 'domain',
    options: [
      { label: 'Циан', value: 'cian.ru' },
      { label: 'Авито', value: 'avito.ru' },
    ],
  },
  {
    spanValue: 'Площадь',
    type: 'list-input',
    name: 'area',
    options: [
      { name: 'area_from', placeholder: 'от', suffix: 'м²' },
      { name: 'area_to', placeholder: 'до', suffix: 'м²' },
    ],
  },
  {
    spanValue: 'Цена',
    type: 'list-input',
    name: 'price',
    options: [
      { name: 'price_from', placeholder: 'от', suffix: '₽' },
      { name: 'price_to', placeholder: 'до', suffix: '₽' },
    ],
  },
  {
    spanValue: 'Фильтры',
    type: 'filters-modal',
    params: [
      {
        spanValue: 'Источник',
        type: 'checkbox',
        name: 'domain',
        options: [
          { label: 'Циан', value: 'cian.ru' },
          { label: 'Авито', value: 'avito.ru' },
        ],
      },
      {
        spanValue: 'Площадь',
        type: 'list-input',
        name: 'area',
        options: [
          { name: 'area_from', placeholder: 'от', suffix: 'м²' },
          { name: 'area_to', placeholder: 'до', suffix: 'м²' },
        ],
      },
      {
        spanValue: 'Цена',
        type: 'list-input',
        name: 'price',
        options: [
          { name: 'price_from', placeholder: 'от', suffix: '₽' },
          { name: 'price_to', placeholder: 'до', suffix: '₽' },
        ],
      },
    ],
  },
];
