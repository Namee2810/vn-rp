import Auth_bg from "assets/img/Auth_bg.png";
import { createNoti } from "components/Notification";
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import AuthForgot from "./AuthForgot";
import AuthForgotChange from "./AuthForgot/AuthForgotChange";
import AuthForgotVerify from "./AuthForgot/AuthForgotVerify";
import AuthLogin from './AuthLogin';
import AuthRegister from "./AuthRegister";
import AuthRegisterVerify from "./AuthRegister/AuthRegisterVerify";
import "./style.scss";

function Auth(props) {
  //const production = useSelector(state => state.production);
  const [step, setStep] = useState(1);
  //const prevStep = usePrev(step);
  const [email, setEmail] = useState(null);

  //1 = login, 2 = register, 3 = resgister verify, 4 = forgot, 5 = forgot verify
  const handleChangeStep = (currentStep, nextStep) => {
    console.log(currentStep, nextStep);

    const Auth_header = document.getElementById("Auth_header");
    const Auth_form = document.getElementById("Auth_form");
    const Auth_panel = document.getElementById("Auth_panel");
    const Auth_panel_header = document.getElementById("Auth_panel_header");
    const Auth_panel_button = document.getElementById("Auth_panel_button");
    const Auth_bg = document.getElementById("Auth_bg");

    if (currentStep === 1) {
      if (nextStep === 2) {
        Auth_panel.classList.toggle("moveLeft");
        Auth_form.classList.toggle("moveRight");

        Auth_panel_header.style.opacity = 0;
        Auth_panel_button.style.opacity = 0;


        setTimeout(() => {
          ReactDOM.render("Đăng kí", Auth_header);
          ReactDOM.render("Đã có tài khoản?", Auth_panel_header);
          ReactDOM.render("Đăng nhập", Auth_panel_button);

          Auth_panel_header.style.opacity = 1;
          Auth_panel_button.style.opacity = 1;

          Auth_bg.classList.toggle("bgMoveLeft");
          setStep(2);
        }, 400);

      }
      if (nextStep === 3) {
        Auth_panel.classList.toggle("moveLeft");
        Auth_form.classList.toggle("moveRight");

        Auth_panel_header.style.opacity = 0;
        Auth_panel_button.style.opacity = 0;


        setTimeout(() => {
          ReactDOM.render("Xác minh email", Auth_header);
          ReactDOM.render("Đã có tài khoản?", Auth_panel_header);
          ReactDOM.render("Đăng nhập", Auth_panel_button);

          Auth_panel_header.style.opacity = 1;
          Auth_panel_button.style.opacity = 1;

          Auth_bg.classList.toggle("bgMoveLeft");
          setStep(3);
        }, 400);
      }
      if (nextStep === 4) {
        Auth_panel.classList.toggle("moveLeft");
        Auth_form.classList.toggle("moveRight");

        Auth_panel_header.style.opacity = 0;
        Auth_panel_button.style.opacity = 0;

        setTimeout(() => {
          ReactDOM.render("Quên mật khẩu", Auth_header);
          ReactDOM.render("Đã có tài khoản?", Auth_panel_header);
          ReactDOM.render("Đăng nhập", Auth_panel_button);

          Auth_panel_header.style.opacity = 1;
          Auth_panel_button.style.opacity = 1;

          Auth_bg.classList.toggle("bgMoveLeft");
          setStep(4);
        }, 400);
      }
    }
    if (currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 6) {
      if (nextStep === 1) {
        Auth_panel.classList.toggle("moveLeft");
        Auth_form.classList.toggle("moveRight");

        Auth_panel_header.style.opacity = 0;
        Auth_panel_button.style.opacity = 0;

        setTimeout(() => {
          ReactDOM.render("Đăng nhập vào VN-RP", Auth_header);

          ReactDOM.render("Chưa có tài khoản?", Auth_panel_header);
          ReactDOM.render("Đăng kí ngay", Auth_panel_button);

          Auth_panel_header.style.opacity = 1;
          Auth_panel_button.style.opacity = 1;

          Auth_bg.classList.toggle("bgMoveLeft");
          setStep(1);
        }, 400);
      }
    }
  }

  const handleClickPanelButton = () => {
    switch (step) {
      case 1: {
        handleChangeStep(1, 2);
        break;
      }
      case 2: {
        handleChangeStep(2, 1)
        break;
      }
      case 3: {
        createNoti("warning", "Bạn đang trong quá trình đăng kí !")
        break;
      }
      case 4: {
        handleChangeStep(4, 1);
        break;
      }
      case 5: case 6: {
        createNoti("warning", "Bạn đang trong quá trình khôi phục mật khẩu !")
        break;
      }
      default: break;
    }
  }

  return (
    <div id="Auth">

      <div id="Auth_form">
        <span id="Auth_header">Đăng nhập vào VN-RP</span>
        {
          step === 1 &&
          <div>
            <AuthLogin handleChangeStep={handleChangeStep} setEmail={setEmail} />
            <span onClick={() => handleChangeStep(1, 4)} id="Auth_forgot">Quên mật khẩu</span>
          </div>
        }
        {step === 2 && <AuthRegister setStep={setStep} setEmail={setEmail} />}
        {step === 3 && <AuthRegisterVerify email={email} handleChangeStep={handleChangeStep} />}
        {step === 4 && <AuthForgot setEmail={setEmail} setStep={setStep} />}
        {step === 5 && <AuthForgotVerify email={email} setStep={setStep} />}
        {step === 6 && <AuthForgotChange email={email} handleChangeStep={handleChangeStep} />}
      </div>
      <div id="Auth_panel">
        <span id="Auth_panel_header">Chưa có tài khoản?</span>
        <span><button id="Auth_panel_button" className="btn" onClick={handleClickPanelButton}>Đăng kí ngay</button></span>
      </div>
      <img src={Auth_bg} id="Auth_bg" alt="" />
    </div>
  );
}

export default Auth;