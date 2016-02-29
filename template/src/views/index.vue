<template lang="jade">
#cp-index
    a.btn-enter 进入互动
copyright
</template>

<script>
import { CopyrightMixin } from '../common/mixin'
export default {
    mixins: [CopyrightMixin],
    data () {
        return {
            noTouchmove: true
        }
    },
    methods: {
        enter () {
           App.go('interact', 'app')
        },
        bindEvents () {
            $('.btn-enter').tap(()=>{
                this.enter()
            })

        }
    },
    created () {
        $('#app').addClass('fix-subscribe')
        Intv.wechat.subscribe(() => {
              //关注成功
            $('#app').removeClass('fix-subscribe')
        })
    },
    ready () {
        this.$nextTick(() => {
            this.bindEvents()
        })
        App.share()
    }

}
</script>
