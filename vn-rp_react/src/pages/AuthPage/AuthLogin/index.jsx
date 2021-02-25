import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import { createNoti } from "components/Notification";
import rpc from "rage-rpc";
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

function AuthLogin(props) {
  const { handleChangeStep, setEmail } = props;
  const [eye, setEye] = useState(false);
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  const handleEye = () => {
    setEye(!eye);
  }
  const onSubmit = data => {
    const { email, password } = data;
    const submit_btn = document.getElementById("submit_btn");
    submit_btn.disabled = true;
    rpc.callServer("server:auth.login", { email, password }).then(code => {
      submit_btn.disabled = false;
      switch (code) {
        case 1: {
          createNoti("success", "Đăng nhập thành công 🎉!");
          break;
        }
        case 2: {
          createNoti("warning", "Tài khoản hoặc mật khẩu không chính xác 😥!")
          break;
        }
        case 3: {
          createNoti("error", "Tài khoản chưa xác minh !");
          setEmail(email);
          handleChangeStep(1, 3);
          break;
        }
        case 4: {
          createNoti("error", "Lỗi máy chủ, vui lòng thử lại sau 😭!")
          break;
        }
        default: {
          createNoti("error", "Lỗi không xác định, vui lòng thử lại sau 😭!")
          break;
        }
      }
    });
  };

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
        <button className="btn btn-success" id="submit_btn">Đăng nhập</button>
      </div>
    </form>
  );
}

export default AuthLogin;