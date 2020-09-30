# Markdown (but worse)

I wanted to add some "features" to markdown so I put a bunch of regular expressions in a list and ran input from a textarea through that.

<!--# Documentation

## Text

### General

* any text below \\COLOR:color\\ will be that color
* any text below \\FONT:font\\ will be that font
* any text below \\SIZE:size\\ will be that size
* {f'font' any text in here will be font}
* {ssize any text in here will be of size size}
* {#color any text in here will be color}
* {bg:color any text in here will have a background color of color}
<br>
<br>
* You can add \[color] in front of any of the items below to change the color of the line
    * You can also add \[title] after any of the items below to add a title

* \_underline_
* \_\_double underline__
* .\_dotted underline_.
* ~\_wavy underline_~
* ^\_overline_^
* ^^\_double overline|^^
* ^~overline wavy~^
* ~.overline dotted.^
* \*-highlight-*

### General other

* {shadow'.2em .2em 0px grey' any text here will have a text shadow}
* {.'class' any text here will be in a span with the class of class}

### Align

* |->center<-|
* |->right|

---

## Arrows
* --->
<!--
* <---
* <-->
<!--
* ==>
* <==
* -=>
* <=|
* |=>
* |\v
* |\^

---

## Quotes

* ''fancy quote''
* \> ''block quote''\[author]

---

## Input types
* [. ] unchecked clickable checkbox
* \[.x] checked clickable checkbox
* ( ) radio unselected
* (*) radio selected
* \[=1 out 10=] a progress bar at 1 out of 10
* |=1 out 10=| a meter bar at 1 out of 10

---

## Custom Elements

* c-3d: makes the text have that stereotypical red blue 3d look
* c-rainbow: gives the text a rainbow background
* c-upsidedown: makes the text upsidedown
* c-circled: makes the text circled
* c-unicode: when given any string of numbers it will convert it to unicode
* c-choose: give an items attribute each item is seperated by |

---

## Media

* A!\[audio file] creates an audio tag-->