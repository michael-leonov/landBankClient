export const dadataAddressHints = async (query: string) => {
  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  const token = process.env.REACT_APP_DADATA_TOKEN;

  const options = {
    body: JSON.stringify({ query: query }),
    headers: {
      Accept: 'application/json',
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors' as RequestMode,
  };

  const res = await fetch(url, options);

  const data = await res.json();

  return data;
};
