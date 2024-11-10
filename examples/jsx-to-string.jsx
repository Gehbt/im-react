#!/usr/bin/env tsx
/** @jsxFrag Fragment */
const Fragment = Symbol("Fragment");
/** @jsx jsx_toString */
function jsx_toString( // eslint-disable-line camelcase
  /** @type {string | typeof Fragment}  */ tag,
  /** @type {?} props */ attr,
  /** @type {*[]} slots */ ...children
) {
  const voidElements = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ];
  function pascalToKebab(/** @type {string} */ str) {
    return (
      str
        // 使用正则表达式将每个大写字母前面加上连字符
        .replace(/([A-Z])/, "-$1")
        // 将字符串转换为小写字母
        .toLowerCase()
        // 如果字符串以连字符开头，去掉开头的连字符
        .replace(/^-/, "")
    );
  }

  if (typeof tag !== "string") {
    console.warn("is template always support Fragment?");

    return `${children.join("")}`;
  }

  const transformClassName = (
    /** @type {string[] | Record<String,boolean>} */ className,
  ) => {
    if (Array.isArray(className)) {
      return className.join(" ");
    }

    return Object.entries(className)
      .filter(([_, v]) => v)
      .map(([k, _]) => k)
      .join(" ");
  };

  const transformStyle = (/** @type {Record<String,string | number>}*/ style) =>
    Object.entries(style)
      .map(([k, v]) => `${pascalToKebab(k)}: ${v};`)
      .join("");
  const propsKV = Object.entries(attr ?? {}).map(([k, v]) => {
    if (k === "style") {
      return `style="${transformStyle(v)}"`;
    }

    if (k === "className") {
      return `class="${transformClassName(v)}"`;
    }

    return `${k}="${v}"`;
  });
  // console.log(`'jsx(${operation.name},${params.map(p => JSON.stringify(p)).join(',')})'`);

  if (voidElements.includes(tag)) {
    return `<${tag}${propsKV.length === 0 ? "" : " " + propsKV.join(" ")}>`;
  }

  return `<${tag}${propsKV.length === 0 ? "" : " " + propsKV.join(" ")}>${children.join("")}</${tag}>`;
}

const template = (
  <>
    <div
      id="number"
      className={{ flex: false, container: true, "container-flex": true }}
    >
      <input about="12" />1<p>2</p>
    </div>
    <div>1</div>
    <div
      style={{
        color: "red",
        textAlign: "center",
      }}
    />
  </>
);
console.log("template", template);
