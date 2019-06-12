import React from 'react';

import Stats from '../../components/Stats/Stats';
import StatsCoin from '../../components/StatsCoin/StatsCoin';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';

import classes from './UserStats.module.css';

const userStats = ({ close, stats, loading }) => {
  const closeBtn = (
    <Button clicked={close} type="button" design="Default">
      close
    </Button>
  );
  let totalFlips = 0;
  if (!loading && stats) {
    totalFlips = stats.heads + stats.tails;

    const lastFlips = stats.lastflips.map((lastFlip, index) => (
      <StatsCoin key={index} side={lastFlip} />
    ));

    return (
      <div className={classes.Container}>
        <h1>My Statistic</h1>
        <h2>
          Total Flips:
          {` ${totalFlips}`}
        </h2>

        <h3>Latest 5 Flips</h3>
        {lastFlips}
        <h3>Overall statistics</h3>
        <Stats numHeads={stats.heads} numTails={stats.tails} />
        <div
          style={{
            margin: '20px 0',
            fontSize: '22px',
          }}
        >
          {closeBtn}
        </div>
      </div>
    );
  }
  return (
    <div className={classes.SpinnerContainer}>
      <Spinner />
      <h2>Loading...</h2>
      {closeBtn}
    </div>
  );
};

export default userStats;
