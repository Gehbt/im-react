"use quirks";

/**
 *
 * @param {{className: string,num: number}} props
 * @returns
 */
export function Counter(props) {
  return (
    <div id={props.className}>
      <button id={`${props.className}-button`}> +1 </button>
      <span> count: {props.num} </span>
      <button> -1 </button>
    </div>
  );
}

export function CounterL2() {
  return <Counter className="counter2" num={20} />;
}
