import { fiberRender as IMRender } from "../im-react/render";

/**
 * @param {HTMLElement} container
 */
const createRoot = (container) => ({
  /**
   * @param {IMElement} App
   */
  render(App) {
    IMRender(App, container); // eslint-disable-line new-cap
  },
});
const IMReactDOM = {
  createRoot,
};
//* export
export default IMReactDOM;
