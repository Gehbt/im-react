import { render } from './im-react.js'
export const IMReactDOM = {
  createRoot(container) {
    return {
      render(App) {
        render(App, container);
      },
    };
  },
};