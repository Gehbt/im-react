import { createDom } from "../im-react-dom/create-dom.js";
import { Renderer } from "./shared.js";
/**
 * 不用 `@import` 的原因是 现在 code(v1.91.1) 还没完全支持高亮
 * `@import { Renderer } from "./shared.js";`
 */

/**
 * 入口
 * Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入 Reconciler；
 * export only test
 * @param {Renderer} renderer
 * @param {number} timeRemaining
 * @return {void}
 * ## fiber 转换
 *
 * 看起来像前序遍历
 */
export function fiberLoop(renderer, timeRemaining) {
  let shouldYield = false;
  // 必须有后一项
  while (!shouldYield && renderer.nextFiberUnit) {
    // task
    // /*@__PURE__*/ console.log(
    //   "task",
    //   renderer.taskId,
    //   "timeRemaining",
    //   timeRemaining,
    // );
    renderer.nextFiberUnit = preformFiberUnit(renderer.nextFiberUnit);
    shouldYield = timeRemaining < 1;
  }

  renderer.taskId += 1; // 下一个任务
  if (!renderer.nextFiberUnit && renderer.root) {
    // 统一提交
    commitRoot(renderer);
  }

  // const ric = window.requestIdleCallback((d) => {
  //   fiberLoop(renderer, d.timeRemaining());
  // });
  // window.cancelIdleCallback(ric);
}

/**
 * Renderer（渲染器）—— 负责将变化的组件渲染到页面上。
 * @param {VDomElementTreeNode} fiber
 * @return {VDomElementTreeNode | undefined}
 * ## 渲染 FiberUnit
 */
function preformFiberUnit(fiber) {
  if (typeof fiber.type === "function") {
    updateFunctionComponent(fiber.type, fiber);
  } else {
    updateHostComponent(fiber.type, fiber);
  }

  // 4 返回下一个任务，子级
  // 如果有 child，就返回 child fiber
  if (fiber.child) {
    return fiber.child;
  }

  /**
   * @type {VDomElementTreeNode | undefined}
   */
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
}

/**
 * @param {((props?: Record<string, unknown>) => IMElement)} fc
 * @param {VDomElementTreeNode} fiber
 */
function updateFunctionComponent(fc, fiber) {
  // ! assert as function
  const children = [fc(fiber.props)];

  initChildren(fiber, children);
}

/**
 * @param {string} hc
 * @param {VDomElementTreeNode} fiber
 */
function updateHostComponent(hc, fiber) {
  // 1 创建 dom
  if (!fiber.dom) {
    // ! assert as string
    if (hc === "FRAGMENT_ELEMENT") {
      let fiberParent = fiber.parent;
      while (!fiberParent?.dom) {
        fiberParent = fiberParent?.parent;
      }

      fiber.dom = fiberParent?.dom;
    } else {
      fiber.dom = createDom(hc, fiber.props);
    }

    // 2 处理 props
    updateProps(fiber.dom, fiber.props);
  }

  // console.log("fiber.dom", fiber.dom);
  // 3 转换 child 链表，设置指针
  initChildren(fiber, fiber.props?.children);
}

/**
 * @param {Renderer} renderer
 * @return {void}
 */
function commitRoot(renderer) {
  commitFiber(renderer.root?.child);
  renderer.root = undefined;
}

/**
 * @desc **PureFunction**
 * @param {VDomElementTreeNode | undefined} fiber
 */
function commitFiber(fiber) {
  if (!fiber) {
    return;
  }

  // 顶层 FC
  let fiberParent = fiber.parent;
  while (!fiberParent?.dom) {
    fiberParent = fiberParent?.parent;
  }

  if (fiber.dom && fiber.dom !== fiberParent?.dom) {
    console.log(fiberParent.type, "->", fiber.type);
    // console.log(fiberParent.dom, "<-", fiber.dom);

    fiberParent?.dom?.append(/** @type {Node} */ (fiber.dom));
  } else if (fiber.dom !== fiberParent?.dom) {
    console.warn("fiber dom is undefined");
  }

  commitFiber(fiber.child);
  commitFiber(fiber.sibling);
}

/**
 * @param {{ [x: string]: any; }} dom
 * @param {{ [x: string]: any; }} props
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
 * Reconciler（协调器）—— 负责找出变化的组件：更新工作从递归变成了可以中断的循环过程。Reconciler 内部采用了 Fiber 的架构；
 * @param { VDomElementTreeNode } fiber
 * @param { IMElement[] } children
 * @return { void }
 * ## 插入队列
 */
function initChildren(fiber, children = []) {
  /** @type {VDomElementTreeNode | undefined} prevChild */
  let prevChild;
  children.forEach((child, index) => {
    /** @type {VDomElementTreeNode} newFiber */
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
