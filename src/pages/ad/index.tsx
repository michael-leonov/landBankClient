import React from 'react';
import { useParams } from 'react-router-dom';

const Ad = () => {
  const { id } = useParams();

  return <div>Ad page with id: {id}</div>;
};

export default Ad;
