const Koa = require('koa')
const fs = require('fs')
const views = require('koa-views')
const path = require('path')
const config = require('./config/default')
const mysql = require('./mysql')
const app = new Koa()

/**
 * route函数：根据URL获取data内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route(url, ctx) {
    let view
    switch (url) {
        case '/clothes':
            view = mysql.queryClothes()
            break
        case '/furnitrue':
            view = mysql.queryFurnitrue()
            break
        case '/electric':
            view = mysql.queryElectric()
            break
    }
    let html = view
    return html
}
// 加载模板引擎,__dirname指的是当前文件的位置
app.use(views(path.join(__dirname, './'), {
    // ejs模板引擎(ejs是一种模板语言)
    extension: 'ejs'
}))
app.use(async(ctx) => {
    let url = ctx.request.url
    if (url === '/') {
        let title = 'node商城首页'
            // 根据路由渲染来渲染内容,ctx.render是koa-views中间件绑定到ctx上下文的一个方法，ctx.render方法第一个参数是模板相对路径，相对于views目录下 ，第二个参数就是传入到模板的数据
        await ctx.render('index', {
            title,
        })
    } else {
        let data = await route(url) //await mysql.query()
        ctx.body = data
            // console.log(data)
    }
})

app.listen(config.port, () => {
    console.log('http://localhost:8888/')
})