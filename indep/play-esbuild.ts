
import { transform } from 'esbuild';

const result = await transform('<>x</>', {
  jsxFragment: 'div',
  loader: 'jsx',
});

console.log(result.code);
