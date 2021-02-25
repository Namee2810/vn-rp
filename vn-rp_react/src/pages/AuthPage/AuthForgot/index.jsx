import { MailOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import { createNoti } from "components/Notification";
import rpc from "rage-rpc";
import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

/*eslint no-useless-escape: "off"*/
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup.object().shape({
  email: yup.string()
    .required("Vui lòng nhập email")
    .matches(emailRegex, "Email không hợp lệ")
});

function AuthForgot(props) {
  const { setEmail, setStep } = props;
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    const { email } = data;
    const submit_btn = document.getElementById("submit_btn");
    submit_btn.disabled = true;
    rpc.callServer("server:auth.forgot", email).then(code => {
      submit_btn.disabled = false;
      switch (code) {
        case 1: {
          createNoti("success", "1 mã xác minh đã được gửi tới email 🎉!");
          setTimeout(() => {
            const AuthPage_header = document.getElementById("AuthPage_header");
            ReactDOM.render("Xác minh email (Quên mật khẩu)", AuthPage_header);

            setStep(5);
            setEmail(email);
          }, 500);
          break;
        }
        case 2: {
          createNoti("warning", "Email này chưa đăng kí 😥!")
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
    })
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

      <div className="form_submit">
        <button className="btn btn-success" id="submit_btn">Xác nhận</button>
      </div>
    </form>
  );
}

export default AuthForgot;