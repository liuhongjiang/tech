---
layout: post
title: "Pegasos算法"
date: 2013-01-31 11:49
comments: true
categories: Machine&nbsp;Learning
math: true 
abstract: 本文介绍了svm的一种online learning算法pegasos，并基于pegasoso算法实现了一个数字手写识别脚本。
---


本文参考了博文[Online Learning in Clojure](http://mark.reid.name/sap/online-learning-in-clojure.html)和论文[Pegasos: Primal Estimated sub-GrAdient SOlver for SVM](http://www.machinelearning.org/proceedings/icml2007/abstracts/587.htm)([PDF](http://www.machinelearning.org/proceedings/icml2007/papers/587.pdf))

## online learning

Online learning的算法结构是非常简单的，下面的描述是监督的online learning算法框架，其中有经验损失函数$L$，样本流$S$，样本的格式为$(x,y)$:

    Initialise a starting model w
    While there are more examples in S
        Get the next feature vector x
        Predict the label y' for x using the model w
        Get the true label y for x and incur a penaly L(y,y')
        Update the model w if y ≠ y'

一般来是，训练出来的模型都是一个与样本相同维度的向量。对应二分的分类器，往往涉及到的是计算内积$\langle w,x \rangle$，模型的更新是沿着损失函数的梯度下降方向的。

## Pegasos

论文[Pegasos: Primal Estimated sub-GrAdient SOlver for SVM](http://www.machinelearning.org/proceedings/icml2007/abstracts/587.htm)是一种svm的online learning算法。

<!-- more -->

首先来看svm的经验合页损失函数：

$$
\begin{array}{l}
L(w,S) = \frac{\lambda }{2}{\left\| w \right\|^2} + \frac{1}{k}\sum\limits_{(x,y) \in S} {h(w;(x,y))} \\
h(w;(x,y)) = \max \{ 0,1 - y \langle w,x \rangle \} 
\end{array}
$$

上面式子中，$k$是训练集$S$的大小，$h()$是the hinge loss（合页损失函数），$\langle w, x\rangle$表示$w,x$的内积，$\lambda$是正则化项。

在[《统计学习方法》](http://book.douban.com/subject/10590856/)这本书的7.2.4证明了合页损失函数与引入松弛变量后的损失函数是等价的，并证明了$\lambda\$与惩罚系数$C$是成反比的。引入松弛变量后的损失函数为:

$$
\frac{1}{2}\left \| w \right \|^{2} + C\sum_{i=1}^{N}\xi _{i}
$$

训练过程中，如果遇到了一个预测错误的样本$(x,y)$, 对模型的更新方法如下：

$$
{w_{t + \frac{1}{2}}} = (1 - \frac{1}{t}){w_t} + \frac{1} { {\lambda t} } yx
$$

其中$t$表示已经训练过的样本个数，$ {w\_{t + \frac{1}{2}}}$表示训练过$t$个的样本后的模型，${w\_{t + \frac{1}{2} }}$ 表示新模型。
根据pegasos算法，新模型的$l\_2$范数如果超出了以 $\frac{1}{ {\sqrt \lambda  } }$ 为半径的超球面，那么需要将新模型投射到这个超球面上。即：

$$
{w_{t + 1}} = \min \{ 1,\frac{1}{ {\sqrt \lambda  \left\| { {w_{t + \frac{1}{2} } } } \right\|}}\} {w_{t + \frac{1}{2}}}
$$

为什么需要讲新的模型投射到以$\frac{1}{ {\sqrt \lambda  } }$为半径的超球面上呢？论文证明了svm的最优解是在下面这个集合中的：

$$
B = \{ w:\left\| w \right\| \le \frac{1}{ {\sqrt \lambda  } }\} 
$$

而且在pegasos算法的推导，以及模型初始化$w$的时候，都使用了条件

$$
\left\| w \right\| \le \frac{1}{ {\sqrt \lambda  } }
$$

由上面模型的更新公式可以简单分析一下正则化参数$\lambda$的作用，它决定了训练过程中，后面出现的预测错误的样本，对应模型的修正程度。$\lambda$越大，修正程度越小，$\lambda$越小，修正程度越大。同时$\lambda$与惩罚系数$C$是成反比的，所以也可理解为，在训练过称中，出现预测错误样本时，对模型的惩罚程度。$\lambda$越大，惩罚越小，$\lambda$越小，惩罚越大。

Pegasos的算法描述在论文"Pegasos: Primal Estimated sub-GrAdient SOlver for SVM"也是给出了的，可以参考。

但实际上pegasos是一个线性的svm，而且还是一个没有bias的svm，训练出来的线性函数是$y=\langle w,x \rangle$，在上面的论文中的Extensions小节中也讲到了，目前pegasos还没有证明可应用于线性模型$y=\langle w,x \rangle + b$或者是非线性svm模型。


## Pegasos的实现例子

前面的博客[基于SVM的手写数字识别](http://liuhongjiang.github.com/tech/blog/2012/12/29/svm-ocr/)，实现了一个基于SMO算法的svm，今天就来基于Pegasos实现数字手写识别。svm用于多分类，还是一对多的方式，手写数据还是来自["Machine Learning in Action"](http://www.manning.com/pharrington/)的第二章的数据。下面是实现代码

{% include_code 基于pegasos的数字手写识别 lang:python 2013/pegasos/pegasos.py %}

训练出来的模型测试结果如下：

{% sh :bash %}
right= 849
wrong= 46
can_not_classify= 72
total= 946
{% endsh %}

一共有946个测试样本，其中46个分类错误，72个没有找到分类，849个正确分类，正确分类率89.7%。$\lambda$取值为0.5。我也没有仔细调整$\lambda$的取值，不过看来结果还是慢不错的。但比起SMO算法实现的svm效果要差一些。但是pegasos的优势是快啊，同样的1934个训练样本，基于SMO的svm，花了3、4个小时训练，而pegasos算法只用了30多秒，逆天了。

