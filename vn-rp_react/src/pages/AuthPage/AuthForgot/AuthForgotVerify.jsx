import { BarcodeOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

/*eslint no-useless-escape: "off"*/

const schema = yup.object().shape({
  code: yup.string()
    .required("Vui lòng nhập mã xác nhận")
});

function AuthForgotVerify() {
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form_field">
        <span><BarcodeOutlined /></span>
        <input name="code" type="text" className="form_input"
          placeholder="Mã xác nhận"
          ref={register()}
        />
        {
          errors.code?.message &&
          <span className="form_error">
            {errors.code?.message}
          </span>
        }

      </div>

      <div className="form_submit">
        <button className="btn btn-success">Xác nhận</button>
      </div>
    </form>
  );
}

export default AuthForgotVerify;