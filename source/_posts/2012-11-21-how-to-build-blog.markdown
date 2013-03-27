---
layout: post
title: "使用Octopress搭建博客"
date: 2012-11-21 10:40
comments: true
categories: octopress 
---

## 如何搭建blog
* 这个blog是使用[Octopress](http://octopress.org/)搭建的，它是一种基于[Jekyll](https://github.com/mreid/jekyll/)的博客框架。
* 存放在[github](https://github.com/)上。
* markdown解析器用的[kramdown](http://kramdown.rubyforge.org/)
* 数学公式解析器用的[MathJax](http://www.mathjax.org/)

<!-- more -->

相关信息如下：

* [github](https://github.com/)
* [github pages](http://pages.github.com/)
* [Octopress](http://octopress.org/)
* [Octopress手册](http://octopress.org/docs/)


## 值得借鉴的站点

下面是一个很不错的小站，都是结语jekyll和github搭建的，如果决定喜欢，可以从github拷贝下来，然后自己搭建一个。这些小站中还有很多关于如何使用github，搭建blog的文章，可以看看。

* [这个小站很不错](http://luikore.github.com/2011/09/good-things-learned-from-octopress/)
* [yanping.me](http://yanping.me/)
* [http://www.yangzhiping.com/](http://www.yangzhiping.com/)
* [http://colors4.us/](http://colors4.us/)
* [http://mark.reid.name/](http://mark.reid.name/)
* [http://www.worldhello.net](http://www.worldhello.net)
* [http://jakevdp.github.com/](http://jakevdp.github.com/)
* [head的照片](http://threeofakind.ca/blog/2012/06/russells-6-8-months/) 
* [head的渐变色](http://blog.satrex.jp/)
* [一个前端大牛的博客：wǒ_is神仙](http://mrzhang.me/)
* [3d云标签，豆瓣阅读的侧边栏](http://www.dongwm.com/)

其它的收集

* [这个slideshows太亮了](http://justineo.github.com/slideshows/font/#/)
* [另外一种博客语法高亮:Using SHJS for Jekyll](http://mrzhang.me/blog/using-shjs-for-jekyll.html)

## 在blog中显示公式

数学公式解析器用的[MathJax](http://www.mathjax.org/), 这是一个JS脚本，渲染Latex格式的数学公式。请参考以下几篇文章。

* [在Octopress中使用LaTeX](http://yanping.me/cn/blog/2012/03/10/octopress-with-latex/)
* [Hello MathJax](http://steshaw.org/blog/2012/02/09/hello-mathjax/)
* [blog写公式的例子](http://jakevdp.github.com/blog/2012/09/05/quantum-python/)

## 标签  

标签云主要使用[标签云的插件](https://github.com/tokkonopapa/octopress-tagcloud)。

在`_config.yml`的sidebar中加入`tag_cloud.html`，就标签出现在侧边栏中。

```
default_asides: [custom/asides/about.html, asides/recent_posts.html, custom/asides/tag_cloud.html, asides/github.html, asides/twitter.html, asides/delicious.html, asides/pinboard.html, asides/googleplus.html]

blog_index_asides: [custom/asides/about.html, asides/recent_posts.html, custom/asides/tag_cloud.html, asides/github.html, asides/twitter.html, asides/delicious.html, asides/pinboard.html, asides/googleplus.html]

post_asides: [custom/asides/about.html, asides/recent_posts.html, custom/asides/tag_cloud.html, asides/github.html, asides/twitter.html, asides/delicious.html, asides/pinboard.html, asides/googleplus.html]
```

## 拷贝本站

或者你也可以拷贝这个项目到你的github的pages的项目中，然后删除source/\_post下面的所有文章。修改部分配置即可。

* [本站的源代码](https://github.com/liuhongjiang/liuhongjiang.github.com)

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

## 预览

写了新文章以后可以进行预览，最简单的命令就是

```
rake preview
```

如果是在github的个人主页上的博客，那么使用`http://localhost:4000`既可以访问了，如果是项目主页那么就要用`http://localhost:4000/{project-name}/`访问。

还有一个预览方式，就是通过`jekyll`命令

对于个人主页，是使用下面命令，访问的网址`http://localhost:4000`

```
jekyll --server
```

对于项目主页，使用以下命令，访问的网址是`http://localhost:4000/{project-name}/`

```
jekyll --server --base-url /{project-name}/
```

## 博客样式

另外关于本博客的一些样式可以参考[博客的样式](/blog/2012/11/24/blog-styles/)

## 感谢
在本站的搭建过程中，参考了[http://yanping.me/cn/](http://yanping.me/cn/)。我阅读了他关于如何搭建的文章，也借鉴了他的很多样式。在此表示感谢。

## 好文章

[如何高效利用GitHub](http://www.yangzhiping.com/tech/github.html)


