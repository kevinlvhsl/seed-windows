/**
 * leancloud实时通信和获取房间实时类
 * 1.通过leancloud获取appid 和 appkey
 * 2.admin.intv.com.cn 生成房间
 *
 * @author zhangzan
 *
 * @必填参数
  let conf = {
      appid: 'xxx',
      appKey: 'xxx',
      maxUserNum: 500, //房间最大人数
      userinfo: {
          intvopenid: 'xxx',
          nickname: 'xx',
          headimgurl: 'http://xxx',
          sex: '0'
      }
  }

 * @demo
    import Realtime from '../common/Realtime'
    let rt = new Realtime({
        appId: conf.appId,
        appKey: conf.appKey,
        maxUserNum: conf.maxUserNum,
        userinfo: conf.userinfo
    })

    danmu.boot(data => {
        // 接收消息 data
        let d = data.msg
        let headimgurl = d.attr.ava +'/46'
        let name = d.attr.name
        let xingbie = d.attr.xingbie
        let msg = d.text
    })
 */
export default class Realtime{

    constructor(options) {
        this.appId = options.appId,
        this.appKey = options.appKey,
        this.maxUserNum = options.maxUserNum,
        this.userinfo = options.userinfo,

        this.lastMsgId = null,
        this.roomId = null,
        this.room = null,
        this.rt = {}
    }

    getRoomId(cb) {

        let _Conversation = AV.Object.extend('_Conversation')
        let query = new AV.Query(_Conversation)

        //获取人数在某个范围内的房，设置where查询条件
        //设置人数大于
        query.greaterThanOrEqualTo('user_count', 0)

        //设置人数小于
        query.lessThanOrEqualTo('user_count', this.maxUserNum)

        //排序
        query.descending('user_count')

        //获取一条记录
        query.first({

            success: function(object) {
                if (!object || !object.id) return false

                cb && cb(object.id)
                query.get(object.id, {
                    success: function(roomObject) {
                        // 用户加入房间后，给用户计数加一
                        roomObject.increment('user_count')
                        roomObject.save()

                    }
                })
            }

        })

    }

    initRt() {

        this.rt = AV.realtime({
            appId: this.appId,
            clientId: this.userinfo.intvopenid,
            encodeHTML: true
        })

    }

    joinRoom(roomId, cb) {

        let rt = this.rt
        let self = this

        rt.on('open', realtimeObject => {
            App.log('服务器连接成功！')

            self.room = rt.room(roomId, function(object) {
                if (object) {
                    self.room = object
                    self.room.join(function() {
                        App.log(self.userinfo.nickname + '加入room: ' + roomId)
                    })

                    self.room.receive(function(data) {
                        self.receiveMsg(data, cb)
                    })
                }
            })


        })

        // 监听服务情况
        rt.on('resue', function() {
            App.pop('服务器正在重连，请耐心等待。。。')
        })

    }

    receiveMsg(data, cb) {
        if (this.lastMsgId == data.id || data.fromPeerId === this.userinfo.intvopenid) return

        this.lastMsgId = data.id
        cb && cb(data)

    }

    sendMsg(msg, cb) {

        if (msg == '') return

        let userinfo = this.userinfo

        this.room.send(
            {
                text: msg,
                attr: {
                    ava: userinfo.headimgurl,
                    name: userinfo.nickname,
                    xingbie: userinfo.sex // 1男 0女
                }
            },
            {type: 'text'},
            data => cb && cb(data)
        )

    }

    init(cb) {

        AV.initialize(this.appId, this.appKey)
        this.initRt()
        this.getRoomId(roomId => {
            this.roomId = roomId
            this.joinRoom(roomId, cb)
        })

    }

    boot(cb) {
        this.init(cb)
    }

}
