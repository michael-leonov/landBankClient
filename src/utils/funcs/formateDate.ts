const formateDate = (timeISOstring: string) => {
  const now = new Date();
  const date = new Date(Date.parse(timeISOstring) - 60000);

  const today = now.toDateString();
  const argDate = date.toDateString();
  const diff = new Date(today).getTime() - new Date(argDate).getTime();

  const timeStr = date.toLocaleTimeString().slice(0, -3);

  return (
    (today === argDate && `Сегодня в ${timeStr}`) ||
    (diff <= 86400000 && `Вчера в ${timeStr}`) ||
    date.toLocaleString().slice(0, 10)
  );
};

export default formateDate;
