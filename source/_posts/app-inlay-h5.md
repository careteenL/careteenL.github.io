---
title: APP内嵌H5时H5编码总结
date: 2018-06-03 12:09:35
tags:
    - APP内嵌H5
---

![keep-calm-and-make-epic-shit](app-inlay-h5/keep-calm-and-make-epic-shit.png)

APP内嵌H5时H5编码总结，持续完善...

<!-- more -->

# APP内嵌H5时H5编码总结

## APP和H5交互

见[APP内嵌H5页面中JS和APP的交互，可传参，可回调](https://github.com/careteenL/JsAndAppInteraction)

## 上传图片

IOS系统中，app端无需过多处理，webview中h5使用`type="file"`即可调起手机相册。
```html
<input type="file" multiple="true"
    class="real-btn"
    accept="image/gif,image/jpeg,iamge/jpg,image/png,image/svg"
    :ref="id"
    :id="id"
    @change="handleUploadPics">
```
Android系统中，则需要app端稍作处理，才能在h5中调起手机相册，h5端如上编码即可。

原因：openFileChooser做了多次修改，在5.0上更是将回调方法该为了onShowFileChooser。
解决：对openFileChooser()进行重载，同时针对5.0及以上系统提供onShowFileChooser()，不混淆openFileChooser()

app端可参考[android使用webview上传文件(支持相册和拍照)](https://blog.csdn.net/woshinia/article/details/19030437)、[Android 如何選取圖片或是檔案？](https://magiclen.org/android-filechooser/)

## 引入骨架页

[首屏加载引用骨架屏，优化用户感知体验。](https://github.com/careteenL/vue-skeleton)

首屏加载引用骨架屏，取代loading图、进度条，优化用户体验。

`npm run build`之后，构建jekins之前，将骨架代码自动化注入`index.html`。

作为模板的html文件，需要添加占位符`<!--vue-ssr-outlet-->`

```html
<div id="app">
 <!--vue-ssr-outlet-->
</div>
```
只需执行一次，不用每次部署都执行。

```bash
npm run skeleton
```

## 使用VUEX

本地开发时，开启严格模式。
```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
});

```
虽然在开发过程中，每次状态变更都需要显式调用`mutation`函数，看似繁琐，但对于后期维护，会变得十分方便和高效。

严格模式下，属于Vuex的state使用v-model需要稍作处理。
```html
<input v-model="message">
```
在computed中使用setter显式提交状态变更
```js
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```
