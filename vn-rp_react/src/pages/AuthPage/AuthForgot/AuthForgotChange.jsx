import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import { createNoti } from "components/Notification";
import rpc from "rage-rpc";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

/*eslint no-useless-escape: "off"*/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const schema = yup.object().shape({
  password: yup.string()
    .required("Vui lòng nhập mật khẩu")
    .matches(passwordRegex, "Mật khẩu cần ít nhất 8 kí tự, 1 chữ hoa và 1 chữ thường"),
  repassword: yup.string()
    .required("Vui lòng nhập mật khẩu")
    .matches(passwordRegex, "Mật khẩu cần ít nhất 8 kí tự, 1 chữ hoa và 1 chữ thường"),
});

function AuthForgotChange(props) {
  const { handleChangeStep, email } = props;
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
    const { password, repassword } = data;
    if (password !== repassword) {
      createNoti("error", "Mật khẩu nhập lại không khớp")
    }
    else {
      const submit_btn = document.getElementById("submit_btn");
      submit_btn.disabled = true;
      rpc.callServer("server:auth.forgotChange", { email, password }).then(code => {
        submit_btn.disabled = false;
        switch (code) {
          case 1: {
            createNoti("success", "Đổi mật khẩu thành công, đăng nhập nào 🎉!");
            setTimeout(() => {
              handleChangeStep(6, 1);
            }, 500)
            break;
          }
          case 2: {
            createNoti("error", "Lỗi máy chủ, vui lòng thử lại sau 😭!");
            break;
          }
          default: {
            createNoti("error", "Lỗi không xác định, vui lòng thử lại sau 😭!");
            break;
          }
        }
      });
    }
  };

  return (
    <div id="AuthForgotChange">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
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
          <button className="btn btn-success" id="submit_btn">Xác nhận</button>
        </div>
      </form>
    </div>
  );
}

export default AuthForgotChange;