/**
 * @desc metadata of render
 */
class Renderer {
  /** ************************* */
  // 全局变量
  #taskId = 1;

  get taskId() {
    return this.#taskId;
  }

  set taskId(value) {
    this.#taskId = value;
  }

  /**
   * @type {VDomElementTreeNode | undefined}
   */
  #nextFiberUnit = undefined;

  get nextFiberUnit() {
    return this.#nextFiberUnit;
  }

  set nextFiberUnit(value) {
    this.#nextFiberUnit = value;
  }

  /**
   * @type {VDomElementTreeNode | undefined}
   */
  #root = undefined;

  get root() {
    return this.#root;
  }

  set root(value) {
    this.#root = value;
  }
  /** ************************* */
}
/**
 * @type {(...args: any[])=> any}
 */
const noop = () => {};
export { Renderer, noop };
