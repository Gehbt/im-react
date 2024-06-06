import { render as IMRender } from "./im-react";
/**
 * @typedef {import("react")} React - 只是作为命名缩短
 */

/**
 * @param {HTMLElement} container
 */
const createRoot = (container) => ({
  /**
   * @param {React.JSX.Element} App
   */
  render(App) {
    IMRender(App, container); // eslint-disable-line new-cap
  },
});
const IMReactDOM = {
  createRoot,
};
/**
 * @param {string} type
 * @return {HTMLElement}
 */
export function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? /** @type {*} */ (document.createTextNode(""))
    : document.createElement(type);
}

export default IMReactDOM;
