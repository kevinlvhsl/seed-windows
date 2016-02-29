export default {
    appId          : 'SRpsuSSqFN9jeiflBg0c7yos-gzGzoHsz',//聊天室id
    appKey         : 'MiGbg3H2Ys5uQNKRKSMerCCp',//聊天室key
    maxUserNum     : 2000, //房间最大人数
    danmuSpeed     : 8000,//弹幕的速度,单位毫秒
    appearSpeed    : 1000,//控制弹幕出现的频率(默认每秒接受一次弹幕，每次出现的弹幕的数量是maxDanmuNum)
    isDanmu        : true,//是否使用配置好的弹幕池，默认使用（会默认设置50条弹幕，进入房间后会被用户的前50条信息替换掉）
    isColor        : true,//弹幕是否是多种颜色，默认是
    isFontSize     : true,//弹幕是否随机字体大小
    isOpacity      : true,//弹幕是否随机增加透明度
    isDanmuSpeed   : true,//弹幕是否随机改变速度（默认关闭）
    msgList        : [
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/1.png', xingbie: 1, name: '巴黎°parispga', msg:'小四好帅啊'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/2.png', xingbie: 1, name: '恋单ˇ', msg:'局座你好！'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/3.png', xingbie: 0, name: '忧伤的心。。。。。', msg:'蒋老师还是一样的风度。'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/4.png', xingbie: 0, name: '怎么舍得', msg:'看的我都不敢呼吸'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/5.png', xingbie: 0, name: 'skender', msg:'我猜对了哈哈哈哈！'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/6.png', xingbie: 0, name: '疯止轴ar', msg:'我原以为我的记忆力够可以了，没想到啊'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/7.png', xingbie: 0, name: '花开终有谢', msg:'红包，好'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/8.png', xingbie: 1, name: '下个路口见', msg:'嘿，好热闹啊'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/9.png', xingbie: 1, name: '其实、我不坏。', msg:'好看好看好看。'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/10.png', xingbie: 1, name: '默默守护着?你》娇', msg:'我想去现场，求节目组看到我'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/11.png', xingbie: 1, name: ' H xy。', msg:'我也想报名参加'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/12.png', xingbie: 1, name: '如今似梦、曾经是梦', msg:'Dr.魏有意思！'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/13.png', xingbie: 1, name: '荆蛾秀', msg:'陶子姐还是那么可爱'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/14.png', xingbie: 1, name: 'My young', msg:'嘉宾阵容也太豪华了吧'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/15.png', xingbie: 1, name: '提拉米苏式想念╮', msg:'真是叹为观止'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/16.png', xingbie: 0, name: '蝴蝶飞舞', msg:'节目不错，好看。'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/17.png', xingbie: 1, name: '浜叉儏', msg:'这样都可以？！简直是超人！'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/18.png', xingbie: 1, name: '最后一片树叶', msg:'好羡慕这样的脑子，能帮我来考试么'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/19.png', xingbie: 1, name: '花为悦己者开', msg:'看完之后，感觉自己智商得到显著提高'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/20.png', xingbie: 1, name: '无奈各有角色范围', msg:'这智商，服了，我受到了999999点伤害！'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/21.png', xingbie: 1, name: '??何大欠蹬er', msg:'导演多给美女一些镜头啊'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/22.png', xingbie: 1, name: '心素如简', msg:'奖品不少啊'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/23.png', xingbie: 1, name: '刘玲', msg:'这个东西好玩，还可以摇。'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/24.png', xingbie: 0, name: '花心晴', msg:'这选手智商高，长的还不错，真不错'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/25.png', xingbie: 0, name: '爱转角', msg:'奖励已领好，缺一个女友一起去旅行，有意者mmmm哈哈'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/26.png', xingbie: 0, name: '小猪爱土豆', msg:'每一个项目都觉得是不可能完成的，他们太牛了。'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/27.png', xingbie: 0, name: '无爱无痛', msg:'带孩子看这个节目不错。'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/28.png', xingbie: 0, name: '小阳光78~-.?', msg:'还能聊天啊'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/29.png', xingbie: 0, name: '傻傻爱', msg:'求涨智商'},
        {headimgurl: Intv.config.cdnPath+'/src/images/headimg/30.png', xingbie: 0, name: '花雨', msg:'期待后续'}
    ],//存放五十条静态数据,弹幕池大小可以修改。
    colorList      : [
        '#CA161D','#35ABDA','#E451A6','#3FCAF9','#F8C731',
        '#EDEC96','#F7973D','#50EFEE','#8AE461','#C6735F'
    ]//存放随机颜色数组
}
