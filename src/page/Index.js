import React, { useState } from 'react';
import Icon from '../components/Icon';
import { withRouter } from 'react-router-dom';
function Index(props) {
  const list = [
    { name: '線路管家', img: 'logo_wan', link: '/wan' },
    { name: '智能DBA', img: 'logo_log', link: '/log' },
    { name: '域名管家', img: 'logo_dns', link: '/dns' },
    { name: 'SWAF', img: 'logo_waf', link: '/waf' },
  ];

  const goLink = (link) => {
    props.history.push(link);
  };
  return (
    <ul>
      {list.map((item, i) => {
        return (
          <li
            key={`index` + i}
            className="msg"
            onClick={() => {
              goLink(item.link);
            }}
          >
            <Icon name="up" />
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default withRouter(Index);
