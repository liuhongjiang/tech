---
layout: post
title: "博客的样式"
date: 2012-11-24 14:23
comments: true
categories: 
---

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

参考[kramdown关于表格的文档](http://kramdown.rubyforge.org/syntax.html#tables)，或者是[kramdown的快速参考中的表格介绍](http://kramdown.rubyforge.org/quickref.html#tables)。表格的样式也是在这个基础上修改的。    
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

```
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
