# 构建工具

主要通过 gulp 来构建

使用 gulp 来 watch 各种类型的文件，一旦监听到改动，就编译到目标文件

包括

## *.js

- 使用 gulp-babel 进行 es6 to es5
- 使用 gulp-wxa-copy-npm，允许引用 node_modules 中的文件
  具体原理是：
  - 假如需要引用 `lodash`，就进入 node_modules 目录下寻找 lodash 目录
  - 根据 package.json 找到入口文件，并通过 require 分析引用的子文件
  - 将上述文件保留文件间目录结构，都复制到 gwcn-modules 目录下
  - 将 require('lodash') 转写为 require('../gwcn-modules/lodash/lodash.js')

## *.json5

- 使用 gulp-json5-to-json 转为 *.json

## *.less

- 使用 gulp-less 转为 *.css
- 使用 less-import-aliases ，可以设置 import 路径名中的别名

## *.html

直接使用 gulp-rename 替换后缀名
