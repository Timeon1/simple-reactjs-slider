

[![NPM version][npm-image] ][npm-url][![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: http://img.shields.io/npm/v/simple-reactjs-slider.svg?style=flat-square
[npm-url]: http://npmjs.org/package/simple-reactjs-slider
[download-image]: https://img.shields.io/npm/dm/simple-reactjs-slider.svg?style=flat-square
[download-url]: https://npmjs.org/package/simple-reactjs-slider
[bundlephobia-url]: https://bundlephobia.com/result?p=simple-reactjs-slider
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/simple-reactjs-slider
## Usage


```js
import SimpleSlider from 'simple-reactjs-slider';

export default () => (
  <>
    <SimpleSlider min={0} max={100} vertical onChange={(e)=>{}}  defaultValue={15} />
  </>
);

