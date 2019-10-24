# Aurora - An awesome blog theme

[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com)
[![QQ](https://img.shields.io/badge/QQ-1124590931-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-me@chanshiyu.com-green.svg?style=flat-square)](me@chanshiyu.com)

![蝉時雨](https://i.loli.net/2019/04/28/5cc5bbc4ae020.png)

Aurora 是一个基于 Vue 开发的 SPA 单页面博客应用程序，使用 [Github Issues](https://developer.github.com/v3/issues/) 进行写作，借助 [Github Api](https://developer.github.com/v3/) 获取数据。博客评论系统采用开源项目 [Gitalk](https://github.com/gitalk/gitalk)。主题基于 Github 全家桶，脱离服务器与数据库，关注内容本身，操作简单，免费食用。

技术栈：Vue + Github Pages + Github Api + Gitalk

在线演示：[蝉時雨](https://chanshiyu.com)

## Getting Started

完整详细的主题食用方法参考 [Aurora 食用指南](https://github.com/chanshiyucx/blog/issues/41)。

### Installing

```bash
npm install -g @vue/cli-service-global

git clone git@github.com:chanshiyucx/aurora.git
cd aurora
npm install # or yarn
```

### Configuration

修改目录 `src/config.js` 的配置文件，每个配置项都有详细说明。

为了更好地定制各个页面的展示效果，这里约定一些页面内容的格式，主要分`文章、书单、友链、关于` 四个内容模板。对于文章模板没有太多的格式约束，只需要在文章正文顶部加上封面配图即可，配图采用的是 markdown 的注释语法，所以并不会在正文里渲染。

```
[pixiv: 63093148]: # "https://i.loli.net/2019/04/23/5cbf08e49500b.jpg"
```

其余三个页面模板参考如下：

- [友链](https://github.com/chanshiyucx/blog/blob/master/Pages/Friends.md)
- [书单](https://github.com/chanshiyucx/blog/blob/master/Pages/Books.md)
- [关于](https://github.com/chanshiyucx/blog/blob/master/Pages/About.md)

### Preview

确定配置无误，可以先本地预览，注意在本地预览时 gitalk 不会渲染，这属于正常情况，发布线上后便能正常显示评论。

```bash
npm start
```

浏览器打开 `http://localhost:8000` 便可访问新的博客！

### Deployment

本地预览检查能正常访问后，即可以打包发布上线。

```bash
npm run build
```

打包完毕，将 `dist` 目录下生成的静态文件发布 `Github Pages` 或 `Coding Pages` 即可。

Just enjoy it ฅ●ω●ฅ

## Timeline

- 2019/10/24 Aurora 2.0
- 2019/04/25 新增背景主题-千年幻想
- 2019/03/08 新增 Valine 匿名评论功能

## License

This project is licensed under the MIT License.
