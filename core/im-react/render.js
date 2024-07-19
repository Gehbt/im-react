import { fiberLoop } from "./fiber.js";
import { Renderer } from "./shared.js";

/**
 * Starter
 * @param { IMElement } el
 * @param { HTMLElement } container
 * @return { void }
 * bridge IMElement render to HTMLElement
 */
export function fiberRender(el, container) {
  const renderer = new Renderer();
  renderer.nextFiberUnit = {
    dom: container,
    type: "div",
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
