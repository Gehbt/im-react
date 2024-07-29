// @vitest-environment jsdom
import { expect, test } from "vitest";

const App = () => <div className="App">text</div>;

describe("createElements by jsx", () => {
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
                "children": [
                  {
                    "props": {
                      "children": [],
                      "nodeValue": "text",
                    },
                    "type": "TEXT_ELEMENT",
                  },
                ],
                "className": "App",
              },
              "type": "div",
            },
          ],
          "id": "root",
        },
        "type": "div",
      }
    `);
  });
});
