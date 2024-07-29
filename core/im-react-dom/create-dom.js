/**
 * @param {IMDomType} type
 * @param {InitPropType} props
 * @return {HTMLElement}
 */
export function createDom(type, props) {
  switch (type) {
    case "TEXT_ELEMENT": {
      return /** @type {*} */ (document.createTextNode(props.nodeValue));
    }

    case "COMMENT_ELEMENT": {
      return /** @type {*} */ (document.createComment(props.nodeValue));
    }

    case "FRAGMENT_ELEMENT": {
      return /** @type {*} */ (document.createDocumentFragment());
      // 有坑：DocumentFragment 需要在完全完成 (append) 提交之后才能提交到父节点 (appendChild)
      // 在插入后，往 DocumentFragment 的插入操作会失败
      // return /** @type {*} */ (document.createDocumentFragment());
    }

    default: {
      return document.createElement(type);
    }
  }
}
