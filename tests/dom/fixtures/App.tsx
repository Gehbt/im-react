import { CommentNode } from "~core/im-react";

export default function App() {
  function Counter(props: { className: string; num: number }) {
    return (
      <div id={props.className}>
        <button id={`${props.className}-button`}> +1 </button>
        <span> count: {props.num} </span>
        <button> -1 </button>
      </div>
    );
  }

  return (
    <>
      <CommentNode text="123"></CommentNode>
      <p> Hi trans by vite</p>
      <div id="next">
        <p> Hi trans by vite next?</p>
      </div>
      <span>Fragments</span>
      <>
        <p>FragmentL1</p>
        <>
          <p>FragmentL2</p>
          <p>Fragment2</p>
        </>
      </>
      <hr />
      <Counter className="counter" num={10} />
    </>
  );
}
