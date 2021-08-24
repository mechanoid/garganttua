import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './garganttua.ts',
  output: {
    dir: 'dist/',
    format: 'es',
    paths: {
      zod: 'node_modules/zod/lib/'
    }
  },
  plugins: [typescript({ tsconfig: 'tsconfig.json' }), nodeResolve()]
};
