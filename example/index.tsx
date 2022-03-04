import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SimpleSlider } from '../.';
import '../dist/simple-react-slider.cjs.development.css'
const App = () => {
  return (
    <div style={{height: 300  , marginLeft: 50}}>
      <SimpleSlider vertical />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
