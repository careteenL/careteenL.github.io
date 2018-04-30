---
title: cnpm安装
date: 2018-02-24 15:53:08
tags:
    - npm
    - cnpm
categories: cnpm    
---

## Usage

### npm弊端
>  由于npm的源在国外，npm install 时经常出现模块和插件安装失败。
 特别是node-sass，此时解决方案一般为删掉 node_modules 目录。

``` bash
$ rm -rf node_modules
```
> 然后再次重新安装所有依赖

``` bash
$ npm install
```
<!-- more -->

> 但是如此反复失败后，你会变得很没有脾气。

### 使用cnpm
> cnpm 官方给出的解释是 npm client for China mirror of npm （npm的中国镜像客户端）。这个镜像源是淘宝做的。

> 安装方法

``` bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
> 使用方式和npm一毛一样

- 在此由衷的感谢淘宝前端团队为国内前端开发者做出的巨大贡献

## 20180108（宜较真）：
```
我数过
鸽子每分钟会咕咕叫六十声
            --《托斯卡纳艳阳下》弗朗西斯•梅斯
```
