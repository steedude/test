import React from "react";

function Icon(props) {
  return <i name={props.name} onClick={props.clickFn} className="v-icon customIcon"></i>;
}

export default Icon;
