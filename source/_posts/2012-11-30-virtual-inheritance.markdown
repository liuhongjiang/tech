---
layout: post
title: "虚继承"
date: 2012-11-30 15:13
comments: true
categories: C/C++
---

C++里面的virtual关键字可以用虚函数声明，也可以用于虚继承。上一篇博客讲到了[《虚函数》](/blog/2012/11/29/virtual-function/)，这篇博客就讲虚继承。

首先来看为什么需要虚继承。C++里面继承关系中有个很有名的继承结构，菱形继承，如下图所示

{% img center /images/blogimages/2012/virtualinheritance/iostream.jpg %}

普通继承，派生类包含了基类所有的非static成员。如果采用普通继承，在上图的iostream类中，实际上会存在两个ios基类。这样会带来很多问题，首先最简单的是空间浪费，iostream类中存在两个相同的ios类,然后是构造效率低，需要构造两个ios类。更严重的是调用基类中的函数时，存在二义性，当iostream调用ios的成员函数时，编译器无法知道是调用istream还是ostream中的ios。

C++的解决方案就是虚拟继承(Virtual Inheritance)。虚拟继承可以说成虚继承，在本文中，这两个词是等价的。 在虚拟继承下，只有一个共享的基类子对象被继承，而无论该基类在派生层次中出现多少次。共享的基类子对象被称为虚拟基类（virtual base class）。在虚拟继承下，基类子对象的复制及由此而引起的二义性都被消除了。

<!-- more -->

先看看如果没有续集继承的情况下，菱形继承会出现什么情况

{% include_code 普通继承的菱形继承 lang:cpp 2012/virtualinheritance/inheritance.cc %}

没有使用虚继承，那么`bottom`类在调用`printself()`就存在二义性，所以在编译的时候会报下面这样的错误。

{% img center /images/blogimages/2012/virtualinheritance/inheritance_error.jpg %}

下面就是使用虚继承的例子

{% include_code 虚继承的菱形继承 lang:cpp 2012/virtualinheritance/virtual_inheritance.cc %}

编译和运行结果如下

{% img center /images/blogimages/2012/virtualinheritance/virtual_inheritance.jpg %}

上面的例子中，采用了虚继承，就没有出现二义性的问题了。虚拟继承声明时，virtual关键字可以放在继承关系的前面也可以放在后面，下面两种方式是等价的。

``` cpp
class middle1: virtual public top
class middle1: public virtual top
```

## 虚拟基类的构造

由虚假继承引发的第一个问题是虚拟基类的构造，例如上面的例子中，构造iostream时，构造了istream和ostream两个基类，如果是虚继承关系，那么只有一个ios虚拟基类，那么谁来构造ios呢？

普通继承关系，基类由派生类构造。虚继承下，虚基类的构造由<em>最终派生类</em>显示调用，即iostream负责构造ios类, 中间类的构造函数将会被抑制，无法完成虚拟基类的构造。看一个虚基类的构造例子

{% include_code 中间类的构造函数被抑制 lang:cpp 2012/virtualinheritance/constructor.cc %}

运行结果如下

{% img center /images/blogimages/2012/virtualinheritance/constructor.jpg %}

例子中，虽然bottom显示调用了middle1和middle2的构造函数，但是top的构造却不是有这两个中间类完成的,  因为top的成员name的值为“top”，实际上是由最终派生类bottom调用了top的默认构造函数`top()`。

要想完成虚基类top的构造，必须由最终派生类调用对应的虚基类构造函数。

{% include_code 最终派生类调用虚基类的构造函数 lang:cpp 2012/virtualinheritance/constructor1.cc %}

运行结果如下

{% img center /images/blogimages/2012/virtualinheritance/constructor1.jpg %}

在上面的例子中，bottom和bottom1都显示调用了top的构造函数，但前者没有调用了中间类的默认构造函数，后者调用了构造虚基类的构造函数，但结果对于虚基类的构造，都是由最终派生类构造的。

上面是一个中间类构造函数定义方式的好例子，当middle1和middle2做为最终派生类的时候，那么使用带参数的构造函数，做为中间类时，就声明一个为protected的默认构造函数，它仅仅完成类自身的构造和非虚拟继承的基类构造，最终派生类也不需要显示地构造中间类。

## 构造的顺序

普通继承是按照声明顺序进行构造的，虚继承由于先要进行虚基类的构造，再进行中间类的构造，所以构造顺序是：按照声明顺序构造虚基类，再按照声明顺序构造中间类和普通基类。

先看两个虚基类构造的例子，

{% include_code top_b类不采用虚继承 lang:cpp 2012/virtualinheritance/constructor_seq.cc %}

输出结果

{% img center /images/blogimages/2012/virtualinheritance/constructor_seq.jpg %}

另外一个例子

{% include_code top_b类采用虚继承 lang:cpp 2012/virtualinheritance/constructor_seq1.cc %}

输出结果

{% img center /images/blogimages/2012/virtualinheritance/constructor_seq1.jpg %}

上面这个两个例子中可以看出top_b的构造顺序是不一样的。第一个例子中，做为普通基类，它放到了middle1和middle2后面构造，但在第二个例子中将它声明为了虚基类，它就放到了middle1和middle2前面构造了。


## 虚拟基类成员的可视性

派生类从它的基类所继承而来的成员可被分为以下三类：

* 虚拟基类实例，它们没有被中间类改写，可以直接调用。
* 存在一个中间类，改写了基类的成员，那么最终派生类，调用时使用的是被中间类改写了的成员。
* 存在二个或二个以上的中间类，重载了虚基类的成员，那么最终派生类，必须重载这个成员函数。  

下面这个例子分别都涉及到了上面三种情况

{% include_code 虚继承中成员的可见性 lang:cpp 2012/virtualinheritance/members.cc %}

输出结果

{% img center /images/blogimages/2012/virtualinheritance/members.jpg %}

由例子可以看出，上面三点分别对应了printA, printB, printC三个函数。如果不在bottom中重载printC，那么编译是会报错。


## 虚继承的实现原理

虚继承中，是如何实现只有虚基类的，通过虚继承类的内存分布，可以一探究竟。下面所有关于虚继承内存分布的例子都是和平台相关的:

* 64位系统
* 操作系统: ubuntu server 12.04
* gcc 4.6.3

首先看一个简单的只有一层虚继承关系的例子

{% include_code 一层虚继承 lang:cpp 2012/virtualinheritance/memory_middle1.cc %}

运行结果如下图

{% img center /images/blogimages/2012/virtualinheritance/memory_middle1.jpg %}

在`middle1`中有两个vtable，分布指向了各自的虚函数表，而且这两个虚函数表实际是放在一张表，只是分别指向表中不同的位置。vtable的起始地址之前的3个地址分布存放了与虚继承相关的信息。

* `offset(-3)`存放的是从middle1对象到虚基类top的偏移。 本例中middle1到top的偏移存放在`0x401620`为16个字节，top到自身的偏移存放在`0x401650`为0。
* `offset(-2)`存放的是当前这个对象到middle对象内存起始地址的偏移。 本例中middle1到自身的偏移存放在`0x401628`为0，top到middle起始位置的偏移`0x401658`为-16
* `offset(-1)`存放的是middle1类的typeinfo地址，本例中`0x401630`, `0x401660`都存放的地址`0x4016e0`。在下面本例memory_middle1的符号列表图中可以看出middle1类的typeinfo地址(图中的红色部分)。

<em style="color:red"> 以上信息也有人称为虚继承表，里面存放了虚继承的虚基类地址，在程序寻找虚基类的时候，就是从本表中获取偏移地址，然后找到虚基类的。内存中只有一个虚基类，无论有多个派生类，所有派生类到这个基类，都是通过偏移找到虚基类。</em>

如果派生类重载了虚基类的虚函数函数，在虚基类的虚函数对应的表现中，实际存放的是一个thunk地址（下图中的绿色部分）。例如本地中的重载的 `middle1::b()`，在地址`0x401670`存放的就是`virtual thunk for middle1::b()`。这个thunk仅调整this 指针并跳到`middle1::b()`, 所以当调用`top::b()`时，实际上就执行了`middle1::b()`。

在middle1的虚表结束的时候，放入了一个数值，这个数据与它的虚基类的offset(-2)存放的数字是一样的，都是表示虚基类到类对象内存的其实地址的偏移。而虚基类的虚表结束的地方，则存放的是0。

在虚表结束后，紧跟的是一张VTT表。VTT(Virtual Table Table)是一张记录虚表的表，图中黄色部分色部分标注出来的。它分布存放了middle1类所有的虚表起始地址。VTT表的地址也可以在memory_middle1的符号列表中找到(图中的黄色部分）

使用下面的这个命令可以参看符号列表

``` bash
nm -gC memory_middle1
```

部分输出结果的截图

{% img center /images/blogimages/2012/virtualinheritance/nm_memory_middle1.jpg %}

根据上面的程序分析可以画出middle1的内存结构图如下:

{% img center /images/blogimages/2012/virtualinheritance/memory_middle1_topo.jpg %}

下面是一个菱形结构继承的例子代码，有兴趣的读者可以下载以后，按照上面的方面分析。

{% include_code 菱形虚继承 lang:cpp 2012/virtualinheritance/memory_bottom.cc %}

这里仅仅画出内存的结构图如下

{% img center /images/blogimages/2012/virtualinheritance/memory_bottom_topo.jpg %}

在菱形虚继承的关系下，有下面几点需要注意：

* 在bottom类的内存中，middle2类是放在了top类后面，相对应的，在虚表和VTT表中，middle2都被放在了top类的后面。
* 计算到虚基类的内存偏移时，计算的是当前类和虚父类的偏移，例如图中，bottom的偏移是bottom到middle1的偏移，不是到top类的偏移。而且只记录了到middle1的偏移，没有到middle2的偏移，原因应该是在声明继承关系时，middle1在middle2之前。
* 计算到内存开始的偏移时，所有都是按照bottom的起始地址计算。所以两个偏移量不是对应的。


## 什么时候使用虚继承

这是否意味着，应该尽可能地以虚拟方式派生我们的基类，以便层次结构中后续的派生类可能会需要虚拟继承，是这样吗？不！我们强烈反对，那样做对性能的影响会很严重（而且增加了后续类派生的复杂性）。

那么，我们从不应该使用虚拟继承吗？不是，在实践中几乎所有成功使用虚拟继承的例子中，凡是需要虚拟继承的整个层次结构子树，如iostream 库或Panda 子树，都是由同一个人或项目设计组一次设计完成的。

一般地，除非虚拟继承为一个眼前的设计问题提供了解决方案，否则建议不要使用它。

## 参考

* 《C++ Primer》中文第三版， 第18章：多继承和虚拟继承.
* [GCC-3.4.6源代码学习笔记（142）](http://blog.csdn.net/wuhui_gdnt/article/details/6141405)
* 白杨.[RTTI、虚函数和虚基类的实现方式、开销分析及使用指导](http://baiy.cn/doc/cpp/inside_rtti.htm)

