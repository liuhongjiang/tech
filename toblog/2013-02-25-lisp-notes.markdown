---
layout: post
title: "lisp笔记"
date: 2013-02-25 17:31
comments: true
categories: 
math: 
abstract: 
---

下面是在看《[ANSI common lisp](http://acl.readthedocs.org/en/latest/index.html)》这本书和做习题的时候的一些笔记。

## lisp

约翰麦卡锡和他的学生于 1958 年展开 Lisp 的初次实现工作。 Lisp 是继 FORTRAN 之后，仍在使用的最古老的程序语言。 更值得注意的是，它仍走在程序语言技术的最前面。懂 Lisp 的程序员会告诉你，有某种东西使 Lisp 与众不同。

Lisp 与众不同的部分原因是，它被设计成能够自己进化。你能用 Lisp 定义新的 Lisp 操作符。当新的抽象概念风行时（如面向对象程序设计），我们总是发现这些新概念在 Lisp 是最容易来实现的。Lisp 就像生物的 DNA 一样，这样的语言永远不会过时。

Lisp能够自己进化的特点，注定了它有很多方言存在(真的是方言，[英语里面用的是dialects](http://en.wikipedia.org/wiki/Lisp_%28programming_language%29))。
其中common lisp就是其中的一种方言。

下面几篇关于lisp的文章值得一读：

* 《[为什么Lisp语言如此先进](http://www.ruanyifeng.com/blog/2010/10/why_lisp_is_superior.html)》比较系统地介绍了lisp的特点，可以一读。        
* [用sbcl,asdf和cl-launch编写可分发的lisp程序](http://tianchunbinghe.blog.163.com/blog/static/7001200692314249376/)


### 默认参数

使用`&optional`设置函数默认参数

{% sh :lisp %}
(defun ha (&optional (x 1))
    (list x))
{% endsh %}

### &rest

函数的参数`&rest`关键字，返回的是一个列表，里面的元素为空，用null测试，返回nil

{% sh :lisp %}
[3]> (defun bb1 (&rest args) (null args))
BB1
[4]> (bb1 nil)
NIL
{% endsh %}

### append and push

`append` 会返回一个新的list，所以如果要往一个已有list中加元素，使用`push`

`push`的第二参数必须是变量

### let

在let语句中，如果有多个赋值语句，后面的赋值语句不能应用前面赋值语句中的变量，例如下面就是有问题的

``` lisp
(defun quarter-turn (arr)
    (let ((dim1 (array-dimensions arr))
          (barr (make-array dim1))) 
        (do ((i 0 (+ i 1)))
            ((= i (car dim)))
            (do ((j 0 (+ j 1)))
                ((= j (car dim)))
                (setf (aref barr i j) (aref arr j i))))
        barr))
```
当中的`(barr (make-array dim1))`会报错。

如果希望有上面的功能，就要使用`let*`

{% sh :lisp %}
> (let* ((x 1)
         (y (+ x 1)))
    (+ x y))
3
{% endsh %}

### prog系列

`prog`系列有`prog prog* prog1 prog2 progn`。他们都处理一个代码块。`progn`为“Built-in Method Combination Types”，其余的为宏。

`prog1 prog2 progn`的区别是使用不同的语句的返回值作为代码块的返回值，分别对应第一条语句的返回值，第二条语句的返回值和最后一条语句的返回值。

`prog prog*` 与上面三个是不一样的，带有初始化语句，且使用return语句的返回值。`prog*`中，初始化语句按照顺序初始化，所有一个语句可以使用前面一个语句中的变量，而`prog`则不能这样。如果没有return语句，程序返回nil。

