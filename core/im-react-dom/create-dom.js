/**
 * @param {string} type
 * @return {HTMLElement}
 */
export function createDom(type) {
  switch (type) {
    case "TEXT_NODE": {
      return /** @type {*} */ (document.createTextNode(""));
    }

    case "COMMENT_NODE": {
      return /** @type {*} */ (document.createComment(""));
    }

    case "FRAGMENT_NODE": {
      return /** @type {*} */ (document.createDocumentFragment());
    }

    default: {
      return document.createElement(type);
    }
  }
}
