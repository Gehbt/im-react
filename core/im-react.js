/**
 *  @typedef {{type:string ,props: {[x: string]: any; children:IMElement[] | never[]}}} IMElement
 *  @typedef { {[x: string]: any; id: string} | null} InitPropType
 */
/**
 * @param {string} type
 * @param {InitPropType} initProps
 * @param {IMElement[] | string[]} children
 * @return {IMElement}
 */
export function createElement(type, initProps, ...children) {
  return {
    type,
    props: {
      ...initProps,
      children: children.map((/** @type {IMElement | string} */ child) =>
        typeof child === "string" ? createTextNode(child) : child
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
    props: {
      children: [el],
    },
  };
}

// 看起来像前序遍历
let nextFiberUnit = null;
let taskId = 1;
/**
 * @param {IdleDeadline} deadline
 */
function fiberLoop(deadline) {
  // console.log(deadline.timeRemaining());
  taskId++;
  let shouldYield = false;
  while (!shouldYield && nextFiberUnit) {
    console.log("task", taskId, "timeRemaining", deadline.timeRemaining());
    nextFiberUnit = preformFiberUnit(nextFiberUnit);

    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(fiberLoop);
}

/**
 * @param {string} type
 * @return {HTMLElement} description
 */
function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? /** * @type {*} */ (document.createTextNode(""))
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
 *    child: VdomTreeElement | null,
 *    parent: VdomTreeElement | null,
 *    sibling: VdomTreeElement | null,
 *    dom: HTMLElement | null,
 *  } & IMElement} VdomTreeElement
 */
/**
 * @param { VdomTreeElement } fiber
 */
function initChildren(fiber) {
  const children = fiber.props.children;
  let prevChild = null;
  children.forEach((child, /** @type {number} */ index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null,
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
 * @param { VdomTreeElement } fiber
 */
function preformFiberUnit(fiber) {
  if (!fiber.dom) {
    // 创建dom
    const to_dom = (fiber.dom = createDom(fiber.type));
    fiber.parent?.dom?.append(to_dom);
    // 处理props
    updateProps(to_dom, fiber.props);
  }
  // 转换链表,设置指针
  initChildren(fiber);

  // 返回下一个任务
  if (fiber.child) {
    return fiber.child;
  }
  if (fiber.sibling) {
    return fiber.sibling;
  }
  return fiber.parent?.sibling;
}
requestIdleCallback(fiberLoop);
