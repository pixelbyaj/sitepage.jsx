import React from 'react'

import SitePage from 'sitepage.jsx'

import { IOptions } from 'sitepage.jsx/dist/model'

import Message from './Message'
import "sitepage.jsx/dist/sitepage.css"
export const model: IOptions = {
  brandName: "PixelByAJ",
  backgroundColor: "",
  verticalAlignMiddle: true, //true||false
  sections: [{
    anchor: "Home",
    //anchorClass: [],
    Components: [{
      component: Message,
      name: "message",
      props: {
        "message": "Hello"
      }
    }],
    backgroundColor: "#ff5f45",
    verticalAlignMiddle: true, //true||false
    sectionClass: 'text-right'
  },
  {
    anchor: "Skills",
    template: "<h1>Skills</h1>",
    backgroundColor: "#fec401"
  }
  ],
  //navigation: "horizontal|vertical",
  anchors: false, //default true
  hamburger: true,
  easing: "ease",
  sameurl: false,
  //sameurl: true|false,
  transitionSpeed: 1000,
  keyboardNavigation: true
};


const App = () => {
  return <SitePage id="sitepage" model={model} />
}

export default App
