---
layout: post
title: "linux命令行提示符配置"
date: 2013-01-16 09:29
comments: true
categories: linux 
math: 
abstract: 
---

linux下shell提示符可以任意配置的。

首先看看bash的配置文件，一般在用户的HOME目录下有这样几个文件[^1]：

* .bash\_history ：记录了您以前输入的命令，
* .bash\_logout ：当您退出 shell 时，要执行的命令，
* .bash\_profile ：当您登入 shell 时，要执行的命令，
* .bashrc ：每次打开新的 shell 时，要执行的命令。

这些文件是每一位用户的设置。系统级的设置存储在'/etc/profile'、'/etc/bashrc'及目录'/etc/profile.d'下的文件中。但您得习惯用各自的配置文件：编辑不需要'root'权限，还可以使您的设置更有个性。当系统级与用户级的设置发生冲突时，将采用用户的设置。

每次当您打开一个控制台(console)或 xterm 时，最先看到的就是提示符(prompt)，类似于：

{% sh :bash %}
account@hostname ~ $
{% endsh %}

在默认设置下，提示符将显示您的用户名、主机名（默认是'localhost'）、当前所在目录（在Unix中，'~'表示您的home目录）。
按照传统，最后一个字符可以标识您是普通用户（$），还是'root'（#）。
您可以通过 $PS1, $PS2 变量来设置提示符，$PS2是当在多行内输入一个命令时，换行后，出现的提示符。命令

<!-- more -->

{% sh :bash %}
andrew@ubuntu:~/lhj-github/tech$ echo $PS1
${debian_chroot:+($debian_chroot)}\u@\h:\w\$
andrew@ubuntu:~/lhj-github/tech$ echo $PS2
>
{% endsh %}

将显示当前的设定。其中可用字符的含义在 man bash 的'PROMPTING'部分有说明，PROMPTING部分的翻译

``` bash
提示符(PROMPTING)
    在 交互执行时， bash 在准备好读入一条命令时显示主提示符 PS1，在需要更多的输入来完成一条命令时显示 PS2。 Bash 允许通过插入一些反斜杠转义的特
    殊字符来定制这些提示字符串，这些字符被如下解释：
        \a     一个 ASCII 响铃字符 (07)
        \d     日期，格式是 "星期 月份 日" (例如，"Tue May 26")
        \D{format}
               format 被传递给 strftime(3)，结果被插入到提示字符串中；空的 format 将使用语言环境特定的时间格式。花括号是必需的
        \e     一个 ASCII 转义字符 (033)
        \h     主机名，第一个 ‘.’ 之前的部分
        \H     主机名
        \j     shell 当前管理的作业数量
        \l     shell 的终端设备名的基本部分
        \n     新行符
        \r     回车
        \s     shell 的名称， $0 的基本部分 (最后一个斜杠后面的部分)
        \t     当前时间，采用 24小时制的 HH:MM:SS 格式
        \T     当前时间，采用 12小时制的 HH:MM:SS 格式
        \@     当前时间，采用 12小时制上午/下午 (am/pm) 格式
        \A     当前时间，采用 24小时制上午/下午格式
        \u     当前用户的用户名 the username of the current user
        \v     bash 的版本 (例如，2.00)
        \V     bash 的发行编号，版本号加补丁级别 (例如，2.00.0)
        \w     当前工作目录
        \W     当前工作目录的基本部分
        \!     此命令的历史编号
        \#     此命令的命令编号
        \$     如果有效 UID 是 0，就是 #, 其他情况下是 $
        \nnn   对应八进制数 nnn 的字符
        \\     一个反斜杠
        \[     一个不可打印字符序列的开始，可以用于在提示符中嵌入终端控制序列
        \]     一个不可打印字符序列的结束

    命令编号和历史编号通常是不同的：历史编号是命令在历史列表中的位置，可能包含从历史文件中恢复的命令 (参见下面的 HISTORY 历史章节)，而命令编 号
    是 当 前 shell 会话中执行的命令序列中，命令的位置。字符串被解码之后，它将进行扩展，要经过 parameter expansion, command substitution, arith‐
    metic expansion 和 quote removal, 最后要经过 shell 选项 promptvars 处理 (参见下面的 shell 内建命令(SHELL BUILTIN COMMANDS) 章节中，对 命 令
    shopt 的描述)。
```

例如一个默认的`$PS1`设置如下：

{% sh :bash %}
andrew@ubuntu:~/lhj-github/tech$ echo $PS1
${debian_chroot:+($debian_chroot)}\u@\h:\w\$
{% endsh %}

前面这部分`${debian_chroot:+($debian_chroot)}`是ubuntu一种特殊的运行程序的方式，可以参考[^3][^4]，和我们要讲的内容没有什么关系。后面这部分`\u@\h:\w\$`就是shell prompting的配置了，可以根据上面的内容翻译出来。我现在的这个配置，显示出来就像这个样子了：

{% sh :bash %}
andrew@ubuntu:~/lhj-github/tech$
{% endsh %}

当然还可以配置颜色，首先来看ascii字符颜色表[^5][^6]：

|---
| 前景 | 背景 | 颜色 |
| - | - | - |
|30 | 40 |  黑色
|31 | 41 | 紅色
|32 | 42 | 綠色
|33 | 43 | 黃色
|34 | 44 | 藍色
|35 | 45 | 紫紅色
|36 | 46 | 青藍色
|37 | 47 | 白色
{: .mytable}

<br/>

|---
| 代码 |  意义
| - | - |
|0 | OFF
|1 | 高亮显示
|4 | underline
|5 | 闪烁
|7 | 反白显示
|8 | 不可见
{: .mytable}

然后就可以设置prompting的颜色了，最简单的方法是在HOME目录下的.bashrc文件添加以下配置（这种方法只会影响当前用户），
例如我现在的设置为

{% sh :bash %}
export PS1="\w\e[32m\$ \e[0m"
{% endsh %}

前面部分`\e[32m`是设置提示符的颜色，后面的`\e[0m`是恢复后面命令行输入输出的颜色，如果不用这个的话，所有的输入输出都会受到影响。

当然也可以配置一个多个属性的，只需要用分号隔开就可以了，这是一个例子:

{% sh :bash %}
export PS1="\w\e[32;40;4;1;7m\$ \e[0m"
{% endsh %}

我使用的是ubuntu server 64 12.04，shell用的是bash，在配置的过过程中，唯独只有闪烁功能好像没有起作用，如果有朋友解决了这个问题麻烦给我说一下。

在学习这个的过程中，我还找到了一篇关于提示符配置的[不错的博文](http://blog.sina.com.cn/s/blog_6d0cbb0301019egu.html)，大家也可以阅读一下。

[^1]: [linux shell简介(3)](http://blog.chinaunix.net/uid-13342902-id-2901676.html)
[^2]: <http://forum.ubuntu.org.cn/viewtopic.php?p=858115>
[^3]: <https://help.ubuntu.com/community/BasicChroot>
[^4]: <https://wiki.ubuntu.com/DebootstrapChroot>
[^5]: <http://bbs.chinaunix.net/forum.php?mod=viewthread&tid=54256>
[^6]: <http://www.chinaunix.net/old_jh/6/54256.html>
