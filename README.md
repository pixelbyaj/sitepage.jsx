# sitepage.jsx

> Create beautiful full page scrolling website using reactJS

[![License](https://img.shields.io/badge/License-GPL-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![sitePage.jsx version](https://img.shields.io/npm/v/sitepage.jsx/latest)](https://www.npmjs.com/package/sitepage.jsx)
[![Known Vulnerabilities](https://snyk.io/test/github/pixelbyaj/sitePage.jsx/badge.svg?targetFile=package.json)](https://snyk.io/test/github/pixelbyaj/sitePage.jsx?targetFile=package.json)
[![npm](https://img.shields.io/npm/dt/sitepage.jsx.svg)](https://www.npmjs.com/package/sitepage.jsx)
[![PayPal Donate](https://img.shields.io/badge/donate-PayPal.me-ff69b4.svg)](https://www.paypal.me/pixelbyaj)

A simple and easy to use library that creates single page scrolling websites with horizontal or vertical scrolling.
- [DEMO](https://www.pixelbyaj.com/sitepage.jsx/)
- [StackBlitz](https://stackblitz.com/edit/sitepagejsx)
- [Introduction](https://github.com/pixelbyaj/sitepage.jsx#introduction)
- [Compatibility](https://github.com/pixelbyaj/sitepage.jsx#compatibility)
- [License](https://github.com/pixelbyaj/sitepage.jsx#license)
- [Usage](https://github.com/pixelbyaj/sitepage.jsx#usage)
- [Options](https://github.com/pixelbyaj/sitepage.jsx#options)
- [Reporting issues](https://github.com/pixelbyaj/sitepage.jsx#reporting-issues)
- [Contributing to sitepage](https://github.com/pixelbyaj/sitepage.jsx#contributing-to-sitepagejs)
- [Changelog](https://github.com/pixelbyaj/sitepage.jsx#changelog)
- [Resources](https://github.com/pixelbyaj/sitepage.jsx#resources)
- [Donations](https://github.com/pixelbyaj/sitepage.jsx#donations)

## Introduction
Suggestion are more than welcome, not only for feature requests but also for coding style improvements.
Let's make this a great library to make people's lives easier!

## Compatibility
sitepage is fully functional on all modern browsers, as well as some old ones such as Internet Explorer 9, Opera 12, etc.
It works with browsers with CSS3 support and with the ones which don't have it, making it ideal for old browsers compatibility.
It also provides touch support for mobile phones, tablets and touch screen computers.

## License

### Open source license
If you are creating an open source application under a license compatible with the [GPL](https://www.gnu.org/licenses/gpl-3.0.en.html), you may use sitePage under the terms of the GPL © [pixelbyaj](https://github.com/pixelbyaj)


## Prerequisites:

### Bootstrap CSS
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
```
## Install
```bash
npm install --save sitepage.jsx
```

## Usage

```tsx
import React, { Component } from 'react'

import SitePage from 'sitepage.jsx'
import 'node_module/dist/sitepage.css'

const sitePageModel={
        //brandname
        brandName: "",
        brandLogoUrl:"",//
        backgroundColor:"#45b4f5",
        verticalAlignMiddle: true, // By default it would be true
        //sections
        sections: [{
                anchor: "Home",
                components: [{
                  component: YourComponentName,
                  name: "ComponentKey",//It has to unique
                  props: {
                    "message": "Hello" //string:string
                  }
                }],
                backgroundColor: "#45b4f5",
              },
              {
                  anchor: "Features",
                  templateId: "feature",
                  backgroundColor: "#fc6c7c"
              },
              {
                  anchor: "Contact Us",
                  template: "<h1>Contact Us</h1>",
                  backgroundColor: "#1bbc9b"
              }
        ],
        //navigation
	    anchors:true,//true|false
        navigation: 'horizontal',//horizontal|vertical
        sameurl: true,//true|false
        hamburger:true,//true|{lineColor:"",backgroundColor:"",closeOnNavigation:true}
        //transition
        easing: "ease",//ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)
        transitionSpeed: 1000,//speed in ms
        //scrolling
        autoScrolling: true,//true|false
        keyboardNavigation: true,//true|false
    }
class Example extends Component {
  render() {
    return <SitePage id="sitepage" model={sitePageModel} />
  }
}
```

### Options
#### General

* brandName: Logo Title of the website.**This Option is optional**
```javascript
 brandName: "Logo Title",
```
* backgroundColor: background color of the website. **This Option is optional** If you don't want to give background color for every section you can mention backgroundColor.
```javascript
 backgroundColor: "#ffffff",
```
* verticalAlignMiddle: By Default it is true and apply to all the sections. It will align the content vertically.
```javascript
 verticalAlignMiddle: false,
```
#### Navigation
* anchors: Set true|false. If you require a menu set it as a true (By defaul it is true) and if not require set it as false.
* sameurl: Set true|false. While navigating the url will change
        navigation: 'vertical',//horizontal|vertical
        hamburger: {
            lineColor: "",//line color of hamburger
            backgroundColor: "",//background color when hamburger open,
            closeOnNavigation:true//default true
        },
* Hamburger: Set true or below properties
    {
        lineColor:"",
        backgroundColor:"",
        closeOnNavigation:true
    }
#### Sections
```javascript
    sections: [{
                active:true,//set active|false
                anchor: "string",//link name
                templateId:"string"//Id of the template element which to be render
                components: [{
                  component: YourReactComponentName,
                  name: "ComponentKey",//It has to unique
                  props: {
                    "message": "Hello" //string:string
                  }
                }],
                template:"string",//use template or templateUrl
                backgroundColor: "string",
                verticalAlignMiddle:boolean,//By default it would be false, true|false
                sectionClass:"class1,class2"//comma separated string or string array class to be apply on sections
                anchorClass:"class1,class2"//comma separated string or string array class to be apply on sections
            }
        ],
```
#### Transition
```javascript
        easing: "string",//ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)
        transitionSpeed: 1000,//speed in ms
```
#### Scrolling
```javascript
        autoScrolling: boolean,//By default it would be false, true|false
        keyboardNavigation: boolean,//By default it would be false, true|false
```
#### Callback Events
```javascript
    pageTransitionStart: (prevPage:HtmlElement, currentPage:HtmlElement) => {
    }
    pageTransitionEnd: (currentPage:HtmlElement) => {
    }
```
### Public API
with sitePage 2.0.0 you can now access the same API which you can do with sitepage.js
* gotoPage(pageId: string);
* navigateToNextPage();
* navigateToPrevPage();
* getMenuItems();
* getActiveSection();
```javascript
        //for example
        sitePageModel.gotoPage('page3');
        sitePageModel.navigateToNextPage();
        sitePageModel.navigateToPrevPage();
        sitePageModel.getMenuItems();
        sitePageModel.getActivePage();
```
## Reporting issues
## Contributing to sitepage
## Changelog
To see the list of recent changes, see [Releases section](https://github.com/pixelbyaj/sitePage.jsx/releases).
## Resources
## Donations
Donations would be more than welcome :)

[![Donate](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/pixelbyaj)
## Sponsors
Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://pixelbyaj.github.io/#contact)]

