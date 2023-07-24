import React from 'react';
import './index.scss'
interface MenuProps {
}

const Menu: React.FC<MenuProps> = () => {


  return (
    <ul className='menu'>
      <li>Личный кабинет</li>
      <li>Правила</li>
      <li>Настройки</li>
    </ul>
  );
};

export default Menu;
