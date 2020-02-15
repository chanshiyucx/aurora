# Aurora - An awesome blog theme

[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com)
[![QQ群](https://img.shields.io/badge/QQ群-1029784628-blue.svg?style=flat-square)](https://jq.qq.com/?_wv=1027&k=5cHOhhO)
[![Email](https://img.shields.io/badge/Email%20me-me@chanshiyu.com-green.svg?style=flat-square)](me@chanshiyu.com)

![蝉時雨](https://i.loli.net/2019/04/28/5cc5bbc4ae020.png)

Aurora 是一个基于 Vue 开发的 SPA 单页面博客应用程序，使用 [Github Issues](https://developer.github.com/v3/issues/) 进行写作，借助 [Github Api](https://developer.github.com/v3/) 获取内容，通过 `Github Pages` 部署在线访问。博客评论系统采用开源项目 [Gitalk](https://github.com/gitalk/gitalk)。主题基于 Github 全家桶，脱离服务器与数据库，关注内容本身，操作简单，免费食用。

技术栈：Vue + Github Pages + Github Issues + Github Api + Gitalk。

在线演示：[蝉時雨](https://chanshiyu.com)

## Getting Started

### Installing

```bash
npm install -g @vue/cli-service-global

git clone git@github.com:chanshiyucx/aurora.git

cd aurora
npm install
```

### Configuration

修改配置文件 `src/config.js`，每个配置项都有详细说明。

完整详细的主题食用方法参考 [Aurora 食用指南](https://chanshiyu.com/#/post/41)。

### Preview

确定配置无误，可以先行本地预览。

```shell
npm start
```

浏览器打开 `http://localhost:8000` 便可访问新的博客！

> 注意在本地预览时 gitalk 不能正常使用，这属于正常情况，发布线上访问便能正常显示评论。

### Deployment

本地预览检查能正常访问后，即可以打包发布上线。

Aurora 2.0 添加一键部署功能，只需要编辑 `deploy.sh`，配置自己的仓库和域名，之后命令行执行 `./deploy.sh`，即可自动打包并上传到指定仓库，将该仓库开启 `Github Pages` 功能即可在线访问。

```shell
./deploy.sh
```

Just enjoy it ฅ●ω●ฅ

## Timeline

- 2019/10/24 Aurora 2.0
- 2019/04/25 新增背景主题-千年幻想
- 2019/03/08 新增 Valine 匿名评论功能

## License

This project is licensed under the MIT License.
