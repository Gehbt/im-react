// @ts-nocheck
// # JSX v1: `Render(TagName, props, ...children)`
/** @jsx calc_jsx */
function calc_jsx( // eslint-disable-line camelcase
  /** @type {(...args: any[]) => any}  */ operation,
  /** @type {*} props */ props,
  /** @type {*[]} slots */ ...args
) {
  let params = props ? [props] : [null];
  params = params.concat(...args);
  // console.log(`'jsx(${operation.name},${params.map(p => JSON.stringify(p)).join(',')})'`);
  return operation(...params);
}

/**
 * Calculate the square root of a number.
 * @param {{children?: unknown}} props
 * @param {number} x - real child at jsxV1
 * @returns
 */
const Sqrt = (props, x) => Math.sqrt(x);

/**
 * Calculate the sum of n numbers.
 * @param {{children?: unknown}} props
 * @param  {number[]} args - real child at jsxV1
 * @returns
 */
const Sum = (props, ...args) =>
  // console.log("props", props, "typeof props", typeof props);
  args?.reduce((a, b) => (a ?? 0) + b);
/**
 * Calculate the power of a base to the given exponent.
 * @param {{exponent: number, children?: unknown}} props - The object containing the exponent and any additional children.
 * @param {number} base - real child at jsxV1
 * @return {number} The result of the power operation.
 */
const Pow = ({ exponent }, base) => (base ?? 0) ** exponent;

/**
 *
 * @param {{a: number, b:number}} props
 * @returns {number}
 */
export const Hypotenuse = ({ a, b }) => (
  <Sqrt>
    <Sum>
      <Pow exponent={2}>{a}</Pow>
      <Pow exponent={2}>{b}</Pow>
    </Sum>
  </Sqrt>
);

// console.log("jsx Hypotenuse", <Hypotenuse a={3} b={4} />);

/**
 * @param {{values: number[]}} props
 * @returns {number}
 */
export const Hypotenuse2 = (/** @type {{values: number[]}} */ { values }) => (
  <Sum>
    {values.map((v) => (
      <Pow exponent={2}>{v}</Pow>
    ))}
  </Sum>
);
// console.log("jsx Pow2", <Pow exponent={2}>4</Pow>);
// console.log("jsx Hypotenuse2", <Hypotenuse2 values={[6, 8]} />);

export default Hypotenuse;
