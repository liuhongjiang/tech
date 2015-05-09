---
layout: post
title: "git commit message convention"
date: 2015-04-30 08:58
comments: true
categories: git 
math: 
abstract: 
---

I collect all information for internet, I did not write a single word.

A well-crafted git commit message is the best way to communicate context about a change to fellow developers (and indeed to their future selves)

## examples
example of commit messages:

    Capitalized, short (50 chars or less) summary

    More detailed explanatory text, if necessary.  Wrap it to about 72
    characters or so.  In some contexts, the first line is treated as the
    subject of an email and the rest of the text as the body.  The blank
    line separating the summary from the body is critical (unless you omit
    the body entirely); tools like rebase can get confused if you run the 
    two together.
       
    - Bullet points are okay, too
    - Typically a hyphen or asterisk is used for the bullet, followed by a
      single space, with blank lines in between, but conventions vary here
    - Use a hanging indent

<!-- more -->
Another one:

    Summarize changes in around 50 characters or less

    More detailed explanatory text, if necessary. Wrap it to about 72
    characters or so. In some contexts, the first line is treated as the
    subject of the commit and the rest of the text as the body. The
    blank line separating the summary from the body is critical (unless
    you omit the body entirely); various tools like `log`, `shortlog`
    and `rebase` can get confused if you run the two together.

    Explain the problem that this commit is solving. Focus on why you
    are making this change as opposed to how (the code explains that).
    Are there side effects or other unintuitive consequenses of this
    change? Here's the place to explain them.

    Further paragraphs come after blank lines.

    - Bullet points are okay, too

    - Typically a hyphen or asterisk is used for the bullet, preceded
      by a single space, with blank lines in between, but conventions
      vary here

    If you use an issue tracker, put references to them at the bottom,
    like this:

    Resolves: #123
    See also: #456, #789
    
## subject
* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the imperative mood in the subject line: "Fix bug" and not "Fixed bug" or "Fixes bug."
* The subject should be a concise summary of the changes introduced by the commit

## body
* Wrap the body at 72 characters
* Use the body to explain what and why vs. how
* Try to answer the following questions in your commit message
    * Why is this change necessary?
    * How does it address the issue?
    * What side effects does this change have?

## others
* Never use the `-m <msg>` or `--message=<msg>` flag to git commit
* The Linux kernel and git itself are great examples


## reference
These are the article I got above good practice of git commit messages. Read it carefully.

* [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
* [5 Useful Tips For A Better Commit Message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message)
* [How to Write a Git Commit Message](http://chris.beams.io/posts/git-commit/)
* [real stickler for a good commit message, Linus Torvalds](https://github.com/torvalds/linux/pull/17#issuecomment-5659933)
* [Shiny new commit styles](https://github.com/blog/926-shiny-new-commit-styles)

## git commit message line wrapping in IDEA
[git commit message line wrapping](https://youtrack.jetbrains.com/issue/IDEA-53615#comment=27-446912)

if you turn on the line margin in the commit dialog in the Setting \| Version Control, commit dialog text area becomes monospaced. 
Moreover, if you turn on "Wrap when typing reaches right margin" in Settings \| Code style \| General, it will affect the commit dialog text area as well (however, it will affect the main editor too).

A separate setting to wrap when text reaches right margin has been added to Settings \| Version Control.


