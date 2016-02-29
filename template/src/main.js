require('./config/intv.js')
require('./plugin/zepto.touch')
import { configRouter } from './config/router'
import globalMixin from './common/globalMixin'
import go from './common/app.go'
import share from './common/app.share'

const app = Vue.extend(require('./components/app.vue'))
const router = new Router({
    hashbang: false
})

Vue.mixin(globalMixin)
Vue.config.debug = Intv.config.debug

App.go = go
App.store = {}
App.share = share
App.router = router
App.defaultView = 'index'
configRouter(router)

if(/yaotv\.qq\.com/.test(location.host)) {
    Intv.wechat.authorize(()=>{
        router.start(app, '#app')
    })
} else {
    router.start(app, '#app')
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    if (window.orientation === 180 || window.orientation === 0) {  //竖屏状态！
        $(".transverse").hide();
    }
    if (window.orientation === 90 || window.orientation === -90 ){ //横屏状态！
        $(".transverse").show();
    }
}, false);

// inas
window.inas_var = '{{tv}}_{{name}}'

