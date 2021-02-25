import { notification } from 'antd';
import React from 'react';

let count = 0;
function createNoti(type, message) {
  count++;
  if (count > 5) {
    notification.destroy();
    count = 1;
  }
  notification[type]({ message });
}

function Notification(props) {
  const test = () => {
    createNoti("error", "OK");
  }
  return (
    <div>
      <button onClick={test}>Test</button>
    </div>
  );
}

export default Notification;
export { createNoti };

