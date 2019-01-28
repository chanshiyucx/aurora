# Aurora - An awesome blog theme

[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com) [![QQ](https://img.shields.io/badge/QQ-1124590931-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes) [![Email](https://img.shields.io/badge/Emali%20me-me@chanshiyu.com-green.svg?style=flat-square)](me@chanshiyu.com)

![蝉時雨](https://i.loli.net/2019/01/28/5c4e7e979e481.png)

Aurora 是一个基于 Vue 开发的 SPA 单页面博客应用程序，后台数据源依托于 [Github Issues](https://developer.github.com/v3/issues/)，使用开源项目 [Gitalk](https://github.com/gitalk/gitalk) 作为博客评论系统。该主题基于 Github 全家桶，脱离服务器与数据库，关注内容本身，操作简单，免费食用。

技术栈：Vue + Github Issues + Gitalk

在线演示：[蝉時雨](https://chanshiyu.com)

## Getting Started

### Installing

```bash
git@github.com:chanshiyucx/aurora.git
cd aurora
npm install # or yarn
```

### Configuration

修改目录 `src/config.js` 的配置文件，每个配置项都有详细说明。

页面模板参考： [文章、关于、标签、分类、书单等模板](https://github.com/chanshiyucx/Blog/issues)，第一次食用可以直接 Fork 预览效果。

### Preview

```bash
npm start
```

浏览器打开 `http://localhost:8000` 便可访问新的博客！

### Deployment

```bash
npm run build
```

打包完毕，将 `dist` 目录下生成的静态文件发布 `Github Pages` 或 `Coding Pages` 即可。

Just enjoy it ฅ●ω●ฅ

## License

This project is licensed under the MIT License.
