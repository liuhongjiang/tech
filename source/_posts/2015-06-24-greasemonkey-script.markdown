---
layout: post
title: "greasemonkey script"
date: 2015-06-24 09:34
comments: true
categories: javascript
math: 
abstract: 
---

没什么内容，慎看。

## how to write a Greasemonkey script
Greasemonkey是火狐下面的一个扩展应用，通过它安装一些用户自定义的脚本，这脚本可以在浏览器运行的时候，对网页进行实时的改变。在chrome上也有一个对应的插件Tampermonkey。
这个工具很强大，我们可以添加自己脚本，来年完成一些我们自己想要完成的功能。

下面用给一个例子来介绍写这个脚本相关的知识。

<!--more-->

## Metadata Block
我在chrome上使用的是Tampermonkey的插件。先创建一个新的脚本。新脚本的内容如下：

```javascript
// ==UserScript==
// @name         My Fancy New Userscript
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://www.webmonkey.com/2010/02/get_started_with_greasemonkey/
// @grant        none
// ==/UserScript==
```

这个部分就是脚本的metadata部分，关于各个字段的定义，可以参考这里
http://wiki.greasespot.net/Metadata_Block

下面是一些比较重要的字段的介绍

* @include和@exclude，这两个字段用于匹配脚本作用的url，如果没有定义@include，那么将会匹配所有的url。参考：http://wiki.greasespot.net/Include_and_exclude_rules。同时这两个字段还支持正则表达式的匹配。
* @match字段与@include字段类似的。在匹配`*`但它更为安全，对于匹配更加细致的规则，chrome先实现的是@match。参考https://developer.chrome.com/extensions/match_patterns
* @namespace和@name字段，可保证相同@namespace和@name下的不同版本的脚本，只有一个被安装。
* @run-at，用于控制脚本运行的时机，有两个可选值： document-end and document-start.
* @updateURL， 用于脚本的升级，如果版本更新，脚本会提示用户是否升级。
* @require，下载需要的脚本，在安装greasescript的时候，一起下载和安装。所以只会下载一次

## implement your code

在实现你的脚本的功能的时候，可以使用原生的js，也可以使用jquery等工具。使用@require关键字。参考[How can I use jQuery in Greasemonkey?](http://stackoverflow.com/questions/859024/how-can-i-use-jquery-in-greasemonkey)

可以参考以下的一些资料。
例如：
[Avoid Common Pitfalls in Greasemonkey](http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Pitfall_.231:_Auto-eval_Strings)
中提到的使用addEventListener。

```javascript
  var elmLink = document.getElementById('somelink');
  elmLink.addEventListener("click", my_func, true);
```

[Common Pitfalls](http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Avoid_Common_Pitfalls)


## 例子

[highlight text](http://userscripts-mirror.org/scripts/review/292083)

```javascript
// ==UserScript==
// @name          Text Highlighter
// @namespace     erosman
// @description   Highlights User-defined Text
// @updateURL     https://userscripts.org/scripts/source/292083.meta.js
// @downloadURL   https://userscripts.org/scripts/source/292083.user.js
// @exclude       *
// @grant         GM_registerMenuCommand
// @grant         GM_setValue
// @grant         GM_getValue
// @author        erosman
// @version       1.7
// ==/UserScript==

/* --------- Note ---------
  This script highlights User-defined case-insensitive Text on a page.

  It can run on any page but that adds unnecessary load to your computer.
  I have set it not to run on any page for now

  Go to Add-ons - User Scripts ('Ctrl+ Shift + a' on Firefox)
  Click on the Script's Option
  Under User Settings Tab, Add Included/Excluded Pages that you want the script to run on
  Click OK

  Setting Keywords & Highlight Style:
  Click on GreaseMonkey Icon
  User Scripts Commands...

      Set Keywords
      Input keywords separated by comma
      Example: word 1,word 2,word 3

      Set Highlight Style
      Input the Highlight Style (use proper CSS)
      Example: color: #f00; font-weight: bold; background-color: #ffe4b5;

  Note: If you find that another script clashes with this script, set Text Highlighter to Execute first.
  Go to Add-ons - User Scripts ('Ctrl+ Shift + a' on Firefox)
  Right Click on the Script
  On the context menu click: Execute first

  On Add-ons - User Scripts, you can also Click on the Execution Order (top Right) and
  change the execution order so that Text Highlighter runs before those scripts that clashes with it.


  --------- History ---------

  1.7 Changed script from matching whole words to do partial word match 
      similar to browser's FIND + escaped RegEx Quantifiers in keywords
  1.6 Code Improvement, using test()
  1.5 Code Improvement
  1.4 Code Improvement + Added support for non-English Words
  1.3 Code Improvement, 10x speed increase
  1.2 Added User Script Commands, script can now be auto-updated without losing User Data
  1.1 Total Code rewrite, Xpath pattern
  1.0 Initial release

*/


(function() { // anonymous function wrapper, used for error checking & limiting scope
    'use strict';

    if (window.self !== window.top) {
        return;
    } // end execution if in a frame

    // setting User Preferences
    function setUserPref(varName, defaultVal, menuText, promtText, sep) {

        GM_registerMenuCommand(menuText, function() {

            var val = prompt(promtText, GM_getValue(varName, defaultVal));
            if (val === null) {
                return;
            } // end execution if clicked CANCEL

            // prepare string of variables separated by the separator
            if (sep && val) {
                var pat1 = new RegExp('\\s*' + sep + '+\\s*', 'g'); // trim space/s around separator & trim repeated separator
                var pat2 = new RegExp('(?:^' + sep + '+|' + sep + '+$)', 'g'); // trim starting & trailing separator

                val = val.replace(pat1, sep).replace(pat2, '');
            }

            val = val.replace(/\s{2,}/g, ' ').trim(); // remove multiple spaces and trim
            GM_setValue(varName, val);
            location.reload(); // reload the page with the new changes
        });
    }

    // prepare UserPrefs
    setUserPref(
        'keywords',
        'word 1,word 2,word 3',
        'Set Keywords',
        'Set keywords separated by comma\t\t\t\t\t\t\t\r\n\r\nExample:\r\nword 1,word 2,word 3',
        ','
    );


    setUserPref(
        'highlightStyle',
        'color: #f00; background-color: #ffebcd;',
        'Set Highlight Style',
        'Set the Highlight Style (use proper CSS)\r\n\r\nExample:\r\ncolor: #f00; font-weight: bold; background-color: #ffe4b5;'
    );

    var highlightStyle = GM_getValue('highlightStyle');
    var keywords = GM_getValue('keywords');
    if (!keywords || !highlightStyle) {
        return;
    } // end execution if not found

    var rQuantifiers = /[-\/\\^$*+?.()|[\]{}]/g;
    var keywords = keywords.replace(rQuantifiers, '\\$&').split(',').join('|');
    var pat = new RegExp('(' + keywords + ')', 'gi');
    var span = document.createElement('span');

    // getting all text nodes with a few exceptions
    var snapElements = document.evaluate(
        './/text()[normalize-space() != "" ' +
        'and not(ancestor::style) ' +
        'and not(ancestor::script) ' +
        'and not(ancestor::textarea) ' +
        'and not(ancestor::code) ' +
        'and not(ancestor::pre)]',
        document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (!snapElements.snapshotItem(0)) {
        return;
    } // end execution if not found

    for (var i = 0, len = snapElements.snapshotLength; i < len; i++) {

        var node = snapElements.snapshotItem(i);

        // check if it contains the keywords
        if (pat.test(node.nodeValue)) {

            // create an element, replace the text node with an element
            var sp = span.cloneNode(true);
            sp.innerHTML = node.nodeValue.replace(pat, '<span style="' + highlightStyle + '">$1</span>');
            node.parentNode.replaceChild(sp, node);
        }
    }
})
```

highlight of a given text

```javascript
Well, you can definitely do this in Greasemonkey. As far as I know, Stylish is just a CSS manager, and can not do this. I made a Greasemonkey user script does a general highlight of a given text. The version below runs on YA, and highlights instances of "" in blue. :) You can obviously configure it to suit your needs. 

Also note there may be bugs. 

/* Copyright (C) 2007 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu> 

This program is free software; you can redistribute it and/or modify 
it under the terms of the GNU General Public License as published by 
the Free Software Foundation; either version 2 of the License, or 
(at your option) any later version. 

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
GNU General Public License for more details. 

You should have received a copy of the GNU General Public License along 
with this program; if not, write to the Free Software Foundation, Inc., 
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA. 

The GPL is also available at http://www.gnu.org/copyleft/gpl.html 
*/ 

var TEXT = ""; 
var COLOR = "blue"; 

var allText = document.evaluate( "//text()[contains(., '" + TEXT + "' )]", document, null, XPathResult. ORDERED_NODE_SNAPSHOT_TYPE , null); 

for (var i = 0; i < allText.snapshotLength; i++) {
    var cur = allText.snapshotItem(i);
    var par = cur.parentNode;
    var textInd;
    var curName = cur.nodeName;
    do {
        var curText = cur.nodeValue;
        GM_log("curText: " + curText);
        textInd = curText.indexOf(TEXT);
        if (textInd != -1) {
            var before = document.createTextNode(curText.substring(0, textInd));
            var highlight = document.createElement("span");
            highlight.class = "highlight";
            highlight.textContent = TEXT;
            highlight.style.color = COLOR;
            var after = document.createTextNode(curText.substring(textInd + TEXT.length));
            par.insertBefore(before, cur);
            par.insertBefore(highlight, cur);
            par.insertBefore(after, cur);
            par.removeChild(cur);
            cur = after;
        }
    } while (textInd != -1)
}

```

[linkify ting](http://userscripts-mirror.org/scripts/review/2254)

```javascript
// This script looks for any thing of the form
// [something not blank][a dot][something not blank], 
// then matches that which comes after the dot - and possibly before a slash - 
// with a list of know extensions, such as com, us, net etc. 
// If it has such an extension, it is turned into a link. 
// This way the script attempts to catch links like
// google.com and userscripts.org/tag/link.
// Because the script looks up extensions in a list, 
// you might want to alter the list (lovligeEndelser) to fit your needs. 
//
// The script is borrows a bit from the ÂLinkify PlusÂ script 
// (especially the parent not a | head | etc -  thing). And therefore the following 
//
//- - - 
//
// Loosely based on the Linkify script located at:
//   http://downloads.mozdev.org/greasemonkey/linkify.user.js
//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//
//- - -
//
// for my sake you may do what you want with the script, 
// but you should keep the notice by Anthony Lieuallen
//
// adam
//
// ==UserScript==
// @name          Linkify ting
// @namespace     http://ergosum.frac.dk/user/
// @description   Turn plain text links into real clikable links. Attempts to catch links like google.com
// @include       *
// @exclude       http://*.google.*/*
// ==/UserScript==
try {
    //dk|com|net|org|se|no|nl|us|uk|de|it|nu|edu|info

    var regex = /\b(http:\/\/|shttp:\/\/){0,1}(\w(\w|-)+\.)+(dk|com|net|org|se|no|nl|us|uk|de|it|nu|edu|info)(\/\w*)*(\.\w{2,4}){0,1}(\?\w*|#\w*|&\w*)*\b/gi;

    var altText, tekst, muligtLink;

    var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code']; //tags, hvor det der stÃ¥r inden i ikke skal vÃ¦re links
    var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") + ")]";

    altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < altText.snapshotLength; i++) {

        tekst = altText.snapshotItem(i);
        muligtLink = tekst.nodeValue;

        if (regex.test(muligtLink)) {

            //til at holde det nye link, og teksten omkring det
            var span = document.createElement('span');
            //tekst.parentNode.replaceChild(span, tekst);
            //alert("parent:" + span.parentNode);

            var lastLastIndex = 0;
            regex.lastIndex = 0;
            for (myArray = null; myArray = regex.exec(muligtLink);) {
                //vores match gemmes
                var link = myArray[0];

                //alert("har fundet dette link: " + link);

                span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //indsæt det der kommer før dette hit

                var href = link;

                //sætter http:// foran href, hvis der ikke er det
                var prefix = '';
                if (href.length > 7) {
                    prefix = href.substring(0, 7);
                }
                if (prefix.toLowerCase() != 'http://') {
                    href = 'http://' + href;
                }

                //skab vores link:
                var a = document.createElement('a');
                a.setAttribute('href', href); //giv det en href
                a.appendChild(document.createTextNode(link)); //linkteksten
                span.appendChild(a); //sætter ind i span

                lastLastIndex = regex.lastIndex;

            }

            span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //insæt det der kommer efter sidste hit
            tekst.parentNode.replaceChild(span, tekst);

        }


    }
} catch (e) {
    alert(e);
}

```

[linkify-plus](https://greasyfork.org/en/scripts/2709-linkify-plus/code)

```javascript
// ==UserScript==
// @name        Linkify Plus
// @version     2.1.4
// @namespace   http://arantius.com/misc/greasemonkey/
// @description Turn plain text URLs into links.  Supports http, https, ftp, email addresses.
// @include     http*
// @exclude     http://www.google.tld/search*
// @exclude     https://www.google.tld/search*
// @exclude     http://music.google.com/*
// @exclude     https://music.google.com/*
// @exclude     http://mail.google.com/*
// @exclude     https://mail.google.com/*
// @exclude     http://docs.google.com/*
// @exclude     https://docs.google.com/*
// @exclude     http://mxr.mozilla.org/*
// ==/UserScript==
//
// Copyright (c) 2011, Anthony Lieuallen
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice, 
//   this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright notice, 
//   this list of conditions and the following disclaimer in the documentation 
//   and/or other materials provided with the distribution.
// * Neither the name of Anthony Lieuallen nor the names of its contributors 
//   may be used to endorse or promote products derived from this software 
//   without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
// POSSIBILITY OF SUCH DAMAGE.
//

/*******************************************************************************
Loosely based on the Linkify script located at:
  http://downloads.mozdev.org/greasemonkey/linkify.user.js

Version history:
 Version 2.1.4 (Aug 12, 2012):
  - Bug fix for when (only some) nodes have been removed from the document.
 Version 2.1.3 (Oct 24, 2011):
  - More excludes.
 Version 2.1.2:
  - Some bug fixes.
 Version 2.1.1:
  - Ignore certain "highlighter" script containers.
 Version 2.1:
  - Rewrite the regular expression to be more readable.
  - Fix trailing "." characters.
 Version 2.0.3:
  - Fix infinite recursion on X(HT)ML pages.
 Version 2.0.2:
  - Limit @include, for greater site/plugin compatibility.
 Version 2.0.1:
  - Fix aberrant 'mailto:' where it does not belong.
 Version 2.0:
  - Apply incrementally, so the browser does not hang on large pages.
  - Continually apply to new content added to the page (i.e. AJAX).
 Version 1.1.4:
  - Basic "don't screw up xml pretty printing" exception case
 Version 1.1.3:
  - Include "+" in the username of email addresses.
 Version 1.1.2:
  - Include "." in the username of email addresses.
 Version 1.1:
  - Fixed a big that caused the first link in a piece of text to
    be skipped (i.e. not linkified).
*******************************************************************************/

var notInTags = [
    'a', 'code', 'head', 'noscript', 'option', 'script', 'style',
    'title', 'textarea'
];
var textNodeXpath =
    ".//text()[not(ancestor::" + notInTags.join(') and not(ancestor::') + ")]";
// Built based on:
//  - http://en.wikipedia.org/wiki/URI_scheme
//  - http://www.regular-expressions.info/regexbuddy/email.html
var urlRE = new RegExp(
    '('
    // leading scheme:// or "www."
    + '\\b([a-z][-a-z0-9+.]+://|www\\.)'
    // everything until non-URL character
    + '[^\\s\'"<>()]+' + '|'
    // email
    + '\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}\\b' + ')', 'gi');
var queue = [];

/******************************************************************************/

linkifyContainer(document.body);
document.body.addEventListener('DOMNodeInserted', function(event) {
    linkifyContainer(event.target);
}, false);

/******************************************************************************/

function linkifyContainer(container) {
    // Prevent infinite recursion, in case X(HT)ML documents with namespaces
    // break the XPath's attempt to do so.  (Don't evaluate spans we put our
    // classname into.)
    if (container.className && container.className.match(/\blinkifyplus\b/)) {
        return;
    }

    var xpathResult = document.evaluate(
        textNodeXpath, container, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var i = 0;

    function continuation() {
        var node = null,
            counter = 0;
        while (node = xpathResult.snapshotItem(i++)) {
            var parent = node.parentNode;
            if (!parent) continue;

            // Skip styled <pre> -- often highlighted by script.
            if ('PRE' == parent.tagName && parent.className) continue;

            linkifyTextNode(node);

            if (++counter > 50) {
                return setTimeout(continuation, 0);
            }
        }
    }
    setTimeout(continuation, 0);
}

function linkifyTextNode(node) {
    var i, l, m;
    var txt = node.textContent;
    var span = null;
    var p = 0;
    while (m = urlRE.exec(txt)) {
        if (null == span) {
            // Create a span to hold the new text with links in it.
            span = document.createElement('span');
            span.className = 'linkifyplus';
        }

        //get the link without trailing dots
        l = m[0].replace(/\.*$/, '');
        var lLen = l.length;
        //put in text up to the link
        span.appendChild(document.createTextNode(txt.substring(p, m.index)));
        //create a link and put it in the span
        a = document.createElement('a');
        a.className = 'linkifyplus';
        a.appendChild(document.createTextNode(l));
        if (l.indexOf(":/") < 0) {
            if (l.indexOf("@") > 0) {
                l = "mailto:" + l;
            } else {
                l = "http://" + l;
            }
        }
        a.setAttribute('href', l);
        span.appendChild(a);
        //track insertion point
        p = m.index + lLen;
    }
    if (span) {
        //take the text after the last link
        span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
        //replace the original text with the new span
        try {
            node.parentNode.replaceChild(span, node);
        } catch (e) {
            console.error(e);
            console.log(node);
        }
    }
}

```
