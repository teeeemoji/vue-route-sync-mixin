// module.exports = require('autoroll')(require('./package.json'))
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {terser} from 'rollup-plugin-terser'

module.exports = [
  {
    input: './index.js',
    output: {// umd
      file: 'dist/umd/index.umd.js',
      name: 'RouteSync',
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  },
  {
    input: './index.js',
    output: {// esm
      file: 'dist/esm/index.esm.js',
      format: 'esm'
    },
    plugins: [
      terser()
    ],
    // 指出应将哪些模块视为外部模块
    external: []
  }
]
