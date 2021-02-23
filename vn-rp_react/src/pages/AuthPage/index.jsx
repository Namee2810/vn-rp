import AuthPage_bg from "assets/img/AuthPage_bg.png";
import song from "assets/song/AuthPage.mp3";
import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import AuthForgot from "./AuthForgot";
import AuthForgotVerify from "./AuthForgot/AuthForgotVerify";
import AuthLogin from './AuthLogin';
import AuthRegister from "./AuthRegister";
import AuthRegisterVerify from "./AuthRegister/AuthRegisterVerify";
import "./style.scss";

function AuthPage(props) {
  const [step, setStep] = useState(1);
  //step: 1 = login, 2 = register,3 = verify email (register), 4 = forgot password, 5 = verify email (forgot)

  const handleSwitchLogin_Register = () => {
    const AuthPage_form = document.getElementById("AuthPage_form");
    const AuthPage_panel = document.getElementById("AuthPage_panel");
    const AuthPage_panel_header = document.getElementById("AuthPage_panel_header");
    const AuthPage_panel_button = document.getElementById("AuthPage_panel_button");
    const AuthPage_bg = document.getElementById("AuthPage_bg");

    if (step === 1) {
      AuthPage_panel.style.transform = "translateX(-540px)";
      AuthPage_form.style.transform = "translateX(360px)";

      AuthPage_panel_header.style.opacity = 0;
      AuthPage_panel_button.style.opacity = 0;

      setTimeout(() => {
        ReactDOM.render("Đăng kí", document.getElementById("AuthPage_header"));
        ReactDOM.render("Đã có tài khoản?", AuthPage_panel_header);
        ReactDOM.render("Đăng nhập", document.getElementById("AuthPage_panel_button"));
        AuthPage_panel_header.style.opacity = 1;
        AuthPage_panel_button.style.opacity = 1;
        AuthPage_bg.style.left = "-230px";
        setStep(2);
      }, 400);
    }
    else if (step === 2 || step === 4) {
      AuthPage_panel.style.transform = "translateX(0)";
      AuthPage_form.style.transform = "translateX(0)";

      AuthPage_panel_header.style.opacity = 0;
      AuthPage_panel_button.style.opacity = 0;

      setTimeout(() => {
        ReactDOM.render("Đăng nhập vào VN-RP", document.getElementById("AuthPage_header"));

        ReactDOM.render("Chưa có tài khoản?", AuthPage_panel_header);
        ReactDOM.render("Đăng kí ngay", document.getElementById("AuthPage_panel_button"));
        AuthPage_panel_header.style.opacity = 1;
        AuthPage_panel_button.style.opacity = 1;

        AuthPage_bg.style.left = "-170px";
        setStep(1);
      }, 400);
    }
  }

  const handleSwitchForgot = () => {
    const AuthPage_form = document.getElementById("AuthPage_form");
    const AuthPage_panel = document.getElementById("AuthPage_panel");
    const AuthPage_panel_header = document.getElementById("AuthPage_panel_header");
    const AuthPage_panel_button = document.getElementById("AuthPage_panel_button");
    const AuthPage_bg = document.getElementById("AuthPage_bg");
    if (step === 1) {
      AuthPage_panel.style.transform = "translateX(-540px)";
      AuthPage_form.style.transform = "translateX(360px)";

      AuthPage_panel_header.style.opacity = 0;
      AuthPage_panel_button.style.opacity = 0;

      setTimeout(() => {
        ReactDOM.render("Quên mật khẩu", document.getElementById("AuthPage_header"));
        ReactDOM.render("Đã có tài khoản?", AuthPage_panel_header);
        ReactDOM.render("Đăng nhập", document.getElementById("AuthPage_panel_button"));
        AuthPage_panel_header.style.opacity = 1;
        AuthPage_panel_button.style.opacity = 1;

        AuthPage_bg.style.left = "-230px";
        setStep(4);
      }, 400);
    }
  }

  useEffect(() => {
    const musicPlay = () => {
      document.getElementById('song').play();
      document.removeEventListener('click', musicPlay);
    }
    document.addEventListener('click', musicPlay);
  }, [])

  return (
    <div id="AuthPage">
      <audio id="song" autoPlay><source src={song} type="audio/mp3" /></audio>

      <div id="AuthPage_form">
        <span id="AuthPage_header">Đăng nhập vào VN-RP</span>
        {
          step === 1 &&
          <div>
            <AuthLogin />
            <span onClick={handleSwitchForgot} id="AuthPage_forgot">Quên mật khẩu</span>
          </div>
        }
        {step === 2 && <AuthRegister />}
        {step === 3 && <AuthRegisterVerify />}
        {step === 4 && <AuthForgot />}
        {step === 5 && <AuthForgotVerify />}

      </div>
      <div id="AuthPage_panel">
        <span id="AuthPage_panel_header" style={{ marginBottom: "20px" }}>Chưa có tài khoản?</span>
        <span><button id="AuthPage_panel_button" className="btn" onClick={handleSwitchLogin_Register}>Đăng kí ngay</button></span>
      </div>
      <img src={AuthPage_bg} id="AuthPage_bg" alt="" style={{ pointerEvents: "none" }} />
    </div>
  );
}

export default AuthPage;