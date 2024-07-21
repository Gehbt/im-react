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
    console.log("FC:", type.name);

    return type(initProps, ...children);
  }

  console.log("IC", `${type}${initProps?.id ? `#${initProps.id}` : ""}`);

  return {
    type,
    props: {
      ...initProps,
      children: children.map((/** @type {IMElement | string} */ child) => {
        // hoist, 将 纯字符串 提升到 文本节点
        if (typeof child === "string" || typeof child === "number") {
          return createTextNode(child.toString());
        }

        // 特殊的元素
        switch (child.type) {
          /* 不会出现这种情况 */
          // case "TEXT_ELEMENT": {
          //   console.log("TextNode, what?");
          //   return createTextNode(child.props.nodeValue);
          // }

          // case "COMMENT_ELEMENT": {
          //   return createComment(child.props.nodeValue);
          // }

          // case "FRAGMENT_ELEMENT": {
          //   console.log("DocumentFragment, what?");
          //   return createDocumentFragment(child.props.children);
          // }

          default: {
            return child;
          }
        }
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
      nodeValue: text,
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
 * @param {null} _
 * @param  {IMElement[]} children
 * @returns {IMElement}
 */
export const DocumentFragment = (_ = null, ...children) => {
  console.log("FRAGMENT_ELEMENT", ...children);
  return createDocumentFragment(children);
};

export const Comment = createComment;
export const TextNode = createTextNode;
