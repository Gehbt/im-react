declare global {
  type CustomDomType = "FRAGMENT_NODE" | "COMMENT_NODE" | "TEXT_NODE";

  type AnyFunction = (...args: any[]) => any;
  type InitPropType = { [x: PropertyKey]: any; id: string } | null; // eslint-disable-line @typescript-eslint/ban-types
  type IMElement = {
    type: string;
    props: { [x: PropertyKey]: any; children: IMElement[] };
  };

  type IMElementRenderFn = (
    type: string | AnyFunction,
    initProps: InitPropType,
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
}

export { };
