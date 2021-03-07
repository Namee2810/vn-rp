import AlarmIcon from '@material-ui/icons/Alarm';
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SpeedIcon from '@material-ui/icons/Speed';
import classNames from "classnames";
import { createNoti } from 'components/Notification';
import fixNumber from 'global/fixNumber';
import formatNumber from 'global/formatNumber';
import mp from 'global/mp';
import rpc from "rage-rpc";
import React, { useEffect, useState } from 'react';
import ShorcutKey from './ShortcutKey';
import "./style.scss";


const vehStateInit = {
  speed: 0,
  lock: 1,
  hp: 0,
  fuel: 0,
  engine: 0
}

function HUD(props) {
  const [time, setTime] = useState();
  const [voice, setVoice] = useState(false);
  const [cash, setCash] = useState(0);
  const [inVeh, setInVeh] = useState(false);
  const [veh, setVeh] = useState({
    speed: 0,
    lock: 1,
    hp: 0,
    fuel: 0,
    engine: 0
  })

  const setTimeNow = () => {
    let now = new Date();
    now = `${fixNumber(now.getDate())}/${fixNumber(now.getMonth() + 1)} ${fixNumber(now.getHours())}:${fixNumber(now.getMinutes())}:${fixNumber(now.getSeconds())}`
    setTime(now);
  }

  useEffect(() => {
    setTimeNow();
    const timeInterval = setInterval(() => {
      setTimeNow();
    }, 1000);

    if (mp) rpc.callServer("server:getPlayerData", "cash").then(data => setCash(data));

    return () => {
      clearInterval(timeInterval);
    }
  }, [])

  if (mp) {
    rpc.register("cef:HUD", data => {
      const { type, value } = data;
      switch (type) {
        case "voice": {
          setVoice(value);
          createNoti(value ? "success" : "warning", value ? "Voice chat: Bật" : "Voice chat: Tắt")
          break
        }
        case "cash": {
          setCash(value);
          break
        }
        case "inVeh": {
          if (!value) {
            const hud_2 = document.getElementById("hud_2");
            hud_2.style.transform = "translateY(50px)";
            setVeh(vehStateInit)
            setTimeout(() => {
              setInVeh(value);
            }, 300);

          }
          else setInVeh(value);
          break
        }
        case "vehSync": {
          setVeh({
            speed: value.speed,
            hp: value.hp,
            engine: value.engine,
            lock: value.lock,
            fuel: 0
          })
          break
        }
        default: break
      }
    })
  }

  return (
    <div id="hud">
      <div id="hud_1">
        <div id="hud_voice" className={classNames({ "hud_voice-on": voice })}>
          {voice ? <MicIcon id="hud_voice-icon" className="icon" />
            : <MicOffIcon id="hud_voice-icon" className="icon" />}
        </div>
        <div id="hud_time"><AlarmIcon id="hud_time-icon" className="icon" /> {time}</div>
        <div id="hud_cash">{formatNumber(cash)} <MonetizationOnIcon id="hud_cash-icon" className="icon" /></div>
      </div>
      <div>

      </div>
      {
        inVeh ?
          <div id="hud_2">
            <div id="hud_vehSpeed">
              <SpeedIcon id="hud_vehSpeed-icon" className={classNames("icon", { "hud_vehSpeed-on": veh.engine })} />
              &nbsp;{veh.speed}KM/H
              </div>
            <div id="hud_vehFuel" >
              <LocalGasStationOutlinedIcon id="hud_vehFuel-icon" />
              {veh.fuel}L
            </div>
            <div id="hud_vehHP">
              <LocalHospitalOutlinedIcon id="hud_vehHP-icon" />&nbsp;
            {veh.hp}%
            </div>
            <div id="hud_vehLock" className={classNames({ "hud_vehLock-on": veh.lock === 1 })}>
              {
                veh.lock > 1 ? <LockOutlinedIcon id="hud_vehLock-icon" className="icon" />
                  : <LockOpenIcon id="hud_vehLock-icon" className="icon" />
              }
            </div>
          </div>
          : ""
      }
      <ShorcutKey />
    </div >
  );
}

export default HUD;