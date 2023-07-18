import React from 'react';
import AdProps from './interface';

const AdCard = ({ title, address, price, description, domain, url, photos }: AdProps) => {
  return (
    <div>
      <img src={photos[0]} />
      <p>{title}</p>
      <p>{address}</p>
      <p>{price}</p>
      <p>{description}</p>
      <p>{domain}</p>
      <p>{url}</p>
    </div>
  );
};

export default AdCard;
