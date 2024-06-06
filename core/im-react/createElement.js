/**
 * @typedef {{type: string; props: {[x: string]: any; children:IMElement[]}}} IMElement
 * @typedef {{[x: string]: any; id: string} | null} InitPropType
 * @typedef {(type: string, initProps: InitPropType, ...children: IMElement[] | string[])=>IMElement}  IMElementRenderFn
 * renderFn(函数参数对象化) 和 element 的区别是，
 *    element 的 children 在 props 里，
 *    而 renderFn 的 children 同级
 */
/**
 * @type {IMElementRenderFn}
 *
 * ### create some IMElement
 */
export function createElement(type, initProps, ...children) {
  return {
    type,
    props: {
      ...initProps,
      children: children.map((/** @type {IMElement | string} */ child) =>
        typeof child === "string" ? createTextNode(child) : child,
      ),
    },
  };
}

/**
 * @param {string} text
 * @return {IMElement}
 */
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
