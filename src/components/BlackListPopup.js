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
          <button className="btn blue">送出</button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        firstName:
        <input {...register("firstName")} /> {/* register an input */}
        lastName:
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <p>Last name is required.</p>}
        age:
        <input {...register("age", { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
        <input type="submit" />
      </form>
    </Popup>
  );
}

export default BlackListPopup;
