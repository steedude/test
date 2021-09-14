import React, { useState } from 'react';
// import { withRouter } from 'react-router-dom';
import Icon from '../components/Icon';
import styled from 'styled-components';

const Menu = styled.div`
  width: 240px;
  height: 100vh;
  background: $purple;
  img {
    width: 75%;
    display: block;
    margin: auto;
  }
  .level1 {
    li {
      padding: 8px 0;
      cursor: pointer;
    }
  }
  .leve2 {
    padding: 8px 0;
    li {
      display: flex;
      justify-content: center;
    }
  }
  p {
    padding: 8px 0;
    display: flex;
    width: 40%;
    justify-content: center;
    &::hover {
      background: $purple_light;
    }
    i {
      display: block;
      width: 20%;
      color: #fff;
    }
  }
`;

function SideBar() {
  const [nowActive, setNowActive] = useState('');
  const list = [
    { id: 'menu', name: 'Dashboard', icon: 'menu', link: '/', subList: [] },
    {
      id: 'log',
      name: '線路群組',
      icon: 'share',
      link: '/log',
      subList: [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }],
    },
    { id: 'waf', name: '帳號管理', icon: 'people', link: '/waf', subList: [] },
    { id: 'dns', name: 'DNS管理', icon: 'globe', link: '/dns', subList: [] },
    { id: 'wan', name: '主選項', icon: 'layer', link: '/wan', subList: [] },
  ];
  const handleClick = (id) => {
    setNowActive(id);
  };
  return (
    <Menu>
      <img
        className="w-3/4 m-auto"
        src={`/image/logo_${'routeName'}.png`}
        alt=""
      />
      <ul className="level1">
        {list.map((item, i) => {
          return (
            <li key={i + 'sid'} onClick={() => handleClick(item.id)}>
              <p className="">
                <Icon name="item.icon" />
                <span>{item.name}</span>
                <Icon name={nowActive === item.id ? 'up' : 'down'} />
              </p>
              {nowActive === item.id && (
                <ul className="level2">
                  {item.subList.map((vo, k) => {
                    return (
                      <li>
                        <span>{vo.name}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </Menu>
  );
}

export default SideBar;
