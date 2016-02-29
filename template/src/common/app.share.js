/*
 * 素材页用 shaketv 分享 在非素材页 用 sdk 分享
 */
export default (title, description, link) => {
    let share = Intv.config.share
    let _logo = share.logo
    let _title = title || share.title
    let _description = description || share.description
    let _link = share.link

    if(/yaotv\.qq\.com/.test(location.host)) {
        shaketv.wxShare(
            _logo,
            _title,
            _description,
            _link
        )
    } else {
        Intv.share({
            imgUrl: _logo,
            title: _title,
            desc: _description,
            link: _link,
            program_id: Intv.config.programName
        })

    }
}
