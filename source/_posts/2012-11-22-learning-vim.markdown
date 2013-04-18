---
layout: post
title: "读Vim手册笔记"
date: 2012-11-22 10:22
comments: true
categories: Vi 
---

## 书籍  
	《VIM用户手册》  
	作者: Bram Moolenaar  
	翻译: ZhaoRuFei<slimzhao@hotmail.com>  
	版本: 7.0  
{: .sh-bash}

## 笔记 
1. __要退出Vim, 用命令"ZZ". 该命令保存当前文件并退出Vim.__
2. 如果你在放弃所有修改后还想以该文件的初始内容作为开始继续编辑, 还可以用":e!"命令放弃所有修改并重新载入该文件的原始内容.

## 奇技淫巧

1. d^ 删除光标到行首第一个非空白字符之间的内容，可用于删除行首的空白 
2. gu/gU 大小写转化，gu小写，gU转为大写.      
    u/U： 选中区域，直接进行大小写转换
    gg gu G：整篇文章大写转化为小写。    
    gU0 ：从光标所在位置到行首变为大写    
    gU$ ：从光标所在位置到行尾变为大写    
3. [vundle 管理vim插件](http://www.cnblogs.com/respawn/archive/2012/08/21/2649483.html)
4. vim查看编译错误
    `:make`     进行编译，需要在makefile所在的目录下打开文件
    `:cw`       带开quickfix窗口
    cn          （next）下一条
    cp          (previous) 上一条
    cw          (显示warning)
    cc          显示错误
    col         前一个旧的错误 勘误表
    col         后一个旧的勘误表
    cnew        后一个较新的错误列表 ( :help :cnew )

