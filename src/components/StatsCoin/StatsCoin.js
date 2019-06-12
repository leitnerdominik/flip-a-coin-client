import React from 'react';

import classes from './StatsCoin.module.css';

const statscoin = ({ side }) => {
  const attachedClasses = [classes.Coin];

  if (side === 'heads') {
    attachedClasses.push(classes.Heads);
  } else {
    attachedClasses.push(classes.Tails);
  }
  return (
    <div className={classes.Container}>
      <div className={classes.InnerContainer}>
        <div className={attachedClasses.join(' ')} />
        <span className={classes.Text}>{side}</span>
      </div>
    </div>
  );
};

export default statscoin;
