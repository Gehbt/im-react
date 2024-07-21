/**
 * @import React from "react";
 */
// import { Hypotenuse, Hypotenuse2 } from "../examples/custom_jsx.jsx";
import { Counter, CounterL2 } from "./components/Counter.jsx";

function App() {
  return (
    <div id="app">
      <p> Hi trans by vite</p>
      <div id="next">
        <p> Hi trans by vite next?</p>
      </div>
      <>
        <p>Fragment</p>
        <p>Fragment2</p>
      </>
      <Counter className="counter" num={10} />
      <CounterL2 />
    </div>
  );
}
// console.log("jsx Hypotenuse", <Hypotenuse a={3} b={4} />);
// console.log("jsx Hypotenuse2", <Hypotenuse2 values={[6, 8]} />);

// console.log("App :>> ", App);
export default App;
