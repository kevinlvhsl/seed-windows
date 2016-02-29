/*
 * 页面通过完整跳转
 * @param {string} hash
 * @param {string} hash
 * @param {string} Intv.config.appUrl demo = 'http://s1.intv.com.cn/yao/hzsh/jmd/index.html#/'
 * @param {string} Intv.config.wxUrl demo = 'https://yaotv.qq.com/shake_tv/auto2/2015/12/8uxlqnii6vb0fc/hzsh/jmd/index.html#/'
 */
export default (hash, gotype='app') => {
    let conf = Intv.config
    let url = ''

    if(conf.debug) {
        url = location.href.split('#')[0] + '#/'
    } else {

        if(gotype === 'app') {
            url = conf.appUrl
        } else {
            url = conf.wxUrl
        }

    }

    location.href = url + hash

}
