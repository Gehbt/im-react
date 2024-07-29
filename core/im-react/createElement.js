/**
 * renderFn(函数参数对象化) 和 element 的区别是，
 *    element 的 children 在 props 里，
 *    而 renderFn 的 children 同级
 */

/**
 * ### 将 element 实际化
 * @type {IMElementRenderFn}
 */
export function createJuttedElement(type, initProps, ...children) {
  if (typeof type === "function") {
    // console.log("FC:", type.name);

    return type(initProps, ...children);
  }

  // console.log("IC", `${type}${initProps?.id ? `#${initProps.id}` : ""}`);

  return {
    type,
    props: {
      ...initProps,
      children: children.map((/** @type {IMElement | string} */ child) => {
        // hoist, 将 纯字符串 提升到 文本节点
        if (typeof child === "string" || typeof child === "number") {
          return createTextNode(child.toString());
        }

        return child;
      }),
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

/**
 * @param {string} text
 * @return {IMElement}
 */
function createComment(text) {
  return {
    type: "COMMENT_ELEMENT",
    props: {
      nodeValue: ` ${text.trim()} `,
      children: [],
    },
  };
}

/**
 * @desc Fragment FRAGMENT_ELEMENT
 * @experimental unfinished!
 * @param {IMElement[]} children
 * @return {IMElement}
 */
function createDocumentFragment(children) {
  if (children.length === 0) {
    console.warn("没有 children 的 Fragment");
  }

  return {
    type: "FRAGMENT_ELEMENT",
    props: {
      children,
    },
  };
}

/**
 * @param {NonNullable<unknown>} _
 * @param  {IMElement[]} children
 * @returns {IMElement}
 */
export const DocumentFragment = (_ = {}, ...children) =>
  createDocumentFragment(children);

/**
 *
 * @param {{text:string} } props
 * @returns {React.JSX.Element}
 */
export const CommentNode = (props) =>
  /** @type {*} */ (createComment(props.text));
/**
 * @param {string} text
 * @returns {IMElement}
 */
export const TextNode = createTextNode;
/**
 *
 * @param {string | IMFunctionComponent } type
 * @returns {IMElement}
 */
export function h(type) {
  return createJuttedElement(type, {});
}
