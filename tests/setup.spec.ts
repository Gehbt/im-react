// @vitest-environment jsdom
import { expect, test, vi } from "vitest";
import App from "@/App";
import IMReactDOM from "~core/im-react-dom";

test("render im-element", () => {
  const div = (function () {
    const _div = document.createElement("div");
    _div.id = "root";
    return _div;
  })();
  // window.requestIdleCallback = vi.fn((cb: IdleRequestCallback) => {
  //   let counter = 0;
  //   if (counter < 10) {
  //     cb({ timeRemaining: () => 50, didTimeout: false });
  //   } else {
  //     cb({ timeRemaining: () => 50, didTimeout: true });
  //   }

  //   counter++;
  //   return 50;
  // });
  // IMReactDOM.createRoot(div).render(App);
  expect(div).toMatchInlineSnapshot(/* jsx */ `
    <div
      id="root"
    />
  `);
});
