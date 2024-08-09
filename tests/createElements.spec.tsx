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
  test("JSX Spread Attributes", () => {
    const withSpreadAttr = (
      <div
        {...{
          className: "fragment",
          style: {
            display: "flex",
          },
        }}
        className="fragment-override"
      >
        JSX Spread Attributes
      </div>
    );
    expect(withSpreadAttr).toMatchInlineSnapshot(/* json */ `
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "JSX Spread Attributes",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
          "className": "fragment-override",
          "style": {
            "display": "flex",
          },
        },
        "type": "div",
      }
    `);
    expect(withSpreadAttr.props.className).toBe("fragment-override");
  });
});
