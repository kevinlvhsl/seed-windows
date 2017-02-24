#  seed2.0 vue-cli for windows template
> 内部搭建专用开发SPA项目的cli模板库。
  由于vue1.0+jade+sass+webpack 版本不兼容mac和windows，所以单独建一个window模板
> auth kevin liang

### Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

``` bash
$ npm install -g vue-cli
$ cd intvstatic/{tvname}
$ vue init kevinlvhsl/seed-windows my-project
$ cd my-project
$ npm run build
$ npm run dev
```
> 默认端口3001   demo在浏览器访问地址: [http://localhost:3001/index.dev.html#/index](http://localhost:3001/index.dev.html#/index)

## 注意事项
1. npm 包在安装正确不出现缺包或安装失败(请先更新你的node版本和npm版本)
2. windows不支持深层级目录问题： 现在的npm(3.0.0以后)安装node_modules包是会`最大限度`地平安装同一层(把依赖的包装在同层，以前是嵌套装里面)，这样目录结构不会很深，所以最好重新下载以前的npm包
3. 以前的有些功能不能支持的原因：sass、 环境变量不支持、imgmin..功能大部分是因为windows安装npm包失败.
4. 推荐安装：cnpm(淘宝镜像)
```
 npm install -g cnpm --registry=https://registry.npm.taobao.org
 
 cnpm install [name 模块名 全局加-g]
```
