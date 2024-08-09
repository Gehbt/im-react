/**
 * @import React from "react";
 */
// import { Hypotenuse, Hypotenuse2 } from "../examples/custom_jsx.jsx";
import { Counter, CounterL2 } from "./components/Counter.jsx";
import { CommentNode } from "~core/im-react";

function App() {
  return (
    <>
      <CommentNode text="123"></CommentNode>
      <p> Hi trans by vite</p>
      <div id="next">
        <p> Hi trans by vite next?</p>
      </div>
      <span>Fragments</span>
      <>
        <p
          {...{
            style: {
              alignItems: "inherit",
            },
          }}
        >
          Fragment
        </p>
        <>
          <p>FragmentL2</p>
          <p>Fragment2</p>
        </>
      </>
      <hr />
      <Counter className="counter" num={10} />
      <hr />
      <CounterL2 />
    </>
  );
}
// console.log("jsx Hypotenuse", <Hypotenuse a={3} b={4} />);
// console.log("jsx Hypotenuse2", <Hypotenuse2 values={[6, 8]} />);

// console.log("App :>> ", App);
export default App;
