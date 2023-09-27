#!/usr/bin/env zx
import { $, echo, fs } from 'zx'

echo`1. Build JS ...`
await $`rollup -c --bundleConfigAsCjs`
echo``

echo`2. Build CSS ...`
await $`sass src/jsconfirm.scss dist/jsconfirm.css --no-source-map`
await $`sass src/jsconfirm.scss dist/jsconfirm.min.css --no-source-map --style=compressed`
echo``

echo`3. Build JS+CSS ...`
const css = fs.readFileSync('dist/jsconfirm.min.css', 'utf8')
const cssInJs = `"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,"${css
	.trim()
	.replace(/"/g, '\\"')}");`
fs.writeFileSync('dist/jsconfirm.all.js', `${fs.readFileSync('dist/jsconfirm.js', 'utf-8')}${cssInJs}`)
fs.writeFileSync('dist/jsconfirm.all.min.js', `${fs.readFileSync('dist/jsconfirm.min.js', 'utf-8')}${cssInJs}`)
echo`OK!`
echo``
