import React from 'react';

import classes from './Coin.module.css';

const coin = ({ prevSide, side, clicked, reset, toggleText }) => {
  const coinCss = [classes.Coin];

  if (!reset) {
    if (prevSide === 'heads' && side === 'heads') {
      coinCss.push(classes.HeadsToHeads);
    } else if (prevSide === 'heads' && side === 'tails') {
      coinCss.push(classes.HeadsToTails);
    } else if (prevSide === 'tails' && side === 'heads') {
      coinCss.push(classes.TailsToHeads);
    } else if (side === 'tails' && prevSide === 'tails') {
      coinCss.push(classes.TailsToTails);
    }
  }

  return (
    <div className={classes.Container}>
      <div
        className={coinCss.join(' ')}
        onClick={clicked}
        onAnimationEnd={toggleText}
        onAnimationStart={toggleText}
      >
        <div className={classes.SideA}>
          {/* <span className={classes.CoinText}>HEADS</span> */}
        </div>
        <div className={classes.SideB}>
          {/* <span className={classes.CoinText}>TAILS</span> */}
        </div>
      </div>
    </div>
  );
};

export default coin;
