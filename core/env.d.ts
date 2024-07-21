
declare global {
  type CustomDomType = "FRAGMENT_ELEMENT" | "COMMENT_ELEMENT" | "TEXT_ELEMENT";
  type IMDomType = CustomDomType | (string & NonNullable<unknown>);
  type IMFunctionComponent = (...args: any[]) => IMElement;
  type InitPropType = { [x: PropertyKey]: any; children: IMElement[] };
  type IMElement = {
    type: string | ((props?: Record<string, unknown>) => IMElement);
    props: InitPropType;
    key?: string;
  };

  type IMElementRenderFn = (
    type: string | IMFunctionComponent,
    initProps: InitPropType | null, // eslint-disable-line @typescript-eslint/ban-types
    ...children: IMElement[] | string[]
  ) => IMElement;

  /**
   * @desc 注：parent 为 undefined 表示根
   */
  type VDomElementTreeNode = {
    dom: HTMLElement | undefined;
    parent?: VDomElementTreeNode;
    sibling?: VDomElementTreeNode;
    child?: VDomElementTreeNode;
  } & IMElement;

  // // via dom-chef
  // interface JSXElementClassDocumentFragment extends DocumentFragment, JSX.ElementClass { }
  // interface Fragment {
  //   prototype: JSXElementClassDocumentFragment;
  //   new(): JSXElementClassDocumentFragment;
  // }
}

export { };
