---
title: 面试官：实现一个简易的模板引擎
date: 2018-08-01 15:05:10
tags:
    - 模板
    - 面试官系列
---
面试官系列：实现一个模板引擎

![baotou](template-engine/baotou.jpg)

<!-- more -->

## 模板引擎

### 前言

面试官系列：实现一个模板引擎

完整使用代码见 [模板引擎demo](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/advanced/20180801-template_engine.js)

### 模板引擎的实现

#### 步骤

1、模板获取

2、模板中HTML结构与JavaScript语句、变量分离

3、Function + apply(call)动态生成JavaScript代码

4、模板缓存

### 1、模板获取

```js
// 匹配模板id
const idReg = /[\s\W]/g
// 如果是模板字符串，会包含非单词部分（<, >, %,  等）；如果是id，则需要通过getElementById获取
if (!idReg.test(str)) {
    tpl = document.getElementById(str).innerHTML
} else {
    tpl = str
}
```

### 2、模板中HTML结构与JavaScript语句、变量分离 的思路

1、需要一个正则表达式/<%=?\s*([^%>]+?)\s*%>/g， 可以匹配<% xxx %>, <%= xxx %>

2、需要一个辅助变量cursor，记录HTML结构匹配的开始位置

3、需要使用exec函数，匹配过程中内部的index值会根据每一次匹配成功后动态的改变

4、创建数组arr，再拼接字符串arr.push('

5、 遇到换行回车，替换为空字符串

6、 遇到<%时，替换为');

7、遇到>%时，替换为arr.push('

#### 2.1模板写法
```js
<script type="text/html" id="template">
	<ul>
		<% if (obj.show) { %>
			<% for (var i = 0; i < obj.users.length; i++) { %>
				<li>
					<a href="<%= obj.users[i].url %>">
						<%= obj.users[i].name %>
					</a>
				</li>
			<% } %>
		<% } else { %>
			<p>不展示列表</p>
		<% } %>
	</ul>
</script>
```

#### 2.2核心代码
```js
let tpl = ''
let match = ''  // 记录exec函数匹配到的值
// 匹配模板id
const idReg = /[\s\W]/g
// 匹配JavaScript语句或变量
const tplReg = /<%=?\s*([^%>]+?)\s*%>/g
const keyReg = /(for|if|else|switch|case|break|{|})/g   // **** 增加正则匹配语句

const add = (str, result, js) => {
	str = str.replace(/[\r\n\t]/g, '')
		.replace(/\\/g, '\\\\')
		.replace(/'/g, "\\'")
        // **** 增加三元表达式的判断，三种情况：JavaScript语句、JavaScript变量、HTML结构。
	result += js ? str.match(keyReg) ? `${str}` : `result.push(${str});` : `result.push('${str}');`
	return result
}

const tmpl = (str, data) => {
	// 记录HTML结构匹配的开始位置
	let cursor = 0
	let result = 'let result = [];'
	// 如果是模板字符串，会包含非单词部分（<, >, %,  等）；如果是id，则需要通过getElementById获取
	if (!idReg.test(str)) {
		tpl = document.getElementById(str).innerHTML
	} else {
		tpl = str
	}
        // 使用exec函数，每次匹配成功会动态改变index的值
	while (match = tplReg.exec(tpl)) {
		result = add(tpl.slice(cursor, match.index), result) // 匹配HTML结构
		result = add(match[1], result, true)		     // **** 匹配JavaScript语句、变量
		cursor = match.index + match[0].length	             // 改变HTML结果匹配的开始位置
	}
	result = add(tpl.slice(cursor), result)		             // 匹配剩余的HTML结构
	result += 'return result.join("")'
}
console.log(tmpl('template'))
```

#### 2.3执行后的代码格式化如下
```
" let result = [];
result.push('<ul>');
if (obj.show) {
    result.push('');
    for (var i = 0; i < obj.users.length; i++) {
        result.push('<li><a href="');
        result.push(obj.users[i].url);
        result.push('">');
        result.push(obj.users[i].name);
        result.push('</a></li>');
    }
    result.push('');
} else {
    result.push('<p>什么鬼什么鬼</p>');
}
result.push('</ul>');
return result.join("") "
```

### 3、Function + apply(call)动态生成HTML代码

使用function构造函数直接创建一个函数，这样做的性能会稍微差一点（双重解析：js解析js代码，代码包含在字符传中，也就是说在js代码运行的同时必须启动一个解析器来解析新的代码。实例化一个新的解析器有不容忽视的开销，所以这种代码比直接解析慢得多。）
```js
var a = new Function('a', 'b', 'console.log(a + b)')
a(1, 2) // => 3
```
如果需要传入参数，可使用call或者apply改变函数执行时所在的作用域即可
```js
a.apply(data)
```

### 4、模板缓存

使用模板的原因不仅在于避免手动拼接字符串而带来不必要的错误，而且在某些场景下可以复用模板代码。为了避免同一个模板多次重复拼接字符串，可以将模板缓存起来。我们这里缓存当传入的是id时可以缓存下来。

```js
let tpl = ''
let match = ''
const cache = {}
// 匹配模板id
const idReg = /[\s\W]/g
// 匹配JavaScript语句或变量
const tplReg = /<%=?\s*([^%>]+?)\s*%>/g
// 匹配各种关键字
const keyReg = /(for|if|else|switch|case|break|{|})/g

const add = (str, result, js) => {
	str = str.replace(/[\r\n\t]/g, '')
		.replace(/\\/g, '\\\\')
		.replace(/'/g, "\\'")
	result += js ? str.match(keyReg) ? `${str}` : `result.push(${str});` : `result.push('${str}');`
	return result
}

const tmpl = (str, data) => {
	let cursor = 0
	let result = 'let result = [];'
        // 如果是模板字符串，会包含非单词部分（<, >, %,  等）；如果是id，则需要通过getElementById获取
	if (!idReg.test(str)) {
		tpl = document.getElementById(str).innerHTML
		// 缓存处理
		if (cache[str]) {
			return cache[str].apply(data)
		}
	} else {
		tpl = str
	}
    // 使用exec函数，动态改变index的值
	while (match = tplReg.exec(tpl)) {
		result = add(tpl.slice(cursor, match.index), result) // 匹配HTML结构
		result = add(match[1], result, true)		     // 匹配JavaScript语句、变量
		cursor = match.index + match[0].length		     // 改变HTML结果匹配的开始位置
	}
	result = add(tpl.slice(cursor), result)		             // 匹配剩余的HTML结构
	result += 'return result.join("")'
	let fn = new Function(result)		                     // 转成可执行的JS代码
	if (!cache[str] && !idReg.test(str)) {                       // 只有传入的是id的情况下才缓存模板
		cache[str] = fn
	}
	return fn.apply(data)		                              // apply改变函数执行的作用域
}    
```

### 总结

#### 大体思路如下：

模板引擎实现的原理大致是将模板中的HTML结构和JavaScript语句、变量分离，将HTML结构以字符串的形式push到数组中，将JavaScript语句独立抽取出来，将JavaScript变量以其自身push到数组中，通过replace函数的替换或者exec函数的遍历，构建出带有数据的HTML代码，最后通过Function构造函数 + apply(call)函数生成可执行的JavaScript代码。

#### 继续追问：

1、为什么要用数组？可以用字符串吗？两者有什么区别？

> 数组操作比字符串拼接快一些

2、简单的一下replace和exec函数的使用？

> 自行 mdn 或者 参考[正则表达式奇技淫巧](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/advanced/20180627-RegExp.md)中的理解

3、exec 和match函数有什么不同？

> 同2

4、/<%=?\s*([^%>]+?)\s*%>/g 这段正则是什么意思？

> 匹配<% xxx %> or <%= xxx %>

5、简单说明apply、call、bind函数的区别？

> 见[apply、call、bind](a)

6、Function构造函数的使用，有什么弊端？

> 双重解析：js解析js代码，代码包含在字符传中，也就是说在js代码运行的同时必须启动一个解析器来解析新的代码。实例化一个新的解析器有不容忽视的开销，所以这种代码比直接解析慢得多。

7、函数声明和函数表达式的区别？

> [函数申明在js解析时会函数提升；函数表达式的值是在js运行时确定。](https://www.cnblogs.com/xbj-2016/p/5903611.html)

### 引用

- [编写一个简单的JavaScript模板引擎 -zhihu](https://zhuanlan.zhihu.com/p/38565975)
