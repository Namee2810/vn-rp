import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import { Popconfirm, Tag } from "antd";
import add_icon from "assets/img/add-icon.png";
import lock_icon from "assets/img/lock-icon.png";
import classNames from "classnames";
import { createNoti } from 'components/Notification';
import fixNumber from 'global/fixNumber';
import formatNumber from 'global/formatNumber';
import mp from 'global/mp';
import rpc from "rage-rpc";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import "./style.scss";

function Characters(props) {
  let history = useHistory();
  const [data, setData] = useState({
    id: null, email: "mail@mail.com", type: 0,
    lastDate: "00:00:00 00/00/0000 (0.0.0.0)", coin: 0,
    slot: [0, -1, -1],
  });
  const [slotData, setSlotData] = useState([0, -1, -1])

  useEffect(() => {
    if (mp) {
      rpc.callServer("server:getPlayerData", "account").then(data => {
        const {
          account,
          slotData
        } = data;
        if (account.lastDate && account.lastIP) {
          const time = new Date(account.lastDate);
          const hour = fixNumber(time.getHours()),
            minute = fixNumber(time.getMinutes()),
            second = fixNumber(time.getSeconds()),
            date = fixNumber(time.getDate()),
            month = fixNumber(time.getMonth() + 1),
            year = time.getFullYear();
          account.lastDate = `${hour}:${minute}:${second} ${date}/${month}/${year} (${account.lastIP})`;
        }
        else account.lastDate = "Chưa ghi nhận";
        setData(account);
        setSlotData(slotData);
      })
    }
  }, []);
  useEffect(() => {
    const card_button = document.querySelectorAll(".Characters_card_button .btn");
    card_button.forEach((item, i) => {
      item.onclick = () => {
        if (slotData[i] === -1) {
          createNoti("error", "Slot này chưa mở khóa");
        }
        else if (slotData[i] === 0) {
          if (mp) rpc.callClient("client:characters.customize");
          history.push({ pathname: "/customize", state: { slot: i } });
        }
        else {
          rpc.callServer("server:characters.select", i);
          rpc.callClient("client:characters.select");
        }
      }
    })
  }, [slotData, history])

  return (
    data && <div id="Characters">
      <div id="Characters_header">
        <div id="Characters_header-left">
          <div>Đăng nhập lần cuối <AccessAlarmIcon className="icon" /></div>
          <div id="Characters_header-left_info">
            {data.lastDate}
          </div>
        </div>

        <div id="Characters_header-right">
          <div id="Characters_header-right_email">{data.email ? data.email : "mail@mail.com"}</div>
          <div>
            <span id="Characters_header-right_type">
              {data.type === 0 && <Tag color="grey" className="tag">Member</Tag>}
              {data.type === 1 && <Tag color="gold" className="tag">Premium</Tag>}
              {data.type === 2 && <Tag color="#ff0000" className="tag">VIP</Tag>}
            </span>
            <span id="Characters_header-right_coin">{data.coin}</span>
          &nbsp;<MonetizationOnIcon className="icon coin" style={{ fontSize: "22px" }} />
          </div>
        </div>
      </div>
      <div className="Characters_cards">
        <div className="Characters_card">
          <div className="Characters_card_header slot1" />
          {slotData[0] < 1 ? <div className="Characters_card_nonCharacter">
            <div className="Characters_card_title">
              Khi tạo mới tài khoản, bạn sẽ nhận slot này miễn phí.
              <br />
              Mọi hành vi hack/cheat đều bị trừng phạt.
              <br />
              Chúc bạn chơi game vui vẻ tại VN-RP, yêu bạn 3k 💖!
            </div>
            <div className="Characters_card_slot">
              Slot miễn phí
            </div>
            <div className="Characters_card_image">
              <img src={add_icon} alt="" />
            </div>
          </div>
            : <div className="Characters_card_character">
              <div>
                <img src={`https://ui-avatars.com/api/?name=${slotData[0].name}&background=random&size=58`} alt="" />
                <div className="Characters_card_name">{slotData[0].name.toUpperCase()}</div>
              </div>
              <div className="Characters_card_field">
                <div>Cấp độ <AccessibilityNewIcon className="icon" /></div>
                <div>{slotData[0].level}</div>
              </div>
              <div className="Characters_card_field">
                <div>Kinh nghiệm <StarHalfIcon className="icon" /></div>
                <div>{slotData[0].exp}</div>
              </div>
              <div className="Characters_card_field">
                <div>Tiền mặt <MonetizationOnIcon className="icon" /></div>
                <div>${formatNumber(slotData[0].cash)}</div>
              </div>
              <div className="Characters_card_field">
                <div>Ngân hàng <AccountBalanceIcon className="icon" /></div>
                <div>${formatNumber(slotData[0].bank)}</div>
              </div>
              <div className="Characters_card_field">
                <div>Nghề nghiệp <WorkOutlineOutlinedIcon className="icon" /></div>
                <div >{slotData[0].job ? slotData[0].job : "-"}</div>
              </div>
              <div className="Characters_card_field">
                <div>Tổ chức/Bang phái <HowToRegOutlinedIcon className="icon" /></div>
                <div >{slotData[0].faction ? slotData[0].faction : "-"}</div>
              </div>
            </div>}
          <div className="Characters_card_button">
            <button className="btn btn-success-outline">
              {slotData[0] < 1 ? "Tạo nhân vật" : "Vào"}
            </button>
          </div>
        </div>
        <div className="Characters_card">
          <div className="Characters_card_header slot2" />
          {slotData[1] < 1 ? <div className="Characters_card_nonCharacter">
            <div className="Characters_card_title">
              Mở khóa ngay sau khi slot miễn phí đạt level 10, nhận 1 khoản tiền khi tạo nhân vật !
           </div>
            <div className="Characters_card_slot">
              {slotData[1] > -1 ? "Slot cao cấp" : <>Slot cao cấp<br />(Chưa mở khóa)</>}
            </div>
            <div className="Characters_card_image">
              <img src={add_icon} alt="" />
            </div>
          </div>
            : <div className="Characters_card_character">
              <div>
                <img src={`https://ui-avatars.com/api/?name=${slotData[1].name}&background=random&size=58`} alt="" />
                <div className="Characters_card_name">{slotData[1].name.toUpperCase()}</div>
              </div>
              <div className="Characters_card_field">
                <div>Cấp độ <AccessibilityNewIcon className="icon" /></div>
                <div>{slotData[1].level}</div>
              </div>
              <div className="Characters_card_field">
                <div>Kinh nghiệm <StarHalfIcon className="icon" /></div>
                <div>{slotData[1].exp}</div>
              </div>
              <div className="Characters_card_field">
                <div>Tiền mặt <MonetizationOnIcon className="icon" /></div>
                <div>${formatNumber(slotData[1].cash)}</div>
              </div>
              <div className="Characters_card_field">
                <div>Ngân hàng <AccountBalanceIcon className="icon" /></div>
                <div>${formatNumber(slotData[1].bank)}</div>
              </div>
              <div className="Characters_card_field">
                <div>Nghề nghiệp <WorkOutlineOutlinedIcon className="icon" /></div>
                <div >{slotData[1].job ? slotData[1].job : "-"}</div>
              </div>
              <div className="Characters_card_field">
                <div>Tổ chức/Bang phái <HowToRegOutlinedIcon className="icon" /></div>
                <div >{slotData[1].faction ? slotData[1].faction : "-"}</div>
              </div>
            </div>}
          <div className="Characters_card_button">
            <button
              className={classNames("btn", { "btn-danger-outline": slotData[1] === -1, "btn-success-outline": slotData[1] > -1 })}
            >
              {slotData[1] < 1 ? "Tạo nhân vật" : "Vào"}
            </button>
          </div>
        </div>
        <div className="Characters_card">
          <div className="Characters_card_header slot3" />
          {slotData[2] < 1 ? <div className="Characters_card_nonCharacter">
            <div className="Characters_card_title">
              <span>Mở khóa với 1000 <MonetizationOnIcon className="icon coin" />, có thể đặt tên với 2 kí tự. Nhận 1 khoản tiền lớn và 1 hộp xe ngẫu nhiên khi tạo nhân vật.  !</span>
            </div>
            <div className="Characters_card_slot">
              {slotData[2] > -1 ? "Slot VIP" : <>Slot VIP<br />(Chưa mở khóa)</>}
            </div>
            <div className="Characters_card_image">
              <img src={lock_icon} alt="" />
            </div>
          </div>
            : <div className="Characters_card_character">
              <div>
                <img src={`https://ui-avatars.com/api/?name=${slotData[2].name}&background=random&size=58`} alt="" />
                <div className="Characters_card_name">{slotData[2].name.toUpperCase()}</div>
              </div>
              <div className="Characters_card_field">
                <div>Cấp độ <AccessibilityNewIcon className="icon" /></div>
                <div>{slotData[2].level}</div>
              </div>
              <div className="Characters_card_field">
                <div>Kinh nghiệm <StarHalfIcon className="icon" /></div>
                <div>{slotData[2].exp}</div>
              </div>
              <div className="Characters_card_field">
                <div>Tiền mặt <MonetizationOnIcon className="icon" /></div>
                <div>${formatNumber(slotData[2].cash)}</div>
              </div>
              <div className="Characters_card_field">
                <div>Ngân hàng <AccountBalanceIcon className="icon" /></div>
                <div>${formatNumber(slotData[2].bank)}</div>
              </div>
              <div className="Characters_card_field">
                <div>Nghề nghiệp <WorkOutlineOutlinedIcon className="icon" /></div>
                <div >{slotData[2].job ? slotData[2].job : "-"}</div>
              </div>
              <div className="Characters_card_field">
                <div>Tổ chức/Bang phái <HowToRegOutlinedIcon className="icon" /></div>
                <div >{slotData[2].faction ? slotData[2].faction : "-"}</div>
              </div>
            </div>}
          <div className="Characters_card_button">
            {
              slotData[2] === -1 ?

                <Popconfirm
                  title="Bạn chắc chắn muốn mua slot VIP?"
                  //onConfirm={confirm}
                  okText="Mua"
                  cancelText="Không"
                >
                  <button className="btn btn-danger-outline">
                    Tạo nhân vật (1000 <MonetizationOnIcon className="icon coin" />)
                  </button>
                </Popconfirm>
                : <button className="btn btn-success-outline">
                  {slotData[2] === 0 && "Tạo nhân vật"}
                  {slotData[2] > 0 && "Vào"}
                </button>
            }

          </div>
        </div>
      </div>
    </div >

  );
}

export default Characters;