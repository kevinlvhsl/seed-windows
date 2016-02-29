export function configRouter(router) {
    router.map({
        '/index': {
            component: require('../views/index.vue')
        }
    })

    router.redirect({
        '*': '/' + App.defaultView
    })

    router.beforeEach((transition) => {
        window.scrollTo(0, 0)
        transition.next()
    })
}
