/*
 * 所有组建通过mixin 添加
 */

import Danmu from '../components/danmu.vue'
import Copyright from '../components/copyright.vue'


export let CopyrightMixin = {
    components: {
        Copyright
    }
}

export let DanmuMixin = {
    components: {
        Danmu
    },
}
