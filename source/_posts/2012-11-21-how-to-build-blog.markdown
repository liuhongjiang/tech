---
layout: post
title: "使用Octopress搭建博客"
date: 2012-11-21 10:40
comments: true
categories: octopress 
---

## 如何搭建
这个blog是使用[Octopress](http://octopress.org/)搭建的，存放在[github](https://github.com/)上。相关信息如下：

* [github](https://github.com/)
* [github pages](http://pages.github.com/)
* [Octopress](http://octopress.org/)
* [Octopress手册](http://octopress.org/docs/)


## 值得借鉴的站点

* [这个小站很牛B](http://luikore.github.com/2011/09/good-things-learned-from-octopress/)
* [yanping.me](http://yanping.me/)
* [http://www.yangzhiping.com/](http://www.yangzhiping.com/)
* [http://colors4.us/](http://colors4.us/)
* [http://mark.reid.name/](http://mark.reid.name/)
* [http://www.worldhello.net](http://www.worldhello.net)
* [http://jakevdp.github.com/](http://jakevdp.github.com/)

## 在blog中显示公式

* [在Octopress中使用LaTeX](http://yanping.me/cn/blog/2012/03/10/octopress-with-latex/)
* [Hello MathJax](http://steshaw.org/blog/2012/02/09/hello-mathjax/)
* [blog写公式的例子](http://jakevdp.github.com/blog/2012/09/05/quantum-python/)

## 标签  

* [标签云的插件](https://github.com/tokkonopapa/octopress-tagcloud)

## 拷贝本站
或者你也可以拷贝这个项目到你的github的pages的项目中，然后删除source/\_post下面的所有文章。修改部分配置即可。

* [本项目](https://github.com/liuhongjiang/liuhongjiang.github.com)

<strong style="color:red">注意：</strong>clone的是source分支，不是master。

需要修改的地方：

* \_config.yml文件

```
url: http://liuhongjiang.github.com
title: 刘洪江的流水帐
subtitle: 拾起点点滴滴, 聚沙成石.
author: 刘洪江
simple_search: http://google.com/search
description: 他是一个程序员，已婚，有个儿子，字“左烦子”，号“李真棒”.
```

* 自我介绍

	* source/about/index.markdown 
	* source/_includes/custom/asides/about.html

## 感谢
在本站的搭建过程中，参考了[http://yanping.me/cn/](http://yanping.me/cn/)。我阅读了他关于如何搭建的文章，也借鉴了他的很多样式。在此表示感谢。
