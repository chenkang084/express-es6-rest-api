var mailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var config = {
  host: "smtp.163.com",
  port: 25,
  auth: {
    user: "chenkang084@163.com",
    pass: "084chenkang,"
  },
  ignoreTLS: true
};
var transporter = mailer.createTransport(smtpTransport(config));

var data = {
  from: "chenkang084@163.com",
  to: "305058704@qq.com",
  subject: "test",
  html: "hello ,this is test eamil."
};

transporter.sendMail(data, function(err) {
  if (err) {
    // 写为日志
    console.log("send email error!");
  }
  console.log("send email successfully!");
});
