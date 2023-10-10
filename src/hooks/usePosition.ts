import { useState, useEffect, SetStateAction } from 'react';

type Position = { latitude: number; longitude: number } | object;

export const usePosition = () => {
  const [position, setPosition] = useState<Position | object>({});
  const [error, setError] = useState<null | string>(null);

  const onChange = (pos: GeolocationPosition) => {
    const crd = pos.coords;

    setPosition({ latitude: crd.latitude, longitude: crd.longitude });
  };

  const onError = (error: { message: SetStateAction<string | null> }) => {
    setError(error.message);
    setPosition({ latitude: 55.751574, longitude: 37.573856 });
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
      setPosition({ latitude: 55.751574, longitude: 37.573856 });
      return;
    }

    // Подписываемся на изменение геопозиции браузера.
    const watcher = geo.watchPosition(onChange, onError);

    // В случае, если компонент будет удаляться с экрана
    // производим отписку от слежки, чтобы не засорять память.
    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, error };
};
