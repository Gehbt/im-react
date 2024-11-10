import { fibrosisRender as IMRender } from "../im-react";

/**
 * @param {HTMLElement | React.JSX.Element} container
 */
const createRoot = (container) => ({
  /**
   * @param {IMElement | React.JSX.Element} App
   */
  render(App) {
    IMRender(/** @type {*} */ (App), /** @type {*} */ (container)); // eslint-disable-line new-cap
  },
});
const IMReactDOM = {
  createRoot,
};
//* export
export default IMReactDOM;
// adapt other module
export { createRoot };
