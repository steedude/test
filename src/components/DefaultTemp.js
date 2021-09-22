import React from "react";
import SideBar from "../components/SideBar";
import styled from "styled-components";

const DefaultComponent = styled.div`
  display: flex;
`;

function DefaultTemp() {
  return (
    <DefaultComponent>
      <div className="wrapper">
        <div className="container"></div>
      </div>
      <SideBar />
    </DefaultComponent>
  );
}

export default DefaultTemp;
