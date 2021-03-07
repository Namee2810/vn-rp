import { Tag } from "antd";
import classNames from "classnames";
import mp from "global/mp";
import rpc from "rage-rpc";
import React, { useEffect, useState } from 'react';
import "./style.scss";

function PlayerList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (mp) rpc.callServer("server:playerList.get").then(res => setList(res));
  }, []);

  return (
    <div className="playerList">
      <div className="playerList_number">Số người chơi: {list.length}/1000</div>
      <div className="playerList_header">
        <div>ID</div>
        <div>Tên</div>
        <div>Tổ chức/Bang phái</div>
        <div>Cấp độ</div>
        <div>Ping</div>
      </div>
      <div className="playerList_body">
        {
          list.map((item, key) => (
            <div
              className={classNames("playerList_item", { "playerList_item-highlight": key % 2 })}
              key={key}
            >
              <div>{item.id}</div>
              <div>
                {item.name}&nbsp;
                  {item.type === 1 && <Tag color="gold" className="tag">Premium</Tag>}
                {item.type === 2 && <Tag color="#ff0000" className="tag">VIP</Tag>}
              </div>
              <div>
                {
                  item.faction ? <span style={{ color: `#${item.faction.color}` }}>{item.faction.name}</span> : "-"
                }
              </div>
              <div>{item.level}</div>
              <div>{item.ping}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default PlayerList;