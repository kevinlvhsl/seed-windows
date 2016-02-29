const urlParser = document.createElement('a')

export function domain (url) {
    urlParser.href = url
    return urlParser.hostname
}

export function secToDate (sed) {
    const date = new Date(parseInt(sed)*1000)

    let fixBit = (num) => {
        if(num < 10) num = '0' + num

        return num
    }

    let hour = fixBit(date.getHours())
    let minute = fixBit(date.getMinutes())

    return hour + ':' + minute

}

export function secToMin (sed) {
    let fixBit = (num) => {
        if(num < 10) num = '0' + num
        return num
    }

    let min = fixBit( Math.trunc( sed / 60) )
    let sec = fixBit(sed % 60)

    return min + ':' + sec
}
