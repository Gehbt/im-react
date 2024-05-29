import { render as IMRender } from "./im-react";
/**
 * @typedef {import("react")} React - 只是配合
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
export default IMReactDOM;
