export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((children) =>
        typeof children === "string" ? createTextNode(children) : children
      ),
    },
  };
}
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export function render(el, container) {
  const to_dom =
    el.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(el.type);

  Object.keys(el.props).forEach((key) => {
    if (key !== "children") {
      to_dom[key] = el.props[key];
    }
  });

  const children = el.props.children;
  children.forEach((child) => render(child, to_dom));
  // console.log("to_dom :>> ", to_dom);
  container.append(to_dom);
}

