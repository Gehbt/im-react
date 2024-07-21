// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import React from "~core/mini-react/React";

describe("createElement", () => {
  it("should return vdom element no props", () => {
    const element = React.createElement("div", null, "hello");
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
    // <div id="root">hello</div>;
    const element = React.createElement("div", { id: "root" }, "hello");
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
