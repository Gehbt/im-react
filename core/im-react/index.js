export { createElement } from "./createElement.js";

export { fiberRender as render } from "./fiber.js";

// function render(element, container) {
//   wipRoot = {
//     dom: container,
//     props: {
//       children: [element],
//     },
//   };
//   nextUnitOfWork = wipRoot;
// }

// let nextUnitOfWork = null;
// let wipRoot = null;

// function workLoop(deadline) {
//   let shouldYield = false;
//   while (nextUnitOfWork && !shouldYield) {
//     nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
//     shouldYield = deadline.timeRemaining() < 1;
//   }

//   if (!nextUnitOfWork && wipRoot) {
//     commitRoot();
//   }

//   requestIdleCallback(workLoop);
// }

// requestIdleCallback(workLoop);
// let deletions = null;
// let currentRoot = null;
// function commitRoot() {
//   deletions.forEach(commitWork);
//   commitWork(wipRoot.child);
//   currentRoot = wipRoot;
//   wipRoot = null;
// }

// function commitWork(fiber) {
//   if (!fiber) {
//     return;
//   }

//   let domParentFiber = fiber.parent;
//   while (!domParentFiber.dom) {
//     domParentFiber = domParentFiber.parent;
//   }

//   const domParent = domParentFiber.dom;

//   if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
//     domParent.append(fiber.dom);
//   } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
//     updateDom(fiber.dom, fiber.alternate.props, fiber.props);
//   } else if (fiber.effectTag === "DELETION") {
//     commitDeletion(fiber, domParent);
//   }

//   commitWork(fiber.child);
//   commitWork(fiber.sibling);
// }

// function performUnitOfWork(fiber) {
//   fiber.dom ||= createDom(fiber);

//   if (fiber.parent) {
//     fiber.parent.dom.append(fiber.dom);
//   }

//   const elements = fiber.props.children;
//   let index = 0;
//   let prevSibling = null;

//   while (index < elements.length) {
//     const element = elements[index];

//     const newFiber = {
//       type: element.type,
//       props: element.props,
//       parent: fiber,
//       dom: null,
//     };

//     if (index === 0) {
//       fiber.child = newFiber;
//     } else {
//       prevSibling?.sibling = newFiber;
//     }

//     prevSibling = newFiber;
//     index++;
//   }

//   if (fiber.child) {
//     return fiber.child;
//   }

//   let nextFiber = fiber;
//   while (nextFiber) {
//     if (nextFiber.sibling) {
//       return nextFiber.sibling;
//     }

//     nextFiber = nextFiber.parent;
//   }
// }
