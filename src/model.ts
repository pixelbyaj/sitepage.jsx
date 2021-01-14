export interface Model {
  /** The user's name */
  id: string;
  /** Should the name be rendered in bold */
  model: IOptions | any;
}

export enum Scroll {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

export interface IOptions {
  brandName?: string,
  brandLogoUrl?: string,
  backgroundColor?: string,
  navigation?: Scroll,
  menuId?: string,
  anchors?: boolean | any,
  verticalAlignMiddle?: boolean | any,
  autoScrolling?: boolean | any,
  keyboardNavigation?: boolean | any,
  scrollbar?: boolean | any,
  transitionSpeed?: number,
  easing?: string,
  sameurl?: boolean | any,
  hamburger?: boolean | IHamburger
  sections?: ISection[],
  api: IAPI | any
}
export interface IComponent {
  component: any,
  name: string,
  props: any
}
export interface ISection {
  active?: boolean | any,
  anchor?: string | any,
  template?: string,
  templateId?: string,
  components?: IComponent[],
  backgroundColor?: string,
  verticalAlignMiddle?: boolean | any, //true||false
  sectionClass?: string[] | string,
  anchorClass?: string[] | string
}
export interface IHamburger {
  lineColor: string,
  backgroundColor: string,
  closeOnNavigation: boolean
}
export interface IAPI {
  pageTransitionStart?: (prevPage: HTMLElement, currentPage: HTMLElement) => void,
  pageTransitionEnd?: (currentPage: HTMLElement) => void,
  gotoPage?: (pageId: string) => void;
  navigateToNextPage?: () => void;
  navigateToPrevPage?: () => void;
  getMenuItems?: () => NodeListOf<Element> | null;
  getActivePage?: () => HTMLElement | null;
}
