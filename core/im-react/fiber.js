import { createDom } from "../im-react-dom.js";
/**
 * @typedef {{type: string; props: {[x: string]: any; children:IMElement[]}}} IMElement
 */

/**
 * @param { IMElement } el
 * @param { HTMLElement } container
 * @return {void}
 * bridge IMElement render to HTMLElement
 */
export function fiberRender(el, container) {
  nextFiberUnit = {
    dom: container,
    type: "div",
    props: {
      children: [el],
    },
  };
  // 启动渲染
  window.requestIdleCallback((d) => fiberLoop(d.timeRemaining()));
}

/** ************************* */
// 全局变量
let taskId = 1;
/**
 * @type {VDomElementTree | undefined}
 */
let nextFiberUnit;
/** ************************* */

/**
 * @param {number} timeRemaining
 * @return {void}
 * ## fiber 转换
 * 看起来像前序遍历
 */
function fiberLoop(timeRemaining) {
  taskId += 1;
  let shouldYield = false;
  // 必须有后一项
  while (!shouldYield && nextFiberUnit) {
    // task
    /*@__PURE__*/ console.log("task", taskId, "timeRemaining", timeRemaining);

    nextFiberUnit = preformFiberUnit(nextFiberUnit);

    shouldYield = timeRemaining < 1;
  }

  window.requestIdleCallback((d) => fiberLoop(d.timeRemaining()));
}

/**
 * @param {{ [x: string]: any; children: any }} dom
 * @param {{ [x: string]: any; children: any }} props
 * @return {void}
 */
const updateProps = (dom, props) => {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
};
/**
 * @typedef {{
 *    dom: HTMLElement | undefined,
 *    parent?: VDomElementTree,
 *    sibling?: VDomElementTree,
 *    child?: VDomElementTree,
 *  } & IMElement} VDomElementTree
 * @desc parent 为 undefined 表示根
 */

/**
 * @param { VDomElementTree } fiber
 * @return {void}
 * ## 插入队列
 */
function initChildren(fiber) {
  const children = fiber.props.children;
  /** @type {VDomElementTree | undefined} prevChild */
  let prevChild;
  children.forEach((child, index) => {
    /** @type {VDomElementTree} newFiber */
    const newFiber = {
      type: child.type,
      props: child.props,
      dom: undefined, // undefined 表示还未被渲染
      parent: fiber,
      // sibling: undefined,
      // child: undefined,
    };

    // 向后传 第一个任务放在儿子上
    if (index === 0) {
      fiber.child = newFiber;
    } else if (prevChild) {
      prevChild.sibling = newFiber;
    }

    prevChild = newFiber;
  });
}

/**
 * @param {VDomElementTree} fiber
 * @return {VDomElementTree | undefined}
 * ## 渲染 FiberUnit
 */
function preformFiberUnit(fiber) {
  if (!fiber.dom) {
    // 1 创建 dom
    fiber.dom = createDom(fiber.type);
    fiber.parent?.dom?.append(fiber.dom);

    // 2 处理 props
    updateProps(fiber.dom, fiber.props);
  }

  // 3 转换 child 链表，设置指针
  initChildren(fiber);

  // 4 返回下一个任务，子级
  // 如果有 child，就返回 child fiber
  if (fiber.child) {
    return fiber.child;
  }
}
