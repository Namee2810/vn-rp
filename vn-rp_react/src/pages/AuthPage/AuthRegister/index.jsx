import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

/*eslint no-useless-escape: "off"*/
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const schema = yup.object().shape({
  email: yup.string()
    .required("Vui lòng nhập email")
    .matches(emailRegex, "Email không hợp lệ"),
  password: yup.string()
    .required("Vui lòng nhập mật khẩu")
    .matches(passwordRegex, "Mật khẩu cần ít nhất 8 kí tự, 1 chữ hoa và 1 chữ thường"),
  repassword: yup.string()
    .required("Vui lòng nhập mật khẩu")
    .matches(passwordRegex, "Mật khẩu cần ít nhất 8 kí tự, 1 chữ hoa và 1 chữ thường"),
});

function AuthRegister() {
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  const handleEye1 = () => {
    setEye1(!eye1);
  }
  const handleEye2 = () => {
    setEye2(!eye2);
  }
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form_field">
        <span><MailOutlined /></span>
        <input name="email" type="email" className="form_input"
          placeholder="Email"
          ref={register()}
        />
        {
          errors.email?.message &&
          <span className="form_error">
            {errors.email?.message}
          </span>
        }

      </div>

      <div className="form_field">
        <span><LockOutlined /></span>
        <input name="password" type={eye1 ? "text" : "password"} className="form_input form_input_password"
          placeholder="Mật khẩu"
          ref={register()}
        />
        <span style={{ cursor: "pointer" }} onClick={handleEye1}>
          {eye1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </span>
        {
          errors.password?.message &&
          <span className="form_error">
            {errors.password?.message}
          </span>
        }
      </div>

      <div className="form_field">
        <span><LockOutlined /></span>
        <input name="repassword" type={eye2 ? "text" : "password"} className="form_input form_input_password"
          placeholder="Nhập lại mật khẩu"
          ref={register()}
        />
        <span style={{ cursor: "pointer" }} onClick={handleEye2}>
          {eye2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </span>
        {
          errors.repassword?.message &&
          <span className="form_error">
            {errors.repassword?.message}
          </span>
        }
      </div>

      <div className="form_submit">
        <button className="btn btn-success">Đăng kí</button>
      </div>
    </form>
  );
}

export default AuthRegister;