import React from 'react';
import logo from '../images/Vector(1).svg';
import NavBar from './NavBar';

function Header({ isNavOpened, onClickNav }) {
   return (
      <header className={`header ${isNavOpened && 'header_margin_top'}`}>
         <img className="header__logo" src={logo} alt="Логотип" />
         <NavBar
            onClickNav={onClickNav}
            isNavOpened={isNavOpened}
         />
      </header>
   )
};
export default Header;