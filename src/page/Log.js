import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../store/slice/apiTest";
import styled from "styled-components";
const LogComponent = styled.div`
  display: flex;
`;
function Log() {
  const cityList = useSelector((state) => state.users.city);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("cityList---", cityList);
    dispatch(fetchUserById(123));
  }, []);

  return (
    <LogComponent>
      <SideBar />
      <div className="wrapper">
        <div className="container">
          <ul>
            {cityList.map((item, index) => {
              return (
                <li key={index + "k"}>
                  <span>{item["營業人名稱"]}</span>
                  <span>{item["營業地址"]}</span>
                  <span>{item["負責人姓名"]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </LogComponent>
  );
}

export default Log;
