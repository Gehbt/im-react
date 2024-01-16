import { describe, expect, it } from "vitest";
import { createElement } from "~core/im-react";
describe("createElement", () => {
  it("should return vdom element no props", () => {
    const element = createElement("div", null, "hello");
    expect(element).toMatchInlineSnapshot(/* json */ `
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hello",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
        },
        "type": "div",
      }
    `);
  });
  it("should return vdom element with props", () => {
    const element = createElement("div", { id: "root" }, "hello");
    expect(element).toMatchInlineSnapshot(/* json */ `
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hello",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
          "id": "root",
        },
        "type": "div",
      }
    `);
  });
});
