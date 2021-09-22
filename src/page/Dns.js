import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store/slice/todo";
import * as common from "../utils/common";
import styled from "styled-components";
import SideBar from "../components/SideBar";

const DnsComponent = styled.div`
  display: flex;
`;

function Dns() {
  const [listName, setListName] = useState("");
  const todolist = useSelector((state) => state.todo.todolist);
  const dispatch = useDispatch();
  const addTodoList = () => {
    dispatch(addTodo({ id: new Date().getTime(), name: listName }));
    setListName("");
  };

  const test = () => {
    common.test();
  };
  return (
    <DnsComponent>
      <div className="wrapper">
        <div className="container">
          <SideBar />
          <input
            value={listName}
            onChange={(e) => {
              setListName(e.target.value);
            }}
          />
          <button onClick={test}>test</button>
          <button onClick={addTodoList}>add</button>
          <ul>
            {todolist.map((todo, i) => {
              return <li key={i + "list"}>{todo.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </DnsComponent>
  );
}

export default Dns;
