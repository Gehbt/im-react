import { render } from './im-react.js'
export const IMReactDOM = {
  /**
   * @param {HTMLElement} container
   */
  createRoot(container) {
    return {
      /**
       * @param {import("react").JSX.Element} App
       */
      render(App) {
        render(App, container);
      },
    };
  },
};