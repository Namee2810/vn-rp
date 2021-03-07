import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import WifiIcon from '@material-ui/icons/Wifi';
import bank_icon from "assets/img/phone/bank-icon.PNG";
import message_icon from "assets/img/phone/message-icon.png";
import phone_icon from "assets/img/phone/phone-icon.png";
import fixNumber from 'global/fixNumber';
import React, { useEffect, useState } from 'react';
import { BsBatteryFull } from 'react-icons/bs';
import "./style.scss";

function Phone(props) {
  const [time, setTime] = useState(0);

  const setTimeNow = () => {
    let now = new Date();
    now = `${fixNumber(now.getHours())}:${fixNumber(now.getMinutes())}`
    setTime(now);
  }
  useEffect(() => {
    setTimeNow();
    const timeInterval = setInterval(() => setTimeNow(), 60000)
    return () => clearInterval(timeInterval);
  })
  return (
    <div className="Phone">
      <div className="Phone_header">
        <div className="Phone_time">{time}</div>
        <div className="Phone_bunnyEar" />
        <div className="Phone_bar">
          <SignalCellularAltIcon className="Phone_bar-icon" />
          <WifiIcon className="Phone_bar-icon" />
          <BsBatteryFull className="Phone_bar-icon" />
        </div>
      </div>
      <div className="Phone_body">
        <div className="Phone_app">
          <img src={bank_icon} alt="" className="Phone_app-icon" />
          <div className="Phone_app-title">Ngân hàng</div>
        </div>
      </div>
      <div className="Phone_footer">
        <div className="Phone_footer_apps">
          <div></div>
          <div className="Phone_app">
            <img src={phone_icon} alt="" className="Phone_app-icon" />
          </div>
          <div className="Phone_app">
            <img src={message_icon} alt="" className="Phone_app-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phone;