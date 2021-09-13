import React from 'react';
import styled from 'styled-components';
// import Icon from '../components/Icon';
import style from '../style/components/nav.module.scss';
const ListItem = styled.li`
  @apply mx-4 cursor-pointer hover:text-purple-600;
`;

function Nav() {
  return (
    <nav className={`block ${style.nav}`}>
      <ul className="flex justify-end h-14 items-center px-5">
        <p className="bg-opacity-40 bg-orange_c-light px-12 hover:text-purple_c flex sm:text-orange_c-light">
          123
        </p>
        <ListItem>
          <span className="red-dot relative">
            <icon name="envelope" />
          </span>
          信件
        </ListItem>
        <ListItem>
          <span className="red-dot relative">
            <icon name="notification" />
          </span>
          通知
        </ListItem>
        <ListItem>
          <icon name="settings" />
          設置
        </ListItem>
        <ListItem>
          <icon name="people" />
          6687899
        </ListItem>
        <ListItem>
          <icon name="log-out" />
          登出
        </ListItem>
      </ul>
    </nav>
  );
}

export default Nav;
