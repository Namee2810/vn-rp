import AuthPage_bg from "assets/img/AuthPage_bg.png";
import { createNoti } from "components/Notification";
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import AuthForgot from "./AuthForgot";
import AuthForgotChange from "./AuthForgot/AuthForgotChange";
import AuthForgotVerify from "./AuthForgot/AuthForgotVerify";
import AuthLogin from './AuthLogin';
import AuthRegister from "./AuthRegister";
import AuthRegisterVerify from "./AuthRegister/AuthRegisterVerify";
import "./style.scss";

function AuthPage(props) {
  const production = useSelector(state => state.production);
  const [step, setStep] = useState(1);
  //const prevStep = usePrev(step);
  const [email, setEmail] = useState(null);

  //1 = login, 2 = register, 3 = resgister verify, 4 = forgot, 5 = forgot verify
  const handleChangeStep = (currentStep, nextStep) => {
    console.log(currentStep, nextStep);

    const AuthPage_header = document.getElementById("AuthPage_header");
    const AuthPage_form = document.getElementById("AuthPage_form");
    const AuthPage_panel = document.getElementById("AuthPage_panel");
    const AuthPage_panel_header = document.getElementById("AuthPage_panel_header");
    const AuthPage_panel_button = document.getElementById("AuthPage_panel_button");
    const AuthPage_bg = document.getElementById("AuthPage_bg");

    if (currentStep === 1) {
      if (nextStep === 2) {
        AuthPage_panel.classList.toggle("moveLeft");
        AuthPage_form.classList.toggle("moveRight");

        AuthPage_panel_header.style.opacity = 0;
        AuthPage_panel_button.style.opacity = 0;


        setTimeout(() => {
          ReactDOM.render("Đăng kí", AuthPage_header);
          ReactDOM.render("Đã có tài khoản?", AuthPage_panel_header);
          ReactDOM.render("Đăng nhập", AuthPage_panel_button);

          AuthPage_panel_header.style.opacity = 1;
          AuthPage_panel_button.style.opacity = 1;

          AuthPage_bg.classList.toggle("bgMoveLeft");
          setStep(2);
        }, 400);

      }
      if (nextStep === 3) {
        AuthPage_panel.classList.toggle("moveLeft");
        AuthPage_form.classList.toggle("moveRight");

        AuthPage_panel_header.style.opacity = 0;
        AuthPage_panel_button.style.opacity = 0;


        setTimeout(() => {
          ReactDOM.render("Xác minh email", AuthPage_header);
          ReactDOM.render("Đã có tài khoản?", AuthPage_panel_header);
          ReactDOM.render("Đăng nhập", AuthPage_panel_button);

          AuthPage_panel_header.style.opacity = 1;
          AuthPage_panel_button.style.opacity = 1;

          AuthPage_bg.classList.toggle("bgMoveLeft");
          setStep(3);
        }, 400);
      }
      if (nextStep === 4) {
        AuthPage_panel.classList.toggle("moveLeft");
        AuthPage_form.classList.toggle("moveRight");

        AuthPage_panel_header.style.opacity = 0;
        AuthPage_panel_button.style.opacity = 0;

        setTimeout(() => {
          ReactDOM.render("Quên mật khẩu", AuthPage_header);
          ReactDOM.render("Đã có tài khoản?", AuthPage_panel_header);
          ReactDOM.render("Đăng nhập", AuthPage_panel_button);

          AuthPage_panel_header.style.opacity = 1;
          AuthPage_panel_button.style.opacity = 1;

          AuthPage_bg.classList.toggle("bgMoveLeft");
          setStep(4);
        }, 400);
      }
    }
    if (currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 6) {
      if (nextStep === 1) {
        AuthPage_panel.classList.toggle("moveLeft");
        AuthPage_form.classList.toggle("moveRight");

        AuthPage_panel_header.style.opacity = 0;
        AuthPage_panel_button.style.opacity = 0;

        setTimeout(() => {
          ReactDOM.render("Đăng nhập vào VN-RP", AuthPage_header);

          ReactDOM.render("Chưa có tài khoản?", AuthPage_panel_header);
          ReactDOM.render("Đăng kí ngay", AuthPage_panel_button);

          AuthPage_panel_header.style.opacity = 1;
          AuthPage_panel_button.style.opacity = 1;

          AuthPage_bg.classList.toggle("bgMoveLeft");
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
    <div id="AuthPage">

      <div id="AuthPage_form">
        <span id="AuthPage_header">Đăng nhập vào VN-RP</span>
        {
          step === 1 &&
          <div>
            <AuthLogin production={production} handleChangeStep={handleChangeStep} setEmail={setEmail} />
            <span onClick={() => handleChangeStep(1, 4)} id="AuthPage_forgot">Quên mật khẩu</span>
          </div>
        }
        {step === 2 && <AuthRegister production={production} setStep={setStep} setEmail={setEmail} />}
        {step === 3 && <AuthRegisterVerify production={production} email={email} handleChangeStep={handleChangeStep} />}
        {step === 4 && <AuthForgot production={production} setEmail={setEmail} setStep={setStep} />}
        {step === 5 && <AuthForgotVerify production={production} email={email} setStep={setStep} />}
        {step === 6 && <AuthForgotChange production={production} email={email} handleChangeStep={handleChangeStep} />}
      </div>
      <div id="AuthPage_panel">
        <span id="AuthPage_panel_header">Chưa có tài khoản?</span>
        <span><button id="AuthPage_panel_button" className="btn" onClick={handleClickPanelButton}>Đăng kí ngay</button></span>
      </div>
      <img src={AuthPage_bg} id="AuthPage_bg" alt="" />
    </div>
  );
}

export default AuthPage;