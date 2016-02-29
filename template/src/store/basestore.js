const _getExpireAt = Symbol('getExpireAt')
const _checkExpire = Symbol('checkExpire')

export default class Basestore {

    // BaseStore 构造函数
    // param:host->localStorage|seesionStorage
    // param:key->string         存储条目键值
    // param:lifttime->string    生命周期(D:天, H:小时，M:分钟）例如2天：2D
    constructor(host, key, lifetime) {
        this.host = host
        this.key = key
        this.lifetime = lifetime

        if (!Intv.config.programName) {
            console.error('Please setting the programName in the intv.js file for the prefix of the localstorage / sessionstorage key')
        }

        this.key = Intv.config.programName + '_' + this.key

        if (/(\d+)(D|H|M)/.test(lifetime)) {

            this._time_ = +RegExp.$1
            this._unit_ = RegExp.$2

        } else {

            // 默认1D
            this._time_ = 1
            this._unit_ = 'D'

            console.log('lifetime 配置不正确')

        }

    }

    get() {
        let item = null

        try {
            item = JSON.parse(this.host.getItem(this.key))
        } catch (e) {}

        if (!item) {
            // 如果没有取到任何数据，则直接返回空
            return null
        } else if (this[_checkExpire](item)) {
            // 如果没有过期，则正常返回数据
            return item.data
        } else {
            // 有数据，但是过期，直接移除
            this.remove()
        }
    }

    set(data) {
        let item = {
            expire_at: this[_getExpireAt](),
            data: data
        }

        this.host.setItem(this.key, JSON.stringify(item))
    }

    remove() {
        this.host.removeItem(this.key)
    }

    setAttr(key, val) {
        let data = this.get() || {}

        data[key] = val
        this.set(data)
    }

    getAttr(key) {
        let data = this.get()

        if (data) {
            return data[key]
        }

        return null
    }

    [_checkExpire](item) {
        let expire_at = new Date(item.expire_at),
            now = new Date()

        return expire_at != 'Invalid Date' && expire_at > now
    }

    [_getExpireAt]() {
        let time = this._time_,
            unit = this._unit_,
            now = new Date(),

            // 过期时间点
            expire_at = now,
            paddingLeft = function(num) {
                return num < 10 ? ('0' + num) : num
            }

        switch (unit) {
            case 'D':
                expire_at.setDate(now.getDate() + time)
                break
            case 'H':
                expire_at.setHours(now.getHours() + time)
                break
            case 'M':
                expire_at.setMinutes(now.getMinutes() + time)
                break
        }

        return expire_at.getFullYear() + '/' +
            paddingLeft(expire_at.getMonth() + 1) + '/' +
            paddingLeft(expire_at.getDate()) + ' ' +
            paddingLeft(expire_at.getHours()) + ':' +
            paddingLeft(expire_at.getMinutes()) + ':' +
            paddingLeft(expire_at.getSeconds())
    }

}
