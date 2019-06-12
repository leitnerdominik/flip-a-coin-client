/* eslint-disable react/button-has-type */
import React from 'react';

import classes from './Button.module.css';

const button = ({ type, design, clicked, children }) => {
  const buttonClasses = [classes.Button, classes[design]];

  return (
    <button onClick={clicked} className={buttonClasses.join(' ')} type={type}>
      {children}
    </button>
  );
};

export default button;
