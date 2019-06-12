import React, { Component } from 'react';

import Coin from './components/Coin/Coin';
import Stats from './components/Stats/Stats';
import Modal from './components/Modal/Modal';
import UserStats from './container/UserStats/UserStats';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';

import classes from './App.module.css';

class App extends Component {
  state = {
    side: 'heads',
    prevSide: null,
    reset: false,
    numHeads: 0,
    numTails: 0,
    loadingUserStats: false,
    status: {
      text: '',
      show: true,
    },
    showStats: false,
    userStats: null,
    error: null,
  };

  componentDidMount() {
    this.signupHandler();
    this.getStatsHandler();
  }

  signupHandler = async () => {
    try {
      const res = await fetch('http://localhost:8080/auth/signup', {
        credentials: 'include',
        method: 'GET',
      });
      if (res.status !== 200) {
        throw new Error('Sign up failed!');
      }
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  };

  getStatsHandler = async () => {
    try {
      const res = await fetch('http://localhost:8080/stats/stats');
      if (res.status !== 200) {
        throw new Error('Failed to fetch stats.');
      }

      const resData = await res.json();
      this.setState({
        numHeads: resData.stats.heads,
        numTails: resData.stats.tails,
      });
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  };

  setStatsHandler = async side => {
    try {
      let url;
      let userUrl;
      if (side === 'heads') {
        url = 'http://localhost:8080/stats/heads';
        userUrl = 'http://localhost:8080/stats/userHeads';
        this.setState(prevState => ({ numHeads: prevState.numHeads + 1 }));
      } else if (side === 'tails') {
        url = 'http://localhost:8080/stats/tails';
        userUrl = 'http://localhost:8080/stats/userTails';
        this.setState(prevState => ({ numTails: prevState.numTails + 1 }));
      }
      const res = await fetch(url, {
        method: 'POST',
      });
      if (res.status !== 200) {
        throw new Error('Fail to add global stats!');
      }

      const resUserStats = await fetch(userUrl, {
        credentials: 'include',
        method: 'POST',
      });

      if (resUserStats.status !== 200) {
        throw new Error('Failed to add User stats!');
      }
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  };

  getUserStatsHandler = async () => {
    try {
      this.setState({ loadingUserStats: true });
      const res = await fetch('http://localhost:8080/stats/userstats', {
        credentials: 'include',
        method: 'GET',
      });
      if (res.status !== 200) {
        throw new Error('Fetching stats failed!');
      }
      const resData = await res.json();
      this.setState({ userStats: resData.user, loadingUserStats: false });
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  };

  rndSide = () => {
    // const sides = ['heads', 'tails'];
    // const index = Math.round(Math.random());

    let side;
    if (Math.random() < 0.5) {
      side = 'heads';
    } else {
      side = 'tails';
    }

    this.setState(prevState => ({
      prevSide: prevState.side,
      side,
      reset: false,
      status: {
        ...this.state.status,
        text: `It's ${side}!`,
      },
    }));

    this.setStatsHandler(side);
  };

  resetSide = () => {
    this.setState({ reset: true });
    setTimeout(() => {
      this.rndSide();
    }, 100);
  };

  toggleStatusText = () => {
    this.setState(prevState => ({
      status: {
        ...prevState.status,
        show: !prevState.status.show,
      },
    }));
  };

  openModal = () => {
    this.setState({ showStats: true });
    this.getUserStatsHandler();
  };

  closeModal = () => {
    this.setState({ showStats: false });
  };

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    const {
      side,
      prevSide,
      reset,
      numHeads,
      numTails,
      status,
      showStats,
      userStats,
      loadingUserStats,
      error,
    } = this.state;
    return (
      <div className={classes.CoinContainer}>
        <ErrorHandler close={this.resetError} error={error} />
        <Modal show={showStats}>
          <UserStats
            close={this.closeModal}
            stats={userStats}
            loading={loadingUserStats}
          />
        </Modal>
        <h2 className={classes.Title}>Coinflip</h2>
        <Coin
          side={side}
          clicked={this.resetSide}
          prevSide={prevSide}
          reset={reset}
          toggleText={this.toggleStatusText}
        />
        <div className={classes.StatusContainer}>
          <p
            style={{
              opacity: status.show ? '1' : '0',
            }}
          >
            {status.text}
          </p>
          <p className={classes.UserStats} onClick={this.openModal}>
            Your Stats
          </p>
        </div>
        <h2 className={classes.GlobalStats}>Global Stats</h2>
        <Stats numHeads={numHeads} numTails={numTails} />
      </div>
    );
  }
}

export default App;
