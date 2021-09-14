import React from 'react';
import styled from 'styled-components';
import Icon from '../components/Icon';
import style from '../style/components/nav.module.scss';
const RedDot = styled.span`
  position: relative;
  &::after {
    content: '';
    background: red;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    right: -1px;
    top: -1px;
  }
`;

function Nav() {
  return (
    <nav className={`block ${style.nav}`}>
      <ul className="flex justify-end h-14 items-center px-5">
        <li className={style.list_item}>
          <RedDot>
            <Icon name="envelope" />
          </RedDot>
          信件
        </li>
        <li className={style.list_item}>
          <RedDot>
            <Icon name="notification" />
          </RedDot>
          通知
        </li>
        <li className={style.list_item}>
          <Icon name="settings" />
          設置
        </li>
        <li className={style.list_item}>
          <Icon name="people" />
          6687899
        </li>
        <li className={style.list_item}>
          <Icon name="log-out" />
          登出
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
