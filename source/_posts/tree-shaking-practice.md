---
title: tree-shaking-practice
date: 2018-04-30 21:43:20
tags:
    - webpack
    - rollup
    - tree-shaking
    - plugin
categories: webpack
---
- webpack 构建流程
- 插件机制（插件机制是整个webpack工具的骨架，而webpack本身也是基于这套机制构建的）
	- 如何编写一个插件
		```js
		// 1、some-webpack-plugin.js 文件（独立模块）
		// 2、模块对外暴露的 js 函数
		function SomewebpackPlugin(pluginOpions) {
			this.options = pluginOptions;
		}
		// 3、原型定义一个 apply 函数，并注入了 compiler 对象
		SomewebpackPlugin.prototype.apply = function (compiler) {
		// 4、挂载 webpack 事件钩子（这里挂载的是 emit 事件）
		    compiler.plugin('emit', function (compilation, callback) {
				// ... 内部进行自定义的编译操作
				// 5、操作 compilation 对象的内部数据
				console.log(compilation);
				// 6、执行 callback 回调
		        callback();
		    });
		};
		// 暴露 js 函数
		module.exports = SomewebpackPlugin;
		```
	- compiler对象和compilation对象
		- compiler对象
		- compilation对象
	- webpack插件机制（在每个生命周期点，webpack为运行所有注册的插件，并提供当前webpack编译状态信息）
		- tapable实例
		- 运行流程
		- webpack相关事件钩子
		- compiler事件钩子
		- compilation事件钩子

- 文件管理
	- 编译ES6、TS
	- 编译LESS、SASS
	- 图片压缩和base64编码
	- 自动生成雪碧图
- 打包优化
	- 代码分隔和懒加载
	- tree shaking
		- 什么是tree shaking
		- 支持tree shaking 的构建工具
			- rollup
			- webpack 2 +
			- closure compiler
		- tree shaking 原理
			- Dead code elimination
			- rollup和webpack构建结果对比（未使用tree shaking）
			- rollup和webpack构建结果对比（使用tree shaking）
				- 对于有副作用的代码仍然无法做到较好的静态分析
					- 副作用
				- closure compiler 打包结果完美（但是需要侵入式写代码，前端er是很反感的）
		- tree shaking 意义重大 （必须要做的）
		- tree shaking 实践
			- 对组件库的引用做优化（基于antd对import的优化做修改，实现可配置引用其他组件库）
			- CSS tree shaking

		- 总结
			- 编码：避免编写带有副作用的代码（例如自执行函数里面使用外部变量）
			- 配置babel：开启babel的loose模式（根据自身项目判断是否真的要不可枚举class的属性）
			- 在开发js库时，使用rollup打包。
				- 避免产生副作用代码，将功能函数或者组件打包成单独的文件或目录，以便用户通过目录加载（参照优秀的element-ui组件库）
			-
			- 把一件事做好，还是很难的呀
	- 长缓存配置
