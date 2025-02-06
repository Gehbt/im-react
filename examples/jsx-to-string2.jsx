import React from "react";
import reactElementToJsxString from "react-element-to-jsx-string";
import clsx from 'clsx';

const snipJSX = (
  <>
    <div
      id="number"
      className={clsx({ flex: false, container: true, "container-flex": true })}
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
// @ts-ignore -- cuz bad resolve TT
const result2 = reactElementToJsxString.default(snipJSX);
console.log(result2);
export {};
