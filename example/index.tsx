import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SimpleSlider } from '../.';

const App = () => {
  return (
    <div style={{width: '100px',height: '200px'}}>
      <SimpleSlider min={0} max={100} vertical onChange={(e)=>{}}  defaultValue={15}/>
     </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
