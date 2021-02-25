import { BarcodeOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import { createNoti } from "components/Notification";
import rpc from "rage-rpc";
import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

/*eslint no-useless-escape: "off"*/

const schema = yup.object().shape({
  verify: yup.string()
    .required("Vui lòng nhập mã xác nhận").length(9, "Mã xác minh không hợp lệ !")
});

function AuthForgotVerify(props) {
  const { email, setStep } = props;
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    const { verify } = data;
    const submit_btn = document.getElementById("submit_btn");
    submit_btn.disabled = true;
    rpc.callServer("server:auth.forgotVerify", { email, verify }).then(code => {
      submit_btn.disabled = false;
      switch (code) {
        case 1: {
          createNoti("success", "Xác minh thành công, hãy đổi mật khẩu 🎉!");
          setTimeout(() => {
            const AuthPage_header = document.getElementById("AuthPage_header");
            ReactDOM.render("Đổi mật khẩu", AuthPage_header);

            setStep(6);
          }, 500);
          break;
        }
        case 2: {
          createNoti("warning", "Mã xác minh không chính xác 😥!")
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
    <div id="AuthForgotVerify">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form_field">
          <span><BarcodeOutlined /></span>
          <input name="verify" type="text" className="form_input"
            placeholder="Mã xác nhận"
            ref={register()}
          />
          {
            errors.verify?.message &&
            <span className="form_error">
              {errors.verify?.message}
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

export default AuthForgotVerify;