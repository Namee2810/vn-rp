import AccessibilityIcon from '@material-ui/icons/Accessibility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FaceIcon from '@material-ui/icons/Face';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Divider, Slider } from 'antd';
import classNames from "classnames";
import { createNoti } from 'components/Notification';
import { colorList, fatherList, motherList } from "global/customize";
import mp from 'global/mp';
import rpc from "rage-rpc";
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import "./style.scss";

const nameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){6,22}[a-zA-Z0-9]$/;

function Customize(props) {
  let history = useHistory();
  const slot = props.location.state.slot;

  const [view, setView] = useState(0);
  const [gender, setGender] = useState(1); //1 = male, 1 = female
  const [parents, setParents] = useState([21, 0]);
  const [ratioGen, setRatioGen] = useState(0.5);
  const [hairColor, setHairColor] = useState([0, 0]);
  const [hairStyle, setHairStyle] = useState(0); //2
  const [leg, setLeg] = useState(0); //4
  const [shoe, setShoe] = useState(0); //6
  const [undershirt, setUndershirt] = useState(15); //11
  const [top, setTop] = useState(0); //11

  const [blemish, setBlemish] = useState(-1);
  const [beard, setBeard] = useState(-1);
  const [eyebrow, setEyebrow] = useState(-1);
  const [ageing, setAgeing] = useState(-1);
  const [makeup, setMakeup] = useState(-1);
  const [blush, setBlush] = useState(-1);
  const [complexion, setComplexion] = useState(-1);
  const [sun, setSun] = useState(-1);
  const [lip, setLip] = useState(-1);
  const [freckle, setFreckle] = useState(-1);

  const handleCreate = () => {
    const name = document.getElementById("name").value;
    if (name.length < 8 || name.length > 24) {
      createNoti("warning", "Tên có độ dài 8-24 kí tự !");
      return;
    }
    else if (!nameRegex.test(name)) {
      createNoti("warning", "Tên phải viết liền, không dấu và có thể chứa (.), (_), (-)!");
      return;
    }

    const headBlend = [parents, ratioGen].join(",");
    const headOverlay = [blemish, beard, eyebrow, ageing, makeup,
      blush, complexion, sun, lip, freckle, -1, -1, -1].join(",");
    const clothes = [-1, -1, hairStyle, 15, leg, -1, shoe, -1, undershirt, -1, -1, top].join(",");
    if (mp) rpc.callServer("server:characters.create", {
      name, gender, headBlend, headOverlay, clothes, hairColor: hairColor.join(","), slot
    }).then((code) => {
      switch (code) {
        case 1: {
          createNoti("success", `Tạo nhân vật ${name} thành công 🎉!`);
          setTimeout(() => {
            rpc.callClient("client:characters.customizeFinish");
            history.goBack();
          }, 500);
          break
        }
        case 2: {
          createNoti("warning", `Tên nhân vật đã được sử dụng 😥!`);
          break;
        }
        case 3: {
          createNoti("error", "Lỗi máy chủ, vui lòng thử lại sau 😭!")
          break;
        }
        default: break;
      }
    });
  }

  const resetCustomize = () => {
    handleChange("parents", { mother: 21, father: 0 })
    handleChange("hairStyle", 0);
    handleChange("hairColor", { color1: 0, color2: 0 });
    handleChange("top", 0);
    handleChange("undershirt", 15);
    handleChange("leg", 0);
    handleChange("shoe", 0);

    handleChange("blemish", -1);
    handleChange("beard", -1);
    handleChange("eyebrow", -1);
    handleChange("ageing", -1);
    handleChange("makeup", -1);
    handleChange("blush", -1);
    handleChange("complexion", -1);
    handleChange("sun", -1);
    handleChange("lip", -1);
    handleChange("freckle", -1);
  }
  const handleChange = (type, value) => {
    switch (type) {
      case "view": {
        if (value !== view) {
          setView(value);
          triggerClient(type, { view: value, gender });
        }
        break
      }
      case "gender": {
        if (gender !== value) {
          resetCustomize();
          setGender(value);
          triggerClient(type, value);
          if (view) triggerClient("view", { view, gender: value });
        }
        break
      }
      case "parents": {
        const { mother, father } = value;
        if (mother !== parents[0] || father !== parents[0]) {
          setParents([mother, father]);
          triggerClient(type, { mother, father, ratioGen });
        }
        break
      }
      case "ratioGen": {
        setRatioGen(value);
        triggerClient("parents", { mother: parents[0], father: parents[1], ratioGen: value });
        break
      }
      case "top": {
        setTop(value);
        triggerClient(type, value);
        break
      }
      case "undershirt": {
        setUndershirt(value);
        triggerClient(type, value);
        break
      }
      case "leg": {
        if ((gender && (value === 11 || value === 44))
          || (!gender && (value === 13 || value === 46))) value = 0;
        setLeg(value);
        triggerClient(type, value);
        break
      }
      case "shoe": {
        if ((gender && value === 13) || (!gender && value === 12)) value = 0;
        setShoe(value);
        triggerClient(type, value);
        break
      }
      case "hairStyle": {
        setHairStyle(value);
        triggerClient(type, value);
        break
      }
      case "hairColor": {
        const { color1, color2 } = value;
        if (color1 !== hairColor[0] || color2 !== hairColor[1]) {
          setHairColor([color1, color2]);
          triggerClient(type, { color1, color2 });
        }
        break;
      }
      case "blemish": {
        setBlemish(value);
        triggerClient(type, value);
        break
      }
      case "beard": {
        setBeard(value);
        triggerClient(type, value);
        break
      }
      case "eyebrow": {
        setEyebrow(value);
        triggerClient(type, value);
        break
      }
      case "ageing": {
        setAgeing(value);
        triggerClient(type, value);
        break
      }
      case "makeup": {
        setMakeup(value);
        triggerClient(type, value);
        break
      }
      case "blush": {
        setBlush(value);
        triggerClient(type, value);
        break
      }
      case "complexion": {
        setComplexion(value);
        triggerClient(type, value);
        break
      }
      case "sun": {
        setSun(value);
        triggerClient(type, value);
        break
      }
      case "lip": {
        setLip(value);
        triggerClient(type, value);
        break
      }
      case "freckle": {
        setFreckle(value);
        triggerClient(type, value);
        break
      }
      default: break
    }
  }
  const triggerClient = (type, value) => {
    if (mp) rpc.callClient("client:characters.customizeHandle", { type, value });
  };

  return (
    <div id="Customize">
      <div className="Customize">
        <div className="Customize_item">
          <Divider>Thông tin nhân vật</Divider>
          <div>
            <div className="Customize_title">Tên nhân vật</div>
            <div className="form_field">
              <FaceIcon />
              <input id="name" name="name" type="text" className="form_input"
              />
            </div>
          </div>
          <div>
            <button className={`Customize_gender btn ${gender ? "btn-success" : "btn-success-outline"}`}
              onClick={() => handleChange("gender", 1)}
            >
              Nam 🧑
            </button>
            <button className={`Customize_gender btn ${!gender ? "btn-success" : "btn-success-outline"}`}
              style={{ marginLeft: "20px" }}
              onClick={() => handleChange("gender", 0)}>
              Nữ 👩‍
            </button>
          </div>
        </div>
        <div className="Customize_item">
          <Divider>Phụ huynh</Divider>
          <div>
            <div className="Customize_title">Bố</div>
            <div className="Customize_images">
              {
                fatherList.map((item, key) => (
                  <div className={classNames("Customize_image", { "Customize_image-select": key === parents[1] })}
                    key={key}
                    onClick={() => handleChange("parents", { mother: parents[0], father: key })}
                  >
                    <img src={item} alt="" />
                    {key === parents[1] && <CheckCircleOutlineIcon className="Customize_icon" />}
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <div className="Customize_title">Mẹ</div>
            <div className="Customize_images">
              {
                motherList.map((item, key) => (
                  <div className={classNames("Customize_image", { "Customize_image-select": key + 21 === parents[0] })}
                    key={key}
                    onClick={() => handleChange("parents", { mother: key + 21, father: parents[1] })}
                  >
                    <img src={item} alt="" />
                    {key + 21 === parents[0] && <CheckCircleOutlineIcon className="Customize_icon" />}
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <div className="Customize_title">Tỉ lệ gen mẹ/bố</div>
            <Slider onChange={value => handleChange("ratioGen", value)} value={ratioGen} max="1" step="0.1" />
          </div>
        </div>
        <div>
          <Divider>Trang phục</Divider>
          <div>
            <div className="Customize_title">Áo ({top})</div>
            <Slider onChange={value => handleChange("top", value)} value={top} max={gender ? 361 : 380} />
          </div>
          <div>
            <div className="Customize_title">Áo lót trong ({undershirt})</div>
            <Slider onChange={value => handleChange("undershirt", value)} value={undershirt} max={gender ? 177 : 215} />
          </div>
          <div>
            <div className="Customize_title">Quần ({leg})</div>
            <Slider onChange={value => handleChange("leg", value)} value={leg} max={gender ? 132 : 139} />
          </div>
          <div>
            <div className="Customize_title">Giày ({shoe})</div>
            <Slider onChange={value => handleChange("shoe", value)} value={shoe} max={gender ? 97 : 101} />
          </div>
        </div>
      </div >
      <div className="Customize">
        <div>
          <Divider>Ngoại hình</Divider>
          <div>
            <div className="Customize_title">Tóc ({hairStyle})</div>
            <Slider onChange={value => handleChange("hairStyle", value)} value={hairStyle} max={gender ? "74" : "78"} />
          </div>
          <div>
            <div className="Customize_title">Màu tóc</div>
            <div className="Customize_colors">
              {
                colorList.map((item, key) => (
                  <div className={classNames("Customize_color", { "Customize_color-select": hairColor[0] === key })}
                    style={{ background: item }}
                    key={key}
                    onClick={() => handleChange("hairColor", { color1: key, color2: hairColor[1] })}
                  />
                ))
              }
            </div>
          </div>
          <div>
            <div className="Customize_title">Màu tóc highlight</div>
            <div className="Customize_colors">
              {
                colorList.map((item, key) => (
                  <div className={classNames("Customize_color", { "Customize_color-select": hairColor[1] === key })}
                    style={{ background: item }}
                    key={key}
                    onClick={() => handleChange("hairColor", { color1: hairColor[0], color2: key })}
                  />
                ))
              }
            </div>
          </div>
          <div>
            <div className="Customize_title">Vết thâm ({blemish})</div>
            <Slider onChange={value => handleChange("blemish", value)} value={blemish} min={-1} max="23" />
          </div>
          <div>
            <div className="Customize_title">Râu ({beard})</div>
            <Slider onChange={value => handleChange("beard", value)} value={beard} min={-1} max="28" />
          </div>
          <div>
            <div className="Customize_title">Lông mày ({eyebrow})</div>
            <Slider onChange={value => handleChange("eyebrow", value)} value={eyebrow} min={-1} max="33" />
          </div>
          <div>
            <div className="Customize_title">Nếp nhăn ({ageing})</div>
            <Slider onChange={value => handleChange("ageing", value)} value={ageing} min={-1} max="14" />
          </div>
          <div>
            <div className="Customize_title">Trang điểm ({makeup})</div>
            <Slider onChange={value => handleChange("makeup", value)} value={makeup} min={-1} max="74" />
          </div>
          <div>
            <div className="Customize_title">Đỏ mặt ({blush})</div>
            <Slider onChange={value => handleChange("blush", value)} value={blush} min={-1} max="32" />
          </div>
          <div>
            <div className="Customize_title">Nước da ({complexion})</div>
            <Slider onChange={value => handleChange("complexion", value)} value={complexion} min={-1} max="11" />
          </div>
          <div>
            <div className="Customize_title">Cháy nắng ({sun})</div>
            <Slider onChange={value => handleChange("sun", value)} value={sun} min={-1} max="10" />
          </div>
          <div>
            <div className="Customize_title">Môi ({lip})</div>
            <Slider onChange={value => handleChange("lip", value)} value={lip} max="9" />
          </div>
          <div>
            <div className="Customize_title">Tàn nhang ({freckle})</div>
            <Slider onChange={value => handleChange("freckle", value)} value={freckle} max="17" />
          </div>
        </div>
      </div>
      <div id="Customize_btn">
        <button className="btn btn-success" onClick={handleCreate}>Tạo</button>
      </div>
      <div id="Customize_view">
        <span style={{ marginRight: "10px" }}>Góc nhìn:</span>
        <AccessibilityIcon
          style={{ marginRight: "5px", transition: "all 0.25s" }}
          className={!view ? "select" : ""}
          onClick={() => handleChange("view", 0)}
        />
        <InsertEmoticonIcon
          style={{ transition: "all 0.25s" }}
          className={view ? "select" : ""}
          onClick={() => handleChange("view", 1)}
        />
      </div>
    </div >
  );
}

export default Customize;