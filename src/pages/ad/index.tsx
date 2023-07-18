/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAdByIdQuery } from '../../redux/services/ads';
import React from 'react';
import { useParams } from 'react-router-dom';


const Ad = () => {
  const { id } = useParams();


  const { data, isLoading, isError, isSuccess } = useGetAdByIdQuery(Number(id));

  if (isSuccess) {
    console.log(data);
  }

  return (
    <div>
      Ad page with id: {id}
      {/* {photos.map((photo, i) => (
        <img key={i} src={photo} alt={title} />
      ))} */}
    </div>
  );
};

export default Ad;
