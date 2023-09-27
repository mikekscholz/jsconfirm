import { readFileSync } from 'fs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const packageJson = JSON.parse(readFileSync('package.json'))
const version = process.env.VERSION || packageJson.version

const banner = `/*!
* ${packageJson.name} v${version}
* Released under the ${packageJson.license} License.
*/`

const footer = `\
if (typeof this !== 'undefined' && this.jsconfirm){\
this.jsc = this.jsconfirm = this.Jsc = this.jsConfirm = this.JsConfirm\
}`

const output = {
	format: 'umd',
	name: 'JsConfirm',
	file: 'dist/jsconfirm.js',
	banner,
	footer,
}

export default {
	plugins: [
		babel({
			babelHelpers: 'bundled',
			presets: [
				[
					'@babel/preset-env',
					{
						targets: '> 0.25%, last 2 versions, Firefox ESR, not dead',
					},
				],
			],
		}),
	],
	input: 'src/jsconfirm.js',
	output: [
		output,
		{
			...output,
			file: 'dist/jsconfirm.min.js',
			plugins: [terser()],
		},
	],
	// https://github.com/rollup/rollup/issues/2271
	onwarn(warning, rollupWarn) {
		if (warning.code !== 'CIRCULAR_DEPENDENCY' && warning.code !== 'THIS_IS_UNDEFINED') {
			rollupWarn(warning)
		}
	},
}
