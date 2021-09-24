import React from "react";
import Popup from "./Popup";
import { useForm } from "react-hook-form";
function BlackListPopup(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Popup
      closePop={props.closePop}
      size=""
      header={<h1>Here might be a page title</h1>}
      footer={
        <>
          <button className="btn red">取消</button>
          <button type="submit" form="black-form" className="btn blue">
            送出
          </button>
        </>
      }
    >
      <form id="black-form" onSubmit={handleSubmit(onSubmit)}>
        <ul className="popup-list">
          <li>
            <span>Time</span>
            <input {...register("time")} /> {/* register an input */}
          </li>
          <li>
            <span>Auth</span>
            <input defaultValue="test" {...register("Auth", { required: true })} />
            {errors.Auth && <p>auth is required.</p>}
          </li>
          <li>
            <span>Action</span>
            <input placeholder="Action" {...register("age", { pattern: /\d+/ })} />
            {errors.age && <p>Please enter number for age.</p>}
          </li>
          <li>
            <span>Status</span>
            <input {...register("Status", { required: true })} type="radio" value="Active" />
            <input {...register("Status", { required: true })} type="radio" value="Inactive" />
          </li>
          <li>
            <span>IP</span>
            <select {...register("Title", { required: true })}>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
            </select>
          </li>
        </ul>
      </form>
    </Popup>
  );
}

export default BlackListPopup;
