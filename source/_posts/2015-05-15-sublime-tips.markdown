---
layout: post
title: "sublime tips"
date: 2015-05-15 16:40
comments: true
categories: 
math: 
abstract: 
---

## 显示cjk
安装了sublime以后，默认字体对cjk（中文，韩文，日文）支持不是很好，可以使用 YaHei Consolas Hybrid字体。
下载 YaHei Consolas Hybrid，可使用链接：

[从google code下载](https://code.google.com/p/uigroupcode/downloads/detail?name=YaHei.Consolas.1.12.zip&can=2&q=)

[从github下载](https://github.com/liangfeng/consolas-font-for-airline/blob/master/YaHei%20Consolas%20Hybrid.ttf)

放入windows下面的font目录。

在sublime里面： `preferences`->`settings - User`, 加入下面一行

```
"font_face": "YaHei Consolas Hybrid",
```

<!-- more -->

参考：[前端最爱的字体YaHei Consolas Hybrid](http://www.w3cfuns.com/blog-1-5399368.html)

## pretty json

在sublime里面安装pretty json插件，首先要安装[sublime package control](https://packagecontrol.io/installation)

然后可以简单阅读一下package control的使用方法。

这里我们使用install package，操作方式: `ctrl+shift+p`, 然后输入 install, 之后按照提示选择`Package Control: Install Package`。

然后输入"Pretty JSON", 就可以找到，选择就会安装。

安装好以后，在windows上就可以通过`ctrl+shif+j`进行format了。

其余设置参考： [SublimePrettyJson](https://github.com/dzhibas/SublimePrettyJson)

## Markdown preview

按照上面的方式，在`Package Control: Install Package`搜索`Markdown Preview`, 然后选择安装。

安装以后，可以通过sublime的Command Palette（ctrl+shift+p)中输入command进行操作：

```
Markdown Preview: Preview in Browser
Markdown Preview: Export HTML in Sublime Text
Markdown Preview: Copy to Clipboard
Markdown Preview: Open Markdown Cheat sheet
```

可以绑定快捷键: `Preferences` -> `Key Binding - User`, 加入下面一行：

```
{ "keys": ["alt+m"], "command": "markdown_preview", "args": {"target": "browser", "parser":"markdown"} }
```

也可以设置为自己选择markdown语法解析器。

```
{ "keys": ["alt+m"], "command": "markdown_preview_select", "args": {"target": "browser"} }
```

这样快捷键就绑定为`alt+m`

更多可以参考：[sublimetext-markdown-preview](https://github.com/revolunet/sublimetext-markdown-preview)
