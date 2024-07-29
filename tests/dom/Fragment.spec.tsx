// @vitest-environment jsdom

import IMReactDOM from "~core/im-react-dom";

suite("Fragment", () => {
  beforeAll(() => {
    vi.useFakeTimers({ toFake: ["requestIdleCallback"] });
    window.requestIdleCallback = vi.fn((cb: IdleRequestCallback) => {
      cb({
        timeRemaining: () => 12,
        didTimeout: false,
      });
      return 12;
    });
  });
  let root: HTMLElement;
  beforeEach(() => {
    vi.runAllTimers();
    root = (function () {
      const _div = document.createElement("div");
      _div.id = "app";
      return _div;
    })();
  });

  test("single Fragment", () => {
    IMReactDOM.createRoot(root).render(
      <>
        <p>Fragment</p>
        <p>Fragment2</p>
      </>,
    );
    expect(root).toMatchSnapshot();
  });

  test("single Fragment nested", () => {
    IMReactDOM.createRoot(root).render(
      <>
        <p>Fragment</p>
        <p>Fragment2</p>
        <>
          <p>FragmentL2</p>
          <p>Fragment2L2</p>
          <>
            <p>FragmentL3</p>
            <p>Fragment2L3</p>
          </>
        </>
      </>,
    );
    expect(root).toMatchSnapshot();
  });
});
