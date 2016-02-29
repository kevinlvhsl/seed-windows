<template lang="jade">
#cp-danmu
    .content
        - var n = -1
        while n++ < 3
            .col(id="#{'col'+n}")
                p(
                    v-if="dm#{n}.show",
                    :class="{me: dm#{n}.isMe}",
                    :style="{transform: 'translateX('+ dm#{n}.translatex+')', transitionDuration: dm#{n}.speed+'ms', opacity: dm#{n}.opacity}"
                )
                    img(:src="dm#{n}.headimgurl")
                    span.name \{{dm#{n}.name}}：
                    span.msg \{{dm#{n}.msg}}
    .foot
        input(
            type="text"
            placeholder="发弹幕增强脑力更有惊喜"
            maxlength="30"
            v-el="input"
            v-model="msg"
            @click="fixScrollTop"
            @keyup.enter="send")
        a.btn-send(@click="send") 发送
</template>
<script>
import Realtime from '../common/Realtime'
import conf from '../config/danmu'
import Localstorage from '../store/localstorage'
let danmu = {}
export default {
    props: ['data'],
    data() {
        return {
            userinfo: App.store.index.member_info,
            dmStatus: [0,0,0,0],
            dmPool: [],
            dmPoolMaxCount: 100,
            msg: '',
            dm0:{},
            dm1:{},
            dm2:{},
            dm3:{},
        }
    },
    methods: {
        fixScrollTop () {
            if(!App.isIos){
                setTimeout(() => {
                    document.body.scrollTop = 0
                },100)
            }
        },
        runTime () {
            setInterval(() => {
                this.queryDmlist()
            },50)
        },
        // 产生弹幕需求
        queryDmlist () {
            $.each(this.dmStatus, (index, v)=> {
                 if(!v) {
                    let data = this.getOneMsg(index)
                    this.showMsg(data, index)
                    return false
                 }
            })
        },
        // 拿一条弹幕数据
        getOneMsg (index) {
            if(this.dmPool.length > 0) {
                let pool = this.dmPool
                let len = pool.length
                let max = this.dmPoolMaxCount
                let firstData = pool.shift()
                this.dmStatus[index] = 1
                // 如果满 删掉后面全部1
                if(len > max) pool.splice(max-1)
                // 不是自己发的第一条放最后
                if(!firstData.isMe) pool.push(firstData)
                return firstData
            }
        },
        addNewToDmPool (data, index=5) {
            if(!data) return
            this.dmPool.splice(index,0,data)
        },
        getDanmuSpeed () {
            return conf.isDanmuSpeed
                ? App.Util.random(4000, 8000)
                : conf.danmuSpeed
        },
        getDanmuOpacity () {
            return conf.isOpacity
                ? App.Util.random(4,10)/10
                : 1
        },
        showMsg (data,index, isMe = false) {
            let obj = {}
            let speed = this.getDanmuSpeed()
            let opacity = this.getDanmuOpacity()
            let offsetX =  '20rem'
            obj = {
                isMe: data.isMe,
                msg: data.msg,
                name: data.name,
                xingbie: data.xingbie,
                headimgurl: data.headimgurl,
                show: true,
                translatex: offsetX,
                speed: speed,
                opacity: opacity
            }
            this['dm' + index] = obj
            setTimeout(() => {
                this.$nextTick(()=>{
                    let width = $('#col'+index).find('p').width() < $('body').width()
                        ?
                            $('body').width()
                        :
                            $('#col'+index).find('p').width()
                    this['dm' + index].translatex = '-'+width+'px'
                })
            },20)
            setTimeout(() => {
                this['dm' + index] = {}
                this.dmStatus[index] = 0
            }, obj.speed)
        },
        send () {
            let msg = this.msg
            if(msg === '' || msg.replace(/(^\s*)|(\s*$)/g, '') === '') {
                App.pop('请输入内容', 1000)
                return
            }
            this.addNewToDmPool({
                isMe: true,
                msg: msg,
                name: '我',
                xingbie: this.userinfo.sex,
                headimgurl: this.userinfo.headimgurl + '/46'
            },1)
            this.msg = ''
            danmu.sendMsg(msg)
        },
        initDanmu () {
            this.dmPool = conf.msgList
            danmu = new Realtime({
                appId: conf.appId,
                appKey: conf.appKey,
                maxUserNum: conf.maxUserNum,
                userinfo: this.userinfo
            })
            danmu.boot(data => {
                // 接收消息 data
                let d = data.msg
                this.addNewToDmPool({
                    isMe: false,
                    headimgurl: d.attr.ava +'/46',
                    name: d.attr.name,
                    xingbie: d.attr.xingbie,
                    msg: d.text
                })
            })
            this.runTime()
        }
    },
    ready () {
        this.initDanmu()
    }
}
</script>
