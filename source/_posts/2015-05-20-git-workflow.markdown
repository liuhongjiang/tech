---
layout: post
title: "git workflow"
date: 2015-05-20 14:49
comments: true
categories: git
math: 
abstract: 
---



参考了网上的多篇文章，然后结合现在自己参与的项目，总结了一个关于项目的git workflow的流程。
基本上是参考了gitflow的这篇文章。[A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)。

重点是下面这一张图片。

{% img center http://nvie.com/img/git-model@2x.png %}

## 名词

以上图片中的各个分支的解释。

* master分支

    master分支保存了最新的发布代码，是稳定分支。永久保存。

* develop分支

    保存了最新的下一个版本要发布的feature和bugfix的代码，是稳定分支，但是可以运行在一定时间内不稳定。永久保存。

    在没有创建release分支的时候，可以提交bugfix的代码（bug的fix version填写下一个版本的版本号）。一但创建了release分支，那么只能提交下一个版本的feature和bugfix代码。

<!-- more -->

* release分支

    在develop分支的上创建。它是当前要发布的版本的分支，只允许提交bugfix（bug的fix version填写当前版本和下一个版本），原则上不运行提交feature代码。完成测试以后，合并到master分支和develop分支。

    创建release分支后，当前版本要修复的bug，只需要提交到release分支。当release分支发布的时候，合并到master分支和develop分支后，在master分支上打上release的tag，删除release分支。

    命名规则：release/{version name} (version name是项目内部定义的项目名称，可以是版本号，例如v1.2.3，可以是发布日志rb_2015.03.19)

* feature分支

    新功能开发分支，从develop分支上创建，合并到develop分支。完成feature开发后，删除feature分支。

    命名规则：feature/xxxxxx (xxxxx为新特性描述，建议不要太长了, 例如add sticker)

* bug分支

    当没有release分支的时候，基于develop分支创建，合并到develop分支。删除bug分支。这时的fix version填下一个版本。

    当创建了release分支后：如果bug是需要在当前release版本的：基于release分支创建，合并到release分支中去。这时的fix version填当前版本和下一个版本。

    如果是下一个版本发布的：基于develop分支创建，合并到develop分支。这时的fix version填下一个版本。

    命名规则：bug/{issue-number}-xxxx ({issue-number}部分为issue号，例如MyProject-3555， xxxx部分为简单的说明，也可以省略，例如MyProject-3555-fix-deadlock)

* hotfix

    hotfix是当某一个版本发布到了真实环境中以后，发现了严重的bug，必要紧急修复的情况下，出现的版本。

    hotfix版本基于master分支上对应的release tag创建，合并到master分支和develop分支。如果hotfix的修复发布的时候，存在release分支，那么hotfix需要合并到release分支，而不是develop分支。

    hotfix分支合并以后，需要删除hotfix分支。


* maintenance分支

    由于在生产环境中，只有一个版本，所以不需要保留maintenance分支。

    如果生产环境中，有多个长期的维护版本，那么就需要保留这些版本对应的maintenance分支（有使用maint作为分支前缀）。当有bug在对应的维护分支上有bug的时候，需要基于这个维护分支创建bugfix分支， 完成修复后，需要将这个bugfix分支在合并回这个维护分支。

    如果其他对应维护分支也有同样的问题话，需要将这个bugfix的分支合并到那些对应的维护分支上去。并且如果在master和development分支上存在着相同的bug，也要将这个bugfix合并到master，development，如果还有release分支，也要合并到当前的release分支。

* release tag
    发布了release分支以后，将release合并到master分支，打上release tag，现在的命名规则：TC_2015.05.09.

## 开发人员需要关注的

平时开发feature的时候，从develop分支上拉feature分支，提pull request的时候，也是合并到develop中，feature命名的规则：命名规则：feature/xxxxxx (xxxxx为新特性描述，建议不要超过4个单词)

修复bug的时候，如果没有release分支，那么从develop上拉bug分支，合并到develop分支上。这时的fix version填下一个版本。

如果有release分支，那么从release分支上拉bug分支，合并到bug分支上。这时的fix version填当前版本和下一个版本。

如果有release分支，但是这个bug是下一个版本修复，那么就从从develop上拉bug分支，合并到develop分支上。这时的fix version填下一个版本。

bug分支的命名规则：bug/{issue-number}-xxxx ({issue-number}部分为issue号，例如MyProject-3555， xxxx部分为简单的说明，一两个单词就可以了，也可以省略)

## CI

CI需要在develop和release两个分支上构建。

## 其他

在合并分支时，如果希望保留合并的信息，建议使用`git merge --no-ff`, 不适用fast forward.

在发起pull request的时候，为了减少项目合并的管理者的负担，并且保证当前需要合并的分支，有一个比较干净的提交记录，使用`git rebase -i`

## 参考

[A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
[Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
[Distributed Git - Distributed Workflows](http://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows)
[Distributed Git - Maintaining a Project](http://git-scm.com/book/en/v2/Distributed-Git-Maintaining-a-Project)

## gitflow 工具

[gitflow](https://github.com/nvie/gitflow)
[hubflow](https://datasift.github.io/gitflow/TheHubFlowTools.html)
[git-flow cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/)
