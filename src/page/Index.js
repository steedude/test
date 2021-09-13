import React, { useState } from 'react';
import Nav from '../components/Nav';
import { withRouter } from 'react-router-dom';
// import stylesCss from '../style/page/index.scss';
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
    <div className="bg-index-bg bg-cover h-screen pt-10">
      <div className="wrapper w-4/5 m-auto">
        <Nav />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-10">
          {list.map((item, i) => {
            return (
              <li
                key={`index` + i}
                className="msg h-52 cursor-pointer"
                onClick={() => {
                  goLink(item.link);
                }}
              >
                <img
                  className="w-4/5 m-auto"
                  src={`/image/${item.img}.png`}
                  alt=""
                />
                <p className="mt-6">{item.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Index);
