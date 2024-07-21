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
      return /** @type {*} */ (document.createElement("div"));
      // 有坑：需要在 DocumentFragment 完成提交之后才能提交到父节点 (appendChild)
      //  而当前是顺序的逐级插入
      // return /** @type {*} */ (document.createDocumentFragment());
    }

    default: {
      return document.createElement(type);
    }
  }
}
