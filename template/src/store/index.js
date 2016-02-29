require('../config/intv.js')

import {isWechat6} from '../common/deviceInfo'
let conf = Intv.config
let appId = conf.authorizeAppid
let debug = conf.debug
let drawId = debug ? conf.drawIdDebug : conf.drawId
let fomrId = debug ? conf.fomrIdDebug : conf.fomrId //表单id
let periodId = debug ? conf.periodIdDebug : conf.periodId  //期数id
let locationId = debug ? conf.locationIdDebug : conf.locationId //位置id
let intv_debuged = debug ? '&appid=' + appId+'&INTV_DEBUG=1' : '&appid=' + appId
console.log("isWechat6:",isWechat6)
const APIS = {
    getFormApi    : '/yao/feature-api-form/form/post-form?id=' +fomrId + intv_debuged,
    getWxUserApi  : '/yao/feature-api-member/self?appid=' + appId,
    getCardApi    : '/yao/feature-api-wxcard/card/draw-lottery-new?period_id=' + periodId +'&location_id='+ locationId + intv_debuged,
    getReceiveApi : '/yao/feature-api-wxcard/log/received-card?datavia=server',
}

export default { 

    //授权，获取微信用户信息
    getSelf(success, error) {
        App.ajax({
            url: APIS.getWxUserApi,
            success: (d)=>{
                console.log(d.data)
                success(d)
            },
            error: error
        })
    },
    postForm(form, success, error){
        App.ajax({
            url: APIS.getFormApi,
            data: {data: JSON.stringify(form)},
            type: 'post',
            success(d) {
                if (d.meta.status === 200) {
                    success(d)
                    console.log("提交成功")
                }else{
                    error(d)
                }
            },
            error(d){
                App.pop()
            }
        })
    },
    addTotalNum(success, error) {
        App.ajax({
            loading: false,
            url: 'http://app.intv.com.cn/yao/feature-api-util/index/incr?key=' + Intv.config.programName,
            success: success,
            error: error
        })
    },
    getTotalNum(success, error) {
        App.ajax({
            loading: false,
            url: 'http://app.intv.com.cn/yao/feature-api-util/index/get?key=' + Intv.config.programName,
            success: success,
            error: error
        })
    },
    //抽奖从卡券平台抽取一张卡券（外链卡券link 或微信卡券）
    getCardInfo (cb){
        App.ajax({
            url: APIS.getCardApi,
            timeout: 12000,
            success: function(json){
//"data": {"timestamp": 1448600180, "signature": "77a8604eab39653a200f4cb724b2edc413117620", "nonce_str": 94768, "card_id": "pz4RYt3CicZ2eqkEDQ6bmuZgIHac", "id": 334, "title": "德运奶粉40元代金券", "statistics_code": "", "img": "", "probability": 0.05, "lottery_type": "wxcard", "link": "http://app.intv.com.cn/yao/feature-api-wxcard/index/redirect?url=", "weight": 0, "wxcard_id": 83, "get_limit": 5, "extend_1": null, "extend_2": null, "brand_name": "哪买儿网", "member_card_log_id": 120902, "appid": "wx616a53b99103dec2", "openid": "ozDqwjkqXdmFkkau7v_thtaRZVec"} }; console.log('--卡券信息',json);
                if(json.meta.status === 200){
                    let prizeInfo ={}
                    var type = (json.data.lottery_type === 'link') ? 'url' : 'weixin';
                    prizeInfo.type = type;
                    prizeInfo.name      = json.data.title;
                    prizeInfo.extra     = json.data.card_id;
                    prizeInfo.signature = json.data.signature;
                    prizeInfo.timestamp = json.data.timestamp;
                    prizeInfo.nonceStr  = json.data.nonce_str;
                    prizeInfo.brandName  = json.data.brand_name;
                    prizeInfo.url = json.data.link;
                    // sellerId                  = json.data.seller_id;
                    // cardLogId                 = json.data.member_card_log_id;
                    console.log("抽到："+prizeInfo.name)
                    cb && cb(prizeInfo);
                }else if(json.meta.status === 400){
                    console.log("啥都没抽到！")
                     cb && cb('');
                }else{
                    console.log(json)
                    App.pop()
                }
            },
            error: function(d){
                console.error(d);
                App.pop()
            }
        });
    },
    //领取卡券记录日志
    receiveCard(cb){
        App.ajax({
            url: APIS.getReceiveApi,
            success: (json)=>{
                if(json.meta.status === 200){
                    console.log("领取成功")
                    console.log('领取记录---',json);
                    cb && cb()
                }
            },
            error: (d)=>{
                console.error(d)
                console.log("领取失败")
            }
        })
    },
    addCard (prizeInfo, cb){   //卡券奖品
       // var prize = postData.data; 
        if(isWechat6){
            wx.addCard({
                cardList: [{
                    cardId: prizeInfo.extra,
                    cardExt : JSON.stringify({
                        "nonce_str": prizeInfo.nonceStr,
                        "timestamp": prizeInfo.timestamp,
                        "signature": prizeInfo.signature
                    })
                }], // 需要添加的卡券列表
                success: function (res) {
                    cb && cb()
                },
                fail: function(res){
                    App.pop()
                },
                complete:function(res){
                    
                }
            });
        }
        else{
            App.pop('对不起，卡券领取仅支持微信6.0以上的用户');
        }
    },

}
