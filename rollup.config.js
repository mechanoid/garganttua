import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './garganttua.ts',
  output: [
    {
      dir: 'dist/es',
      format: 'module',
      paths: {
        zod: 'node_modules/zod',
        "date-fns": 'node_modules/date-fns'
      },
      preserveModules: true
    },
    {
      file: 'dist/iife/garganttua.js',
      format: 'iife',
      paths: {
        zod: 'node_modules/zod',
        "date-fns": 'node_modules/date-fns'
      }
    }
  ],
  plugins: [typescript({ tsconfig: 'tsconfig.json' }), nodeResolve()]
};
