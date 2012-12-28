---
layout: post
title: "博客的样式"
date: 2012-11-24 14:23
comments: true
categories: octopress
abstract: "本文就介绍了这个blog搭建过程中，一些样式如何设置的。包括：引用块的样式，表格的样式，首行缩进，添加豆瓣侧边栏, 文章摘要。"
---

使用的markdown解析工具为kramdown。  

<!-- more -->

## 引用块

引用块的样式借用了[kramdown语法文档](http://kramdown.rubyforge.org/syntax.html#link-definitions)中的样式。

在`/sass/custom/_style.scss`中添加样式定义

``` css  
/* 引用 */
#content blockquote.information {
  border-left: 12px solid #080;
  background-color: #bfb;
  padding: 12px 12px 12px 0;
  margin-left: -48px;
  padding-left: 48px; 
}
```

然后在markdown文件中的写法如下

``` plain  
> This is a blockquote. 
> 这是一个引用块。   
{: .information}
```

就会显示成这个样子

> This is a blockquote.   
> 这是一个引用块。
{: .information}

## 表格

参考[kramdown关于表格的参考手册](http://kramdown.rubyforge.org/syntax.html#tables)，或者是[kramdown关于表格的快速参考手册](http://kramdown.rubyforge.org/quickref.html#tables)。下面表格的样式也是在这个基础上修改的。    
首先看一下表格样式的定义，在`/sass/custom/_styles.scss`中定义样式

```  css 
/* 表格 */
#content table.mytable {
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  /*border: solid 1px black;*/
 /* width: 100%; */
}
#content table.mytable td, #content table.mytable th {
    padding: 3px 5px; 
    border: solid 1px #070;
}
#content table.mytable th {
    background-color: #080;
    color: white; 
}
```

然后可以用以下代码显示表格

``` plain
| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=====
| Foot1   | Foot2   | Foot3
{: .mytable}
```

显示的表格为

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=====
| Foot1   | Foot2   | Foot3
{: .mytable}

<br/>

kramdown参考文档中的其它几个例子

```
|-----------------+------------+-----------------+----------------|
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            |
|-----------------+------------+-----------------+----------------|
| Second body     |            |                 |                |
| 2 line          |            |                 |                |
|=================+============+=================+================|
| Footer row      |            |                 |                |
|-----------------+------------+-----------------+----------------|
{: .mytable}
```

注意里面的对齐方式的定义（代码的第三行），还有第7,10行中关于表格分块的定义，显示

|-----------------+------------+-----------------+----------------|
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            |
|-----------------+------------+-----------------+----------------|
| Second body     |            |                 |                |
| 2 line          |            |                 |                |
|=================+============+=================+================|
| Footer row      |            |                 |                |
|-----------------+------------+-----------------+----------------|
{: .mytable}

当然也有屌丝专用的丑陋，但简单的方式，与上面的表格一样

```
|---
| Default aligned | Left aligned | Center aligned | Right aligned
|-|:-|:-:|-:
| First body part | Second cell | Third cell | fourth cell
| Second line |foo | **strong** | baz
| Third line |quux | baz | bar
|---
| Second body
| 2 line
|===
| Footer row
{: .mytable}
```

最后的显示的表格与上面是一样的。

|---
| Default aligned | Left aligned | Center aligned | Right aligned
|-|:-|:-:|-:
| First body part | Second cell | Third cell | fourth cell
| Second line |foo | **strong** | baz
| Third line |quux | baz | bar
|---
| Second body
| 2 line
|===
| Footer row
{: .mytable}

当然还可以有没有那么复杂的直接上最简单的表格的方式

```
| First cell|Second cell|Third cell
| First | Second | Third |
First | Second | | Fourth |
{: .mytable}
```

显示为

| First cell|Second cell|Third cell
| First | Second | Third |
First | Second | | Fourth |
{: .mytable}

<br/>

## 首行缩进

blog的样式中是没有缩进的，这样多少还是有点难看。加入的方法如下，在`/sass/custom/_styles.scss`中加入如下代码

``` css
#content .entry-content > p {
	text-indent: 2em;
}
```

然后就有了现在的缩进样式。需要注意，在markdown文件中，如果在一行的后面加入空格来换行的话，生成的html文件中，是用\<br/\>来换行的，不是用\<p\>换行，就没有缩进的样式了。正确的方法是在两行文字之间插入空行。

但后来发现一个问题，在一行里面加入的代码块也有了缩进的样式, 就像这样子<code style="text-indent:2em">这里有了缩进</code>, 我用了比较土的方法解决，还是在上面的custom/_styles.scss中加入

``` css
#content .entry-content > p > code {
	text-indent: 0em;
}
```

这种解决办法不是很好，因为总有可能导致其它标签里面意外出现缩进，但我也不熟悉css，只有先这么办了，先解决眼前的问题。

## 添加豆瓣的侧边栏

[豆瓣收藏秀](http://www.douban.com/service/badgemakerjs)可以为你的博客生成一个侧边栏，放入到你的博客中。访问这个网址[http://www.douban.com/service/badgemakerjs]()，可以生成一段js代码，然后讲这段代码嵌入到侧边栏的html中即可。

具体的做法，显示在收藏秀的页面里面选择好需要显示的内容，例如：我选择了，我想看的、书、每次随机选择、共显示9个 每行3个、图片小，下面两个选择隐藏，然后生成了这样的JS代码

``` js
<script type="text/javascript" src="http://www.douban.com/service/badge/63148093/?show=wishlist&amp;select=random&amp;n=9&amp;columns=3&amp;hidelogo=yes&amp;hideself=yes&amp;cat=book" ></script> 
```

然后创建文件`/source/_includes/custom/asides/douban-wishreading.html`, 在这个html文件中加入如下代码

{% include_code 豆瓣想读的书 lang:html 2012/blog_style/douban-wishreading.html %}

其中第5行为豆瓣收藏秀生成的JS代码，其它的样式代码为blog的样式, 用于不同的blog可能需要修改。然后需要在`_config.yml`里修改配置，在`default_asides`中加入`custom/asides/douban-wishreading.html`，就像这样

``` yml
default_asides: [asides/recent_posts.html, custom/asides/douban-reading.html, custom/asides/douban-wishreading.html, asides/github.html, asides/twitter.html, asides/delicious.html, asides/pinboard.html, asides/googleplus.html]
```

最后展现的样子可以参考[猪猫的生活](http://liuhongjiang.github.com/life/)。

## 文章摘要

当文章比较长的时候，如果在文章的前面有一个摘要，就会方便很多。下面就就是一个添加摘要的简单方法。

首先在文章的markdown文件中添加一个变量`abstract`如下

```
---
layout: post
title: "博客的样式"
date: 2012-11-24 14:23
comments: true
categories: octopress
abstract: "本文就介绍了这个blog搭建过程中，一些样式如何设置的。包括：引用块的样式，表格的样式，首行缩进，添加豆瓣侧边栏, 文章摘要。"
---
```

然后修改`source/_include/article.html`

{% include_code 修改article.html lang:diff 2012/blog_style/article.diff %} 

之后修改样式文件`sass/custom/_styles.scss`, 添加如下的样式

``` css
.abstract, .warning{
border:none;
padding:0.6em 1.25em 0.6em 1.25em;
    margin-top:0.25em;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
    -box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
}

.abstract{
    background:#d5e9f6;
}
```

就可以显示和本文开始一样的摘要了。

