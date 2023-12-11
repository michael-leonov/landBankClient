import React from 'react';
import { Link } from 'react-router-dom';

import { links } from './option';
import * as S from './styles';

const UsefulLinks = () => {
  return (
    <S.UsefulLinks>
      {links.map((link, i) => (
        <li key={i}>
          {Array.isArray(link.links) ? (
            <>
              {i + 1}. {link.title}
              <S.SubUsefulLinks>
                {link.links.map((link, j) => (
                  <li key={i + 1 + j}>
                    {`${i + 1}.${j + 1}`}{' '}
                    <Link to={link.link} target='_blank'>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </S.SubUsefulLinks>
            </>
          ) : (
            <Link to={link.links as string} target='_blank'>
              {i + 1}. {link.title}
            </Link>
          )}
        </li>
      ))}
    </S.UsefulLinks>
  );
};

export default UsefulLinks;
