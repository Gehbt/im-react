/**
 * @desc metadata of render
 */
class Renderer {
  /** ************************* */
  // 全局变量
  taskId = 1;
  /**
   * @type {VDomElementTreeNode | undefined}
   */
  nextFiberUnit = undefined;
  /**
   * @type {VDomElementTreeNode | undefined}
   */
  root = undefined;
  /** ************************* */
}
/**
 * @type {(...args: any[])=> any} type - description
 */
const noop = () => {};
export { Renderer, noop };
