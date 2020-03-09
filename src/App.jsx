import React from 'react';
import styles from './style.less';
import layers from './public/layers.png';

const arr = [1, 2, 3];
console.log(arr.includes(3));
console.log(Array.from('hello'));

const App = () => (
  <>
    <div className={styles.foo}>React App...</div>
    <img src={layers} alt="" />
  </>
);

export default App;
