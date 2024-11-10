"use quirks";

/**
 *
 * @param {{className: string,num: number}} props
 * @returns
 */
export function Counter(props) {
  return (
    <div className={props.className}>
      <button className={`${props.className}-button-plus`}> +1 </button>
      <span> count: {props.num} </span>
      <button className={`${props.className}-button-minus`}> -1 </button>
    </div>
  );
}

export function CounterL2() {
  return <Counter className="counter2" num={20} />;
}
