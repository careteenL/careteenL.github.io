---
title: 正则表达式奇技淫巧
date: 2018-07-18 20:27:57
tags:
    - RegExp
    - Js正则

---

![cat](regexp/chrome.gif)

善用正则表达式可以少些很多代码。

<!-- more -->

## 正则表达式奇技淫巧

### 前言

善用正则表达式可以少些很多代码。

[github传送门md](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/advanced/20180627-RegExp.md)

[github传送门js](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/advanced/20180627-RegExp.js)

### 正则语法

#### 1、基本元字符

- 1.1 `.`：匹配除了换行符之外的任何单个字符
- 1.2 `\`：其一用途：在非特殊字符之前的反斜杠表示和下一个字符组合成特殊含义，例如`\b`表示字符边界；其二用途：反斜杠可将其后面的特殊字符转为字面量，例如模式`/a*/`代表会匹配0或多个a，但模式`/a\*/`代表匹配`a*`这个字符串。
- 1.3 `|`：逻辑或操作符
- 1.4 `[]`：定义一个字符集合，匹配字符集合中的一个字符，在字符集合里面项`.`、`\`这些字符代表其本身。
- 1.5 `[^]`：对 1.4 取非
- 1.6 `-`：定义一个区间，例如`[a-z]`表示取一个小写英文单词。

#### 2、数量元字符

- 2.1 `{m,n}`： 匹配前面一个表达式至少m次至多n次，还有`{m}`表示匹配m次，`{m,}`表示至少m次。
- 2.2 `+`：匹配前面一个表达式一次或者多次，即`{1,}`
- 2.3 `*`：匹配前面一个表达式零次或多次，即`{0,}`
- 2.4 `?`：匹配前面一个表达式零次或一次，即`{0,1}`

#### 3、位置元字符

- 3.1 `^`：单独使用匹配表达式的开始
- 3.2 `$`：匹配表达式的结束
- 3.3 `\b`：匹配单词边界
- 3.4 `\B`：匹配非单词边界
- 3.5 `(?=p)`：匹配p前面的位置
- 3.6 `(?!p)`：匹配不是p前面的位置

#### 4、特殊元字符

- 4.1 `\d`：`[0-9]` 表示一位数字
- 4.2 `\D`: `[^0-9]` 表示一位非数字
- 4.3 `\s`: `[\t\v\n\r\f]` 表示空白符，包括空格，水平制表符（`\t`），垂直制表符（`\v`），换行符（`\n`），回车符（`\r`），换页符（`\f`）
- 4.4 `\S`:`[^\t\v\n\r\f]` 表示非空白符
- 4.5 `\w`:`[0-9a-zA-Z]` 表示数字大小写字母和下划线，即单词字符
- 4.6 `\W`:`[^0-9a-zA-Z]` 表示非单词字符

#### 5、标志字符

- 5.1 `g`：全局搜索 global
- 5.2 `i`：不区分大小写 ignore
- 5.3 `m`：多行搜索 multi

### 正则在JS中的使用

#### 1、 `String.prototype.search(regexp)`

[search -mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search)

#### 2、`String.prototype.match(regexp)`

[match -mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)

#### 3、`String.prototype.replace(regexp|substr, newSubStr|function)`

[replace -mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

#### 4、`String.prototype.split([separator[, limit]])`

[split -mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)

### 正则对象的方法

#### 1、`RegExp.prototype.test(str)`

[test -mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

#### 2、`RegExp.prototype.exec(str)`

[exec -mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

### 常用正则

[传送门](https://github.com/careteenL/webFEDeveloper/blob/master/Front-end-knowledge/advanced/20180627-RegExp.js)

目录

- 驼峰式命名改成短横线命名
- 短横线命名改成驼峰式命名
- 千位分隔符
- 判断一个数是否为素数
- 去掉字符前后空格
- 获取`url`某个`param`的`value`

JS代码

```js
/**
 *
 * @desc 正则表达式奇技淫巧
 */

const RegExpFns = {
    /**
     *
     * @desc 驼峰式命名改成短横线命名
     * @param {String} str
     * @return {String} str
     * @example
     RegExpFns._camel2Kebab('careteenLanlan'); // careteen-lanlan
     */
    _camel2Kebab (str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    },

    /**
     *
     * @desc 短横线命名改成驼峰式命名
     * @param {String} str
     * @return {String} str
     * @example
     RegExpFns._kebab2Camel('careteen-lanlan'); // careteenLanlan
     */
    _kebab2Camel (str) {
        return str.replace(/-(\w)/g, (match, $1) => {
            return $1.toUpperCase();
        })
    },

    /**
     *
     * @desc 千位分隔符
     * @param {String|Number} str 只适合整数字符
     * @return {String} str
     * @example
     RegExpFns._thousandSeq('1234567'); // 1,234,567
     */
    _thousandSeq (str) {
        return str && str.toString().replace(/(?!^)(?=(\d{3})+$)/g, ',');
    },

    /**
     *
     * @desc 判断一个数是否为素数
     * @param {Number} num
     * @return {Boolean}
     * @example
     RegExpFns._isPrime(2); // true
     * @reference https://github.com/jawil/blog/issues/20
     */
    _isPrime (num) {
        return !/^1?$|^(11+?)\1+$/.test(Array(num + 1).join('1'));
    },

    /**
     *
     * @desc 去掉字符前后空格
     * @param {String} str
     * @return {String|Boolean}
     * @example
     RegExpFns._trim(' care teen  '); // 'care teen'
     */
    _trim (str) {
        if (typeof str !== 'string') {
            console.error('[TypeError]: argument must be a string');
            return false;
        }
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },

    /**
     *
     * @desc 获取 url 某个 param 的 value
	 * @param  {String} name
     * @param  {String} url   [default: location.href]
	 * @return {String|Boolean}
     * @example
     RegExpFns._getParam('name', 'http://blog.careteen.wang?name=careteen&age=22'); // 'careteen'
     */
    _getParam (name, url) {
        if (typeof name !== 'string') return false;
		if (!url) url = window.location.href;
        // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
		name = name.replace(/[\[\]]/g, '\\$&');
		const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
		const results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

/**
 *
 * @desc 测试用例
 */
// console.log('_camel2Kebab', RegExpFns._camel2Kebab('careteenLanlan'));
// console.log('_kebab2Camel', RegExpFns._kebab2Camel('careteen-lanlan-a'));
// console.log('_thousandSeq', RegExpFns._thousandSeq('1234567'));
console.log('_isPrime', RegExpFns._thousandSeq('2'));

// export default RegExpFns;

```

### 引用

- [正则表达式 -掘金](https://juejin.im/post/59b5e50f51882519777c4815)

- [知道这20个正则表达式，能让你少写1,000行代码 -简书](https://www.jianshu.com/p/e7bb97218946)
