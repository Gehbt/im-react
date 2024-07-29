// @vitest-environment jsdom
import App from "./fixtures/App";
import IMReactDOM from "~core/im-react-dom";

suite("render im-element in jsdom", () => {
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

  beforeEach(() => {
    vi.runAllTimers();
  });

  test("App", () => {
    // #region <----- dom ----
    const root = (function () {
      const _div = document.createElement("div");
      _div.id = "root";
      return _div;
    })();

    vi.runAllTimers();
    IMReactDOM.createRoot(root).render(<App />);
    // #endregion ----- dom ---->

    expect(root).toMatchSnapshot();
  });
});
