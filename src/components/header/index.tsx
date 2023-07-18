import React from 'react';
import logo from '../../assets/logo-v2.svg';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';

const Header = () => {
  return (
    <div>
      <Link to={HOME_ROUTE}>
        <img src={logo} />
      </Link>
    </div>
  );
};

export default Header;
