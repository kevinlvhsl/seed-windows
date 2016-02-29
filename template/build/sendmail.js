// 发送邮件脚本
var mailer = require('nodemailer');
var fs = require('fs');
var attachmentName = process.argv[2];

var config = JSON.parse(fs.readFileSync('./build/mailConf.json', 'utf8'));
var transporter = mailer.createTransport({
    secure: true,
    port: 465,
    host: 'smtp.exmail.qq.com',
    auth: {
        user: config.user.email,
        pass: config.user.password
    }
});
var options = {
    from: config.user.email,
    to: config.to.join(','),
    subject: config.subject + getDate(),
    text: config.text  + getDate(),
    html: config.html  + '<h3>' + new Date() + '</h3>',
    attachments: [
        {
            filename: attachmentName,
            path: './' + attachmentName
        }
    ]
};
transporter.sendMail(
    options,
    function(err, info) {
        if(err) {
            return console.log(err);
        }
        console.log('素材包页面已发送成功，请查收!');
    }
);

function getDate() {
    var d = new Date()

    return '' + d.getFullYear() + (d.getMonth() + 1) + d.getDate() + d.getHours() + d.getMinutes()
}
