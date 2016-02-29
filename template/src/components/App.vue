<style lang="css" src="../sass/main.css"></style>
<template lang="jade">
    #app
        router-view.view
        .copyright
            p 本页面由融云科技制作 &copy;

</template>
<script>
export default {
    data () {
        return {
        }
    },
    methods: {
        orientation () {
            $('body').append('<div class="transverse"><i></i><p>为了更好用户体验请竖屏使用哦~</p></div>')
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
                if (window.orientation === 180 || window.orientation === 0) {  //竖屏状态！
                    $(".transverse").hide();
                }
                if (window.orientation === 90 || window.orientation === -90 ){ //横屏状态！
                    $(".transverse").show();
                }
            }, false)
        }
    },
    ready () {
        this.orientation()
        App.hideLoading()
    }
}
</script>

