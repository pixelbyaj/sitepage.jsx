import React from 'react';
import ReactDOM from 'react-dom';
import { Renderer } from './renderer';
import { Model, IOptions, ISection, Scroll, IHamburger } from './model';
import './sitepage.css';
import './swiped-events.min.js';
export default class SitePage extends React.Component<Model> {

  //#region Private Variables
  scrollWay: any;
  _scrollings: any[];
  _lastScrollCount: number;
  _sectionIds: string[];
  _activePageIndex: number;
  _activeSection: HTMLElement | any;
  pageIndex: number;
  canScroll = true;
  scrollerTime: any;
  $e: HTMLElement | any;
  $: Document | any;
  //#endregion Private Variables

  DEFAULT = {
    BACKGROUNDCOLOR: "#ffffff",
    MENUID: "sp-menu",
    NAVIGATION: Scroll.Vertical,
    EASING: "ease",
    SAMEURL: true,
    AUTOSCROLLING: true,
    ANCHORS: true,
    VERTICALALIGNMIDDLE: true,
    KEYBOARDNAVIGATION: true,
    SCROLLBAR: false,
    TRANSITIONSPEED: 1000,
    HAMBURGER: true,
    HaMBURGERLINECOLOR: '#ffffff',
  };

  model: IOptions|any = {
    brandName: "",
    brandLogoUrl: "",
    backgroundColor: this.DEFAULT.BACKGROUNDCOLOR,
    anchors: this.DEFAULT.ANCHORS,
    menuId: this.DEFAULT.MENUID,
    verticalAlignMiddle: this.DEFAULT.VERTICALALIGNMIDDLE,
    sections: [],
    navigation: this.DEFAULT.NAVIGATION,
    hamburger: this.DEFAULT.HAMBURGER,
    autoScrolling: this.DEFAULT.AUTOSCROLLING,
    keyboardNavigation: this.DEFAULT.KEYBOARDNAVIGATION,
    scrollbar: this.DEFAULT.SCROLLBAR,
    transitionSpeed: this.DEFAULT.TRANSITIONSPEED,
    easing: this.DEFAULT.EASING,
    sameurl: this.DEFAULT.SAMEURL
  };

  constructor(props: Model) {
    super(props);
    this.scrollWay = this.DEFAULT.NAVIGATION;
    this._scrollings = [];
    this._sectionIds = [];
    this._activePageIndex = 0;
    this._lastScrollCount = 0;
    this._activeSection = null;
    this.pageIndex = 0;
    this.$e = null;
    this.$ = document;
    this.state = { model: this.model };
  }

  //#region Page Utility Methods
  pageUtility = {
    setSection: (section: ISection, index: number) => {
      let sectionDiv = this.$.createElement("div");
      sectionDiv.setAttribute("id", "section-" + index);
      sectionDiv.classList.add("section");
      if (section.active) {
        sectionDiv.classList.add("active");
      }
      if (typeof (section.sectionClass) === 'string') {
        section.sectionClass = section.sectionClass?.split(',');
      }
      let sectionClass = section.sectionClass || [];
      const cellEle = this.pageUtility.getCellElement(sectionClass as string[], section.verticalAlignMiddle);

      if (section.templateId) {
        const template = document.getElementById(section.templateId) as HTMLTemplateElement;
        cellEle.innerHTML = template.innerHTML;
      } else if (section.template) {
        cellEle.innerHTML = section.template;
      } else if (section.components) {
        ReactDOM.render(<Renderer config={section.components} />,cellEle);
      }
      sectionDiv.appendChild(cellEle);
      this.pageUtility.setSectionClass(sectionDiv);
      this.pageUtility.setSectionHeight(sectionDiv);
      return sectionDiv;
    },
    fetchView: () => {
      let spInclude = this._activeSection.querySelector("sp-include");
      if (spInclude) {
        let url: any = spInclude.getAttribute("url");
        fetch(url)
          .then((response) => {
            return response.text();
          })
          .then((text) => {
            let spCell: any = this._activeSection.querySelector(".sp-cell");
            spCell.innerHTML = text;
          });
      }
    },
    setInitialStyle: () => {
      this.$e.style.transform = `translate3d(0px, 0px, 0px)`;
      this.$e.classList.add("sp-wrapper");
      this.$.querySelector("body").style.backgroundColor = this.model.backgroundColor;
    },
    setNavigationMenu: () => {

      let nav = this.$.createElement("nav");
      const navClass = ["navbar", "fixed-top", "navbar-expand", "navbar-dark", "flex-column", "flex-md-row", "bd-navbar"];
      nav.classList.add(...navClass);

      if (this.model.brandName?.length > 0 || this.model.brandLogoUrl?.length > 0) {
        //navbrand name
        let navBrand = this.pageUtility.setBrandName(["navbar-brand", "mb-0", "h1"], this.model.brandName, this.model.brandLogoUrl);
        nav.appendChild(navBrand);
      }
      let navDiv = this.$.createElement("div");
      navDiv.setAttribute("id", "navbarNav");
      navDiv.classList.add("navbar-nav-scroll");

      let navUl = this.$.createElement("ul");
      navUl.setAttribute("id", this.model.menuId);
      let navUlClass = ["navbar-nav", "bd-navbar-nav", "flex-row"]
      navUl.classList.add(...navUlClass);
      navDiv.appendChild(navUl);
      nav.appendChild(navDiv);
      this.$.querySelector("body")?.insertBefore(nav, this.$e.parentElement);
      return navUl;
    },
    setNavigationLink: (classList: string[], anchor: string, anchorId: string): HTMLElement => {
      let navLi = this.$.createElement("li");
      navLi.classList.add("nav-item");

      let navA = this.$.createElement("a");
      navA.classList.add(...classList);
      navA.removeEventListener("click", this.eventListners.navigationClick);
      navA.setAttribute("href", "javascript:void(0)");
      navA.setAttribute("data-href", anchorId);
      navA.addEventListener("click", this.eventListners.navigationClick);


      let textNode = this.$.createTextNode(anchor);
      navA.appendChild(textNode);

      navLi.appendChild(navA);
      return navLi;
    },
    setHamburgerMenu: () => {
      let menuBar = this.$.createElement("div");
      menuBar.setAttribute("id", this.model.menuId);
      menuBar.classList.add("sp-hb-menu-bar");

      let menu = this.$.createElement("div");
      menu.classList.add("sp-hb-menu");

      for (let i = 1; i <= 3; i++) {
        let barLine = this.$.createElement("div");
        barLine.setAttribute("id", "bar" + i);
        barLine.classList.add("bar");
        if (this.model.hamburger) {
          if ((this.model.hamburger as IHamburger).lineColor) {
            barLine.style.backgroundColor = (this.model.hamburger as IHamburger).lineColor;
          } else {
            barLine.style.backgroundColor = this.DEFAULT.HaMBURGERLINECOLOR;
          }
        } else {
          barLine.classList.add("bar-color");
        }
        menu.appendChild(barLine);
      }
      menuBar.appendChild(menu);

      let ulNav = this.$.createElement("ul");
      ulNav.classList.add("sp-hb-nav");
      menuBar.appendChild(ulNav);

      var bgDiv = this.$.createElement("div");
      bgDiv.setAttribute("id", "sp-hb-menu-bg");
      bgDiv.classList.add("sp-hb-menu-bg");
      bgDiv.style.height = window.innerHeight + "px";

      if ((this.model.hamburger as IHamburger).backgroundColor) {
        bgDiv.style.backgroundColor = (this.model.hamburger as IHamburger).backgroundColor;
      }
      menuBar.appendChild(bgDiv);

      if (this.model.brandName?.length > 0 || this.model.brandLogoUrl?.length > 0) {
        var brandName = this.pageUtility.setBrandName(['sp-hb-navbar-brand'], this.model.brandName, this.model.brandLogoUrl);
        menuBar.appendChild(brandName);
      }

      this.$.querySelector("body")?.insertBefore(menuBar, this.$e.parentElement);
      menu.addEventListener("click", this.eventListners.onHamburgerMenuClick);
      return ulNav;

    },
    setBrandName: (classList: string[], brandName: string, brandLogoUrl: string): HTMLElement => {
      let navSpan = this.$.createElement("span");
      navSpan.classList.add(...classList);
      let brandNode: any;
      if (brandName) {
        brandNode = this.$.createTextNode(brandName);
        navSpan.appendChild(brandNode);
      } else {
        brandNode = this.$.createElement("img");
        brandNode.setAttribute("src", brandLogoUrl);
        navSpan.appendChild(brandNode);
      }

      return navSpan;
    },
    setSectionClass: (element: any) => {
      element.classList.add("sp-section");
    },
    setSectionHeight: (element: any) => {
      element.style.height = window.innerHeight + "px";
    },
    setSectionHorizontal: (element: any) => {
      element.style.width = (this._sectionIds.length * 100) + "%";
      element.classList.add("sp-floatLeft");
      element.querySelectorAll(".section").forEach((e: any) => {
        e.classList.add("sp-floatLeft");
        e.style.width = (100 / this._sectionIds.length) + "%";

      });
    },
    getCellElement: (classList: string[], verticalAlignMiddle: Boolean): any => {
      var cellDiv = this.$.createElement("div");
      cellDiv.setAttribute("class", "sp-cell");
      if (this.model.verticalAlignMiddle) {
        if (verticalAlignMiddle === undefined || verticalAlignMiddle)
          cellDiv.classList.add(...["align-middle", "text-center"]);
      }
      if (classList) {
        cellDiv.classList.add(...classList);
      }
      this.pageUtility.setSectionHeight(cellDiv);
      return cellDiv;
    },
    setBackgroundColor: (element: any, color: any) => {
      element.style.backgroundColor = color;
    }

  }
  //#endregion

  //#region Scroll Events
  scrollEvents = {
    scrollPageUp: () => {
      let sec_id: string = "";
      if (this._activePageIndex > 0) {
        sec_id = this._sectionIds[--this._activePageIndex];
      } else {
        if (this.model.autoScrolling) {
          this._activePageIndex = this._sectionIds.length - 1;
          sec_id = this._sectionIds[this._activePageIndex];
        }
      }
      if (sec_id === "") {
        this.canScroll = true;
        return;
      }
      this.scrollEvents.scrollToSection(sec_id);
    },
    scrollPageRight: () => {
      let sec_id: string = "";
      if (this._activePageIndex > 0) {
        sec_id = this._sectionIds[--this._activePageIndex];
      }
      else {
        if (this.model.autoScrolling) {
          this._activePageIndex = this._sectionIds.length - 1;
          sec_id = this._sectionIds[this._activePageIndex];
        }
      }
      if (sec_id === "") {
        this.canScroll = true;
        return;
      }
      this.scrollEvents.scrollToSection(sec_id);
    },
    scrollPageDown: () => {
      let sec_id: string = "";
      if (this._activePageIndex < this._sectionIds.length - 1) {
        sec_id = this._sectionIds[++this._activePageIndex]
      } else {
        if (this.model.autoScrolling) {
          this._activePageIndex = 0;
          sec_id = this._sectionIds[this._activePageIndex];
        }
      }
      if (sec_id === "") {
        this.canScroll = true;
        return;
      }
      this.scrollEvents.scrollToSection(sec_id);
    },
    scrollPageLeft: () => {
      let sec_id: string = "";
      if (this._activePageIndex < this._sectionIds.length - 1) {
        sec_id = this._sectionIds[++this._activePageIndex]
      } else {
        if (this.model.autoScrolling) {
          this._activePageIndex = 0;
          sec_id = this._sectionIds[this._activePageIndex];
        }
      }
      if (sec_id === "") {
        this.canScroll = true;
        return;
      }
      this.scrollEvents.scrollToSection(sec_id);
    },
    scrollToSection: (sectionId: any) => {
      this._activeSection = this.$.querySelector(`[data-anchor='${sectionId}']`) as HTMLElement;
      this._activePageIndex = this._sectionIds.indexOf(sectionId);

      if (this._activeSection) {
        this.pageUtility.fetchView();
        this.$e.style.transition = `all ${this.model.transitionSpeed}ms ${this.model.easing} 0s`;
        switch (this.scrollWay) {
          case Scroll.Horizontal:
            this.pageIndex = this._activePageIndex * window.innerWidth;
            this.$e.style.transform = `translate3d(-${this.pageIndex}px, 0px, 0px)`;
            break;
          case Scroll.Vertical:
            this.pageIndex = this._activePageIndex * window.innerHeight;
            if (this._activeSection.offsetTop > 0) {
              this.pageIndex = this.pageIndex > this._activeSection.offsetTop ? this.pageIndex : this._activeSection.offsetTop;
            }
            this.$e.style.transform = `translate3d(0px, -${this.pageIndex}px, 0px)`;
            break;
        }
        if (!this.model.sameurl) {
          /* eslint no-restricted-globals:0 */
          location.hash = "#" + sectionId;
        }
      }
    }
  }
  //#endregion

  //#region Event Listners Methods
  eventListners = {
    keyDown: (key: { which: any; }) => {
      switch (key.which) {
        case 37://ArrowLeft
          if (this.canScroll && this.model.navigation === Scroll.Horizontal) {
            this.canScroll = false;
            this.scrollEvents.scrollPageRight();
          }
          break;
        case 38://ArrowUp
          if (this.canScroll && this.model.navigation === Scroll.Vertical) {
            this.canScroll = false;
            this.scrollEvents.scrollPageUp();
          }
          break;
        case 39://ArrowRight
          if (this.canScroll && this.model.navigation === Scroll.Horizontal) {
            this.canScroll = false;
            this.scrollEvents.scrollPageLeft();
          }
          break;
        case 40://ArrowDown
          if (this.canScroll && this.model.navigation === Scroll.Vertical) {
            this.canScroll = false;
            this.scrollEvents.scrollPageDown();
          }
          break;
      }
    },
    mouseWheel: (e: any) => {
      this._scrollings.push(this._lastScrollCount);
      // cross-browser wheel delta
      e = e || window.event;
      var value = e.wheelDelta || -e.deltaY || -e.detail;
      var delta = Math.max(-1, Math.min(1, value));

      var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
      var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection);

      //preventing to scroll the site on mouse wheel when scrollbar is present
      if (this.model.scrollbar) {
        e.preventDefault();
      }

      clearTimeout(this.scrollerTime);
      this.scrollerTime = setTimeout(() => {
        if (this.canScroll && (this._lastScrollCount === this._scrollings.length)) {
          this.canScroll = false;
          this._scrollings = [];
          this._lastScrollCount = 0;
          clearInterval(this.scrollerTime);
          var averageEnd = this.utilityMethod.getAverage(this._scrollings, 10);
          var averageMiddle = this.utilityMethod.getAverage(this._scrollings, 70);
          var isAccelerating = averageEnd >= averageMiddle;

          //to avoid double swipes...
          if (isAccelerating && isScrollingVertically) {
            //scrolling down?
            if (delta < 0) {
              this.model.navigation === "vertical" ? this.scrollEvents.scrollPageDown() : this.scrollEvents.scrollPageLeft();
            } else {
              this.model.navigation === "vertical" ? this.scrollEvents.scrollPageUp() : this.scrollEvents.scrollPageRight();
            }
          }
        }
      }, 0);
      this._lastScrollCount = this._scrollings.length;
      return false;
    },
    windowResize: () => {
      var activeId;
      document.querySelectorAll(".section").forEach((element: any) => {
        this.pageUtility.setSectionHeight(element);
        this.pageUtility.setSectionHeight(element.querySelector(".sp-cell"));
        if (element.classList.contains("active")) {
          activeId = element.getAttribute("data-anchor")
        }
      });
      let ele = this.$.querySelector("#sp-hb-menu-bg") as HTMLElement;
      if (ele) {
        ele.style.height = window.innerHeight + "px";
      }
      this.scrollEvents.scrollToSection(activeId);

    },
    transitionStart: () => {
      const section = this.$.querySelector(".section.active");
      section?.classList.remove("active");
      if (this.model.pageTransitionStart instanceof Function) {
        this.model.pageTransitionStart(section as HTMLElement, this._activeSection);
      }
      let prevId = section?.getAttribute("data-anchor");
      let id = this._activeSection?.getAttribute("data-anchor");
      this.$.querySelector(".nav-link[href='#" + prevId + "']")?.classList.remove("active");
      this.$.querySelector(".nav-link[href='#" + id + "']")?.classList.add("active");
    },
    transitionEnd: () => {
      this._activeSection?.classList.add("active");
      this.canScroll = true;
      if (this.model.pageTransitionEnd instanceof Function) {
        this.model.pageTransitionEnd(this._activeSection);
      }
    },
    swipeUp: () => {
      if (this.canScroll) {
        this.canScroll = false;
        this.scrollEvents.scrollPageDown();
      }
    },
    swipeDown: () => {
      if (this.canScroll) {
        this.canScroll = false;
        this.scrollEvents.scrollPageUp();
      }
    },
    swipeLeft: () => {
      if (this.canScroll) {
        this.canScroll = false;
        this.scrollEvents.scrollPageLeft();
      }
    },
    swipeRight: () => {
      if (this.canScroll) {
        this.canScroll = false;
        this.scrollEvents.scrollPageRight();
      }
    },
    navigationClick: (e: MouseEvent) => {
      var sectionId = (e.target as HTMLElement).getAttribute("data-href");

      this.scrollEvents.scrollToSection(sectionId);
      if ((this.model.hamburger as IHamburger)?.closeOnNavigation !== false) {
        this.eventListners.onHamburgerMenuClick();
      }
    },
    onHamburgerMenuClick: () => {
      this.$.querySelector(".sp-hb-menu").classList.toggle("sp-hb-change");
      this.$.querySelector(".sp-hb-nav").classList.toggle("sp-hb-change");
      this.$.querySelector(".sp-hb-menu-bg").classList.toggle("sp-hb-change-bg");
    }
  }
  //#endregion


  //#region Utility Method
  utilityMethod = {

    addEventListeners: ($element: HTMLElement) => {
      //keyboard navigation event
      if (this.model.keyboardNavigation) {
        document.removeEventListener("keydown", this.eventListners.keyDown);
        document.addEventListener("keydown", this.eventListners.keyDown);
      }
      //scroll event
      document.removeEventListener("wheel", this.eventListners.mouseWheel);
      document.addEventListener("wheel", this.eventListners.mouseWheel);
      //window resize event
      window.removeEventListener('resize', this.eventListners.windowResize);
      window.addEventListener('resize', this.eventListners.windowResize);
      //transition start event
      $element.removeEventListener('transitionstart', this.eventListners.transitionStart);
      $element.addEventListener('transitionstart', this.eventListners.transitionStart);
      //transition end even
      $element.removeEventListener('transitionend', this.eventListners.transitionEnd);
      $element.addEventListener('transitionend', this.eventListners.transitionEnd);

      if (this.scrollWay == Scroll.Horizontal) {
        document.addEventListener('swiped-left', this.eventListners.swipeLeft);
        document.addEventListener('swiped-right', this.eventListners.swipeRight);
      } else {
        document.addEventListener('swiped-up', this.eventListners.swipeUp);
        document.addEventListener('swiped-down', this.eventListners.swipeDown);
      }
    },
    getAverage: (eleList: any, num: any) => {
      let sum = 0;

      let lastEles = eleList.slice(Math.max(eleList.length - num, 1));

      for (var i = 0; i < lastEles.length; i++) {
        sum = sum + lastEles[i];
      }

      return Math.ceil(sum / num);
    },
    addToPublicAPI: () => {
      this.props.model.gotoPage = this.scrollEvents.scrollToSection;
      if (this.scrollWay === Scroll.Horizontal) {
        this.props.model.navigateToNextPage = this.scrollEvents.scrollPageRight;
        this.props.model.navigateToPrevPage = this.scrollEvents.scrollPageLeft;
      } else {
        this.props.model.navigateToNextPage = this.scrollEvents.scrollPageDown;
        this.props.model.navigateToPrevPage = this.scrollEvents.scrollPageUp;
      }
      this.props.model.getMenuItems = (): NodeListOf<Element> => {
        return this.$.querySelectorAll('.nav-item');
      }
      this.props.model.getActivePage = (): HTMLElement => {
        var sec_id = this._sectionIds[this._activePageIndex];
        return this.$.querySelector(`[data-anchor='${sec_id}']`) as HTMLElement;
      }
    }
  }
  //#endregion


  static getDerivedStateFromProps(props: Model) {
    if (!props.id) {
      throw "Page element not found";
    }
    return props;
  }

  componentDidMount() {
    if (this.props.model) {
      this.model = { ...this.model, ...this.props.model };
    }
    this.$e = this.$.getElementById(this.props.id);
    if (!this.$e) {
      throw "Page element not found";
    }
    this.initSections();
  }

  initSections() {
    this.pageUtility.setInitialStyle();
    let navUl: any;
    if (this.model.anchors) {
      if (!this.model.hamburger) {
        navUl = this.pageUtility.setNavigationMenu();
      } else {
        navUl = this.pageUtility.setHamburgerMenu();
      }
    } else if (this.model.hamburger) {
      navUl = this.pageUtility.setHamburgerMenu();
    } else if (this.model.brandName?.length > 0 || this.model.brandLogoUrl?.length > 0) {
      var brandName = this.pageUtility.setBrandName(['sp-navbar-brand'], this.model.brandName, this.model.brandLogoUrl);
      let menuBar = this.$.createElement("div");
      menuBar.setAttribute("id", this.model.menuId);
      menuBar.classList.add("sp-hb-menu-bar");
      menuBar.appendChild(brandName);
      this.$.querySelector("body")?.insertBefore(menuBar, this.$e.parentElement);
    }

    //Iterate Sections
    this.model.sections.forEach((section: ISection, index: number) => {
      let anchorId = "page" + (index + 1);

      let sectionEle = this.pageUtility.setSection(section, index + 1);
      sectionEle.setAttribute("data-anchor", anchorId);

      this.$e.appendChild(sectionEle);
      this._sectionIds.push(anchorId);
      if (this.model.anchors || this.model.hamburger) {
        //navigation
        var anchorClass = ["nav-link", "text-nowrap"];
        if (section.anchorClass) {
          if (typeof (section.anchorClass) === 'string') {
            section.anchorClass = section.anchorClass.split(',');
          }
          anchorClass = [...anchorClass, ...section.anchorClass as string[]]
        }
        let navLi = this.pageUtility.setNavigationLink(anchorClass, section.anchor, anchorId);
        navUl.appendChild(navLi);
      }
      if (section.backgroundColor) {
        this.pageUtility.setBackgroundColor(sectionEle, section.backgroundColor);
      }
    });

    if (this.model.navigation.toLowerCase() === "horizontal") {
      this.pageUtility.setSectionHorizontal(this.$e);
      this.scrollWay = Scroll.Horizontal;
    }
    let activeId: string | null = this._sectionIds[0];
    if (!this.model.sameurl) {
      let hash = location.hash?.replace("#", "");
      if (hash) {
        activeId = hash;
      }
    } else {
      let active = document.querySelector(".section.active");
      if (active !== null) {
        activeId = active.getAttribute("data-anchor");
      }
    }
    this.scrollEvents.scrollToSection(activeId);
    this.$.querySelector(".nav-link[href='#" + activeId + "']")?.classList.add("active");

    this.utilityMethod.addEventListeners(this.$e);
    this.utilityMethod.addToPublicAPI();
  }

  render() {
    return <div id={this.props.id}>

    </div>;
  }
}

