---
layout: post
title: "git reference"
date: 2015-05-09 14:35
comments: true
categories: git
math: 
abstract: 
---


## git ref

可以使用下面的命令查看ref

```bash
git show HEAD
```

## HEAD vs ORIG\_HEAD
HEAD is (direct or indirect, i.e. symbolic) reference to the current commit. It is a commit that you have checked in the working directory (unless you made some changes, or equivalent), and it is a commit on top of which "git commit" would make a new one. Usually HEAD is symbolic reference to some other named branch; this branch is currently checked out branch, or current branch. HEAD can also point directly to a commit; this state is called "detached HEAD", and can be understood as being on unnamed, anonymous branch.

**ORIG_HEAD is previous state of HEAD, set by commands that have possibly dangerous behavior, to be easy to revert them.** It is less useful now that Git has reflog: HEAD@{1} is roughly equivalent to ORIG\_HEAD (HEAD@{1} is always last value of HEAD, ORIG\_HEAD is last value of HEAD before dangerous operation).

"pull" or "merge" always leaves the original tip of the current branch in ORIG\_HEAD.

HEAD is a moving pointer. Sometimes it means the current branch, sometimes it doesn't.

<!-- more -->

So HEAD is NOT a synonym for "current branch" everywhere already.

HEAD means "current" everywhere in git, but it does not necessarily mean "current branch" (i.e. detached HEAD).

But it almost always means the "current commit".
It is the commit "git commit" builds on top of, and "git diff --cached" and "git status" compare against.
It means the current branch only in very limited contexts (exactly when we want a branch name to operate on --- resetting and growing the branch tip via commit/rebase/etc.).

http://stackoverflow.com/questions/964876/head-and-orig-head-in-git

## detached head

Detached head means you are no longer on a branch, you have checked out a single commit in the history (in this case the commit previous to HEAD, i.e. HEAD^).

[fix a git detached head](http://stackoverflow.com/questions/10228760/fix-a-git-detached-head)

创建一个detach head，关注命令的输出
 
```bash
$git checkout head^
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

git checkout -b new_branch_name

HEAD is now at 635b2b1... Init the test.md file
```

### specifying revision

比较常用的

* `<sha1>` 

    dae86e1950b1277e545cee180551750029cfe735 and dae86e both name the same commit object if there is no other object in your repository whose object name starts with dae86e.

* `<refname>`, e.g. master, heads/master, refs/heads/master

    If $GIT_DIR/<name> exists, that is what you mean (this is usually useful only for HEAD, FETCH_HEAD, ORIG_HEAD, MERGE_HEAD and CHERRY_PICK_HEAD);

* `<refname>@{<n>}`, e.g. master@{1}

    从refname的最新的提交倒数n个提交。
    `@{<n>}, e.g. @{1}`， 当前的branch

* `<refname>@{upstream}, e.g. master@{upstream}, @{u}`

    ref的远端最新提交

* `<rev>^, e.g. HEAD^, v1.5.1^0`

    A suffix `^` to a revision parameter means the first parent of that commit object. 

    `^<n>` means the `<n>th` parent, `<rev>^` is equivalent to `<rev>^1`.

    As a special rule, `<rev>^0` means the commit itself.

    注意`head^2`的意思是head的第二个parent，不是parent的parent

    `<rev>^^`的意思是第一个parent的第一个parent，等价于`<rev>^1^1`

* `<rev>~<n>, e.g. master~3`

    A suffix `~<n>` to a revision parameter means the commit object that is the <n>th generation grand-parent of the named commit object, following only the first parents.

    `<rev>~3` is equivalent to `<rev>^^^` which is equivalent to `<rev>^1^1^1`. 

    注意，这一句“following only the first parents.”，这种方式只会追踪第一个parent。具体可以参考下面这个例子。

Here is an illustration, by Jon Loeliger. Both commit nodes B and C are parents of commit node A. Parent commits are ordered left-to-right.

```
G   H   I   J
 \ /     \ /
  D   E   F
   \  |  / \
    \ | /   |
     \|/    |
      B     C
       \   /
        \ /
         A

A =      = A^0
B = A^   = A^1     = A~1
C = A^2  = A^2
D = A^^  = A^1^1   = A~2
E = B^2  = A^^2
F = B^3  = A^^3
G = A^^^ = A^1^1^1 = A~3
H = D^2  = B^^2    = A^^^2  = A~2^2
I = F^   = B^3^    = A^^3^
J = F^2  = B^3^2   = A^^3^2
```

以下是git的man page：
[specifying revisions](http://schacon.github.io/git/git-rev-parse#_specifying_revisions)
or 
[specifying revisions](http://git-scm.com/docs/git-rev-parse#_specifying_revisions)


