import React, { useState } from 'react'
import { v4 as uuid4 } from "uuid";
function Index() {
    const list = [
        { name: "線路管家", img: "logo_wan", link: "/wan" },
        { name: "智能DBA", img: "logo_log", link: "/log" },
        { name: "域名管家", img: "logo_dns", link: "/dns" },
        { name: "SWAF", img: "logo_waf", link: "/waf" },
    ];
    const [nowActive, setNowActive] = useState('')

    const goLink = (id) => {
        setNowActive(id)
    }
    return (
        <ul>
           {
               list.map( item =>{
                   return <li key={} className="msg" onCilck={ () => { goLink(item.id) } }>{item.name}</li>
               })
           } 
        </ul>
    )
}

export default Index
