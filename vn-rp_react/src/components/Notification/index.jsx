import { notification } from 'antd';
import React from 'react';

let count = 0;
let list = [];
function createNoti(type, message) {
  count++;
  if (list.length > 4) notification.close(list.shift());

  notification[type]({
    key: count,
    message,
    duration: 5,
    onClose: () => {
      list.shift();
    },
  });
  list.push(count);
}

function Notification(props) {
  const test = () => {
    createNoti("error", "Bạn không có quyền sử dụng lệnh này!");
  }
  return (
    <div>
      <button onClick={test}>Test</button>
    </div>
  );
}

export default Notification;
export { createNoti };

