import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

/*eslint no-useless-escape: "off"*/
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const schema = yup.object().shape({
  email: yup.string()
    .required("Vui lòng nhập email")
    .matches(emailRegex, "Email không hợp lệ"),
  password: yup.string()
    .required("Vui lòng nhập mật khẩu"),
});

function AuthLogin() {
  const [eye, setEye] = useState(false);
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  const handleEye = () => {
    setEye(!eye);
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
        <input name="password" type={eye ? "text" : "password"} className="form_input form_input_password"
          placeholder="Mật khẩu"
          ref={register()}
        />
        <span style={{ cursor: "pointer" }} onClick={handleEye}>
          {eye ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </span>
        {
          errors.password?.message &&
          <span className="form_error">
            {errors.password?.message}
          </span>
        }
      </div>

      <div className="form_submit">
        <button className="btn btn-success">Đăng nhập</button>
      </div>
    </form>
  );
}

export default AuthLogin;