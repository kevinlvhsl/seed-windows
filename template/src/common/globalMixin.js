/*
 * 全局Mixin
 */
export default {
    computed: {
        __normalPhone__ () {
             // meizhu mx4  $('#app').width() = 384  $('#app').height() = 519  384/519 = .73
            // meizu mx4 16/9 1.35
            // 16/9 1.77
            let appWidth = $(window).width()
            let appHeight = $(window).height()
            let normalRatio = 504 / 320
            let ratio = appHeight / appWidth

            return (ratio >= normalRatio) && (appHeight >= 504)

        }
    },
    methods: {
        __preventDefault__(e) {
            e.preventDefault()
        }
    },
    ready() {
        if (this.noTouchmove && this.__normalPhone__ ) {
            document.addEventListener('touchmove', this.__preventDefault__, false)
        }
    },
    beforeDestroy() {
        if (this.noTouchmove && this.__normalPhone__) {
            document.removeEventListener('touchmove', this.__preventDefault__, false)
        }
    }
}
