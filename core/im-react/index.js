import { fiberLoop } from "./fiber.js";
import { Renderer } from "./shared.js";
import {
  createJuttedElement as createElement,
  h,
  CommentNode,
  TextNode,
  DocumentFragment as Fragment,
} from "./createElement.js";

/**
 * Starter
 * @param { IMElement } el
 * @param { HTMLElement } container
 * @return { void }
 * bridge IMElement render to HTMLElement
 */
export function fibrosisRender(el, container) {
  const renderer = new Renderer();
  renderer.nextFiberUnit = {
    dom: container,
    type: "FRAGMENT_ELEMENT", // 这里应该改为 FRAGMENT_ELEMENT
    props: {
      children: [el],
    },
  };
  renderer.root = renderer.nextFiberUnit;
  // 启动渲染
  window.requestIdleCallback((d) => {
    fiberLoop(renderer, d.timeRemaining());
  });
}

export {
  DocumentFragment as Fragment,
  createJuttedElement as createElement,
  h,
  CommentNode,
  TextNode,
} from "./createElement.js";

const IMReact = {
  render: fibrosisRender,
  Fragment,
  createElement,
  h,
  CommentNode,
  TextNode,
};
export default IMReact;
export { fibrosisRender as render };
