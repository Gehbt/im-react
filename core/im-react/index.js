/**
 * @typedef {{type: string; props: {[x: string]: any; children:IMElement[]}}} IMElement
 * @typedef {{[x: string]: any; id: string} | null} InitPropType
 * @typedef {(type: string, initProps: InitPropType, ...children: IMElement[] | string[])=>IMElement}  ElementRenderFn
 */
/**
 * @type {ElementRenderFn} createElement
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

/**
 * @param { IMElement } el
 * @param { HTMLElement } container
 */
export function render(el, container) {
  nextFiberUnit = {
    dom: container,
    type: "div",
    props: {
      children: [el],
    },
  };
}

// 看起来像前序遍历
/**
 * @type { VdomTreeElement | null} type - description
 */
let nextFiberUnit = null;
let taskId = 1;
/** @type {number | undefined} type - description */
let idleCB;
/**
 * @param {IdleDeadline} deadline
 */
function fiberLoop(deadline) {
  // console.log(deadline.timeRemaining());
  taskId++;
  let shouldYield = false;
  while (!shouldYield && nextFiberUnit) {
    console.log("task", taskId, "timeRemaining", deadline.timeRemaining());

    const preform = preformFiberUnit(nextFiberUnit);
    if (preform) {
      nextFiberUnit = preform;
    }

    shouldYield = deadline.timeRemaining() < 1;
  }

  // if (!nextFiberUnit) {
  //   if (idleCB) {
  //     cancelIdleCallback(idleCB);
  //   }
  //   return;
  // }
  idleCB = window.requestIdleCallback(fiberLoop);
}

/**
 * @param {string} type
 * @return {HTMLElement} description
 */
function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? /** @type {*} */ (document.createTextNode(""))
    : document.createElement(type);
}

/**
 * @param {{ [x: string]: any; }} dom
 * @param {{ [x: string]: any; }} props
 */
function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}
/**
 * @typedef {{
 *    dom: HTMLElement | null,
 *    parent?: VdomTreeElement | null,
 *    sibling?: VdomTreeElement | null,
 *    child?: VdomTreeElement | null,
 *  } & IMElement} VdomTreeElement
 */

/**
 * 插入队列
 * @param { VdomTreeElement } fiber
 */
function initChildren(fiber) {
  const children = fiber.props.children;
  let prevChild = null;
  children.forEach((child, /** @type {number} */ index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      dom: null,
      parent: fiber,
      sibling: null,
      child: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }

    prevChild = newFiber;
  });
}

/**
 * 渲染 FiberUnit
 * @param { VdomTreeElement } fiber
 */
function preformFiberUnit(fiber) {
  if (!fiber.dom) {
    // 创建 dom
    fiber.dom = createDom(fiber.type);
    const toDom = fiber.dom;
    fiber.parent?.dom?.append(toDom);
    // 处理 props
    updateProps(toDom, fiber.props);
  }

  // 转换链表，设置指针
  initChildren(fiber);

  // 返回下一个任务，子级
  if (fiber.child) {
    return fiber.child;
  }

  // 同级
  if (fiber.sibling) {
    return fiber.sibling;
  }

  return fiber.parent?.sibling;
}

// if (requestIdleCallback) {
//   requestIdleCallback(fiberLoop);
// }
