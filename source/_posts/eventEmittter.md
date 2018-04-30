---
title: 一个简单的事件订阅机制eventEmittter
date: 2018-02-27 10:35:30
tags:
    - 事件订阅
categories: JS
---

## 前言

在日常工作跨模块开发时，很常见的一个场景：不同模块间的事件通信。

以下给出ES5、ES6两种实现方式。

<!-- more -->

## ES5实现

```js
// 挂载到全局
var events = {};
var Events = {
    on: function (key, fn) {
        if (typeof fn !== 'function') {
            return;
        }
        events[key] = events[key] || [];
        events[key].push(fn);
    },
    once: function (key, fn) {
        if (typeof fn !== 'function' || (fn.once && fn.hasExeced)) {
            return;
        }
        fn.once = true;
        fn.hasExeced = false;
        events[key] = events[key] || [];
        events[key].push(fn);
    },
    trigger: function (key) {
        var args = [].slice.call(arguments, 1);
        var fnList = events[key] || [];
        fnList.forEach(function (item) {
            if (typeof item === 'function') {
                if (item.once && item.hasExeced) {
                    return;
                } else if (item.once && !item.hasExeced) {
                    item.hasExeced = true;
                    item.apply(window, args);
                } else {
                    item.apply(window, args);
                }
            }
        });
    }
};

module.exports = Events;
```

## ES6实现

### 订阅者

```js
// 工具函数：是否为函数
let isFunction = function(obj) {
    return typeof obj == 'function' || false;
}

class EventEmitter {
    // Map 存放不同事件对应的观察者的处理函数
    constructor(){
        this.listeners = new Map();
    }
    // 绑定事件
    on(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }
    // 移除事件
    off(label, callback) {
        let listenerArr = this.listeners.get(label);
        let targetIndex;
        if (listenerArr && listenerArr.length) {
            targetIndex = listenerArr.reduce((i, listener, index) => {
                return (isFunction(listener) && listener === callback) ? i = index : i;
            }, -1);
        }
        if (targetIndex > -1) {
            listenerArr.splice(targetIndex, 1);
            this.listeners.set(label, listenerArr);
            return true;
        }
        return false;
    }
    // 触发事件
    emit(label, ...args) {
        let listenerArr = this.listeners.get(label);
        if (listenerArr && listenerArr.length) {
            listenerArr.forEach((listener) => {
                listener(...args);
            })
            return true;
        }
        return false;
    }
}
```

### 观察者

```js
class Observer {
    // subject 保存订阅对象
    constructor(id, subject) {
        this.id = id;
        this.subject = subject;
    }
    on(label, callback) {
        this.subject.on(label,callback);
    }
}
```

### 应用

```js
let publisher = new EventEmitter();

// 实例两个观察者
let [observer1, observer2] = [
    new Observer(1, publisher),
    new Observer(2, publisher)
];
// 绑定事件
observer1.on('careteen', (data) => {
    console.log(`${observer1.id} observered data:`, data);
});
observer2.on('lanlan', (data) => {
    console.log(`${observer2.id} observered data:`, data);
});
// 触发事件
publisher.emit('careteen', {x:'yaoxiugai'}); // 1 observered data: {x:'yaoxiugai'}
publisher.emit('lanlan', [1, 2, 3]); // 2 observered data: [1, 2, 3]
```

## 总结

每一根线都有生命，经年生长，日渐成熟，最终布料才能呈现它曾深藏不露的美丽。  -- 发酵自己吧

参考：Implementing EventEmitter in ES6 http://www.datchley.name/es6-eventemitter/
