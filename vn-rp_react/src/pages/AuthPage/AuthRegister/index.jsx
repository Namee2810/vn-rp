import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import { createNoti } from "components/Notification";
import rpc from "rage-rpc";
import React, { useState } from "react";
import ReactDOM from "react-dom";
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

function AuthRegister(props) {
  const { setStep, setEmail } = props;
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  const handleEye1 = () => {
    setEye1(!eye1);
  }
  const handleEye2 = () => {
    setEye2(!eye2);
  }
  const onSubmit = data => {
    const { email, password, repassword } = data;
    if (password !== repassword) {
      createNoti("error", "Mật khẩu nhập lại không khớp")
    }
    else {
      const submit_btn = document.getElementById("submit_btn");
      submit_btn.disabled = true;
      rpc.callServer("server:auth.register", { email, password }).then(code => {
        submit_btn.disabled = false;
        switch (code) {
          case 1: {
            createNoti("success", "1 mã xác minh đã được gửi tới email 🎉!");
            setTimeout(() => {
              const AuthPage_header = document.getElementById("AuthPage_header");
              ReactDOM.render("Xác minh email", AuthPage_header);

              setStep(3);
              setEmail(email);
            }, 500);
            break;
          }
          case 2: {
            createNoti("warning", "Email này đã được sử dụng 😥!")
            break;
          }
          case 3: {
            createNoti("error", "Lỗi máy chủ, vui lòng thử lại sau 😭!")
            break;
          }
          default: {
            createNoti("error", "Lỗi không xác định, vui lòng thử lại sau 😭!")
            break;
          }
        }
      });
    }
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
        <button className="btn btn-success" id="submit_btn">Đăng kí</button>
      </div>
    </form>
  );
}

export default AuthRegister;