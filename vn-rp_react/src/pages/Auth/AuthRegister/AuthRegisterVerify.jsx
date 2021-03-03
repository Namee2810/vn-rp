import { BarcodeOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import { createNoti } from "components/Notification";
import rpc from "rage-rpc";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

/*eslint no-useless-escape: "off"*/

const schema = yup.object().shape({
  verify: yup.string()
    .required("Vui lòng nhập mã xác nhận").length(9, "Mã xác minh không hợp lệ !")
});

function AuthRegisterVerify(props) {
  const { handleChangeStep, email } = props;
  const [resendAvailable, setResendAvailable] = useState(true);
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  let disableTimer;

  const onSubmit = data => {
    const { verify } = data;
    const submit_btn = document.getElementById("submit_btn");
    submit_btn.disabled = true;
    rpc.callServer("server:auth.registerVerify", { email, verify }).then(code => {
      submit_btn.disabled = false;
      switch (code) {
        case 1: {
          createNoti("success", "Xác minh thành công, đăng nhập nào 🎉!");
          setTimeout(() => {
            handleChangeStep(3, 1);
          }, 500)
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

  const handleResend = () => {
    if (!resendAvailable) {
      createNoti("warning", "Bạn vừa gửi 1 email, hãy đợi 30 giây !");
      return;
    }
    else {
      rpc.callServer("server:auth.sendMailVerify", email).then(code => {
        switch (code) {
          case 1: {
            createNoti("success", "1 mã xác minh đã được gửi tới email 🎉!");
            break;
          }
          case 2: {
            createNoti("warning", "Không thể gửi email lúc này, thử lại sau 😥!")
            break;
          }
          default: {
            createNoti("error", "Lỗi không xác định, vui lòng thử lại sau 😭!")
            break;
          }
        }
      })
      setResendAvailable(false);
      disableTimer = setTimeout(() => {
        setResendAvailable(true);
      }, 30000);
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(disableTimer);
    }
  }, [disableTimer])

  return (
    <div id="AuthRegisterVerify">
      <span id="Auth_resend" onClick={handleResend}>
        Gửi lại email
      </span>
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

export default AuthRegisterVerify;