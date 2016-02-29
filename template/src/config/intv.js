const cdnPath = '//cdnstatic1.myintv.com.cn/yao/{{tv}}/{{name}}'
const isLocal = /192.168|localhost/.test(location.host)

Intv.config = {
    debug: !App.isProd,
    // cdnPath
    cdnPath: isLocal ? '' : cdnPath,
    // Appurl
    appUrl: 'http://s1.intv.com.cn/yao/{{tv}}/{{name}}/index.html#/',
    // 电视台ID
    tvId: 10050,
    // 电视台url
    tvUrl: 'https://app.intv.com.cn/yao',
    // 节目名称
    programName: '{{tv}}{{name}}',
    // 预约ID
    reserveId: '203123',
    //节目播出时间
    reserveDate: "20160122",
    // 一键关注Id
    subscribeAppid: 'wx18ed430f2bfc0b17',
    // 江苏卫视
    // subscribeAppid: 'wxca9de9df38b0951e',
    // 一键关注bar的颜色类型，1灰色，2白色。默认是灰色。
    subscribeType: 1,
    // 授权Id
    authorizeAppid: 'wx616a53b99103dec2',
    // 分享
    share: {
        logo:  "http://cdnstatic1.myintv.com.cn/yao/{{tv}}/{{name}}/src/images/share-logo.jpg",
        title: "分享标题 ",
        description: "分享描述",
        link: location.href.split('#')[0]
    },


}

