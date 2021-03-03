const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({ // config mail server
  service: 'Gmail',
  auth: {
    user: 'adm.vnrp@gmail.com',
    pass: 'gmail.admin.vn-rp.com'
  }
})

function sendMail(email, verify, type) {
  let html, subject;
  switch (type) {
    case 1: {
      subject = 'Xác minh email đăng kí';
      html = `Mã xác minh của bạn là <b>${verify}</b>, chúc bạn chơi game vui vẻ ❤️!!!`;
      break;
    }
    case 2: {
      subject = "Quên mật khẩu";
      html = `Mã xác minh của bạn là <b>${verify}</b>, chúc bạn chơi game vui vẻ ❤️!!!`;
      break;
    }
    default: break;
  }
  let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Admin VN-RP',
    to: email,
    subject,
    html
  }
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
    // else {
    //   console.log('Message sent: ' + info.response);
    // }
  });
};

module.exports = sendMail;