/**
 * renderFn(函数参数对象化) 和 element 的区别是，
 *    element 的 children 在 props 里，
 *    而 renderFn 的 children 同级
 */
/**
 * ### create some IMElement
 * @type {IMElementRenderFn}
 */
export function createElement(type, initProps, ...children) {
  console.log("createElement type:", type);
  if (typeof type === "function") {
    type(initProps, ...children);
    throw new Error("TODO: 暂时不会出现这种情况");
  }

  return {
    type,
    props: {
      ...initProps,
      children: children.map((/** @type {IMElement | string} */ child) => {
        // hoist, 将 纯字符串 提升到 文本节点
        if (typeof child === "string") {
          return createTextNode(child);
        }

        switch (child.type) {
          // ps: 暂时不会出现这种情况
          case "TEXT_NODE": {
            console.log("createTextNode, what?");
            return createTextNode(child.props.nodeValue);
          }

          case "COMMENT_NODE": {
            return createComment(child.props.nodeValue);
          }

          case "FRAGMENT_NODE": {
            return createDocumentFragment(child.props.children);
          }

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
    type: "TEXT_NODE",
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
    type: "COMMENT_NODE",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

/**
 * @desc Fragment FRAGMENT_NODE
 * @experimental unfinished!
 * @param {IMElement[]} children
 * @return {IMElement}
 */
function createDocumentFragment(children) {
  if (children.length === 0) {
    console.warn("没有 children 的 Fragment");
  }

  return {
    type: "FRAGMENT_NODE",
    props: {
      children,
    },
  };
}
