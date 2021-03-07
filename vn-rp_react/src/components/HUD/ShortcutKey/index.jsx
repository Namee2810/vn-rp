import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { useState } from 'react';
import "./style.scss";

const shorcutsKeyList = [
  { des: "Động cơ", key: "N" },
  { des: "Khóa/mở xe", key: "L" },
  { des: "Con trỏ chuột", key: "ALT" },
  { des: "Voice chat", key: "4" },
  { des: "Điện thoại", key: <ArrowUpwardIcon style={{ fontSize: "18px" }} /> },
  { des: "Bảng điều khiển", key: "F2" },
  { des: "Người chơi online", key: "Z" }
]

function ShorcutKey(props) {
  const [hudShorcutsOpen, setHudShorcutsOpen] = useState(1);
  const handleOpenHudShorcuts = () => {
    const hud_shortcuts = document.getElementById("hud_shortcuts");
    const hud_shortcuts_open = document.getElementById("hud_shortcuts_open");
    if (hudShorcutsOpen) {
      hud_shortcuts.classList.add("hud_shortcuts-close")
      hud_shortcuts_open.style.transform = "rotate(180deg)";
    }
    else {
      hud_shortcuts.classList.remove("hud_shortcuts-close")
      hud_shortcuts_open.style.transform = "rotate(0deg)";
    }
    setHudShorcutsOpen(!hudShorcutsOpen);
  }
  return (
    <div>
      <div id="hud_shortcuts" className="hud_shortcuts">
        {
          shorcutsKeyList.map((item, key) => (
            <div className="hud_shortcut" key={key}>
              <div className="hud_shortcut_des">{item.des}</div>
              <div className="hud_shortcut_key">{item.key}</div>
            </div>
          ))
        }
      </div>
      <div id="hud_shortcuts_open" onClick={handleOpenHudShorcuts}><ChevronRightIcon id="hud_shortcuts_open-icon" /></div>
    </div>
  );
}

export default ShorcutKey;