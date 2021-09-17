import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../store/slice/apiTest";
function Log() {
  const cityList = useSelector((state) => state.users.city);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("cityList---", cityList);
    dispatch(fetchUserById(123));
  }, []);

  return (
    <>
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
    </>
  );
}

export default Log;
