import React from 'react';
import classes from './Stats.module.css';

const stats = ({ numTails, numHeads }) => {
  let tailsPx = 0;
  let headsPx = 0;
  let total = 0;
  if (numTails && numHeads) {
    const totalPx = 320;
    total = numTails + numHeads;
    const precentTails = (numTails / total) * 100;
    const precentHeads = (numHeads / total) * 100;

    tailsPx = (totalPx / 100) * precentTails;
    headsPx = (totalPx / 100) * precentHeads;
  }

  return (
    <div className={classes.Container}>
      <div className={classes.StatsContainer}>
        <div className={classes.Stats}>
          <span>Heads</span>
          <span>{numHeads}</span>
        </div>
        <div className={[classes.Stats, classes.TailsScore].join(' ')}>
          <span>Tails</span>
          <span>{numTails}</span>
        </div>
      </div>
      <div className={classes.Progress}>
        <div
          style={{
            width: headsPx,
            backgroundColor: 'red',
          }}
          className={classes.ProgessBar}
        />
        <div
          style={{
            width: tailsPx,
            backgroundColor: 'blue',
          }}
          className={classes.ProgessBar}
        />
      </div>
      <div className={classes.Total}>{`Total flips: ${total}`}</div>
    </div>
  );
};

export default stats;
