// @vitest-environment jsdom
import { expect, test } from "vitest";
import App from "@/App";
import IMReactDOM from "~core/im-react-dom";

test("render im-element jsx", () => {
  const div = (
    <div id="root">
      <App></App>
    </div>
  );
  // window.requestIdleCallback = vi.fn((cb) => {
  //   cb({ timeRemaining: () => 50, didTimeout: false });
  //   return 50;
  // });
  // IMReactDOM.createRoot(div).render(App);
  expect(div).toMatchInlineSnapshot(/* json */ `
    {
      "props": {
        "children": [
          {
            "props": {
              "children": [],
            },
            "type": [Function],
          },
        ],
        "id": "root",
      },
      "type": "div",
    }
  `);
});
