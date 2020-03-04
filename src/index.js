import styles from './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import layers from './public/layers.png';
// import className from 'classnames';

const App = () => (<>
  <div className={styles.foo}>React App</div>
  <img src={layers} />
</>);

ReactDOM.render(<App/>, document.querySelector('#root'));