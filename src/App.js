import React, { Component } from 'react';

import axios from './axios-coin';

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
      const res = await axios.get('auth/signup');

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
      const res = await axios.get('stats/stats');
      if (res.status !== 200) {
        throw new Error('Failed to fetch stats.');
      }

      this.setState({
        numHeads: res.data.stats.heads,
        numTails: res.data.stats.tails,
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
        url = 'stats/heads';
        userUrl = 'stats/userHeads';
        this.setState(prevState => ({ numHeads: prevState.numHeads + 1 }));
      } else if (side === 'tails') {
        url = 'stats/tails';
        userUrl = 'stats/userTails';
        this.setState(prevState => ({ numTails: prevState.numTails + 1 }));
      }
      const res = await axios.post(url);
      if (res.status !== 200) {
        throw new Error('Fail to add global stats!');
      }

      const resUserStats = await axios.post(userUrl);

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
      const res = await axios.get('stats/userstats', {
        withCredentials: true,
      });

      if (res.status !== 200) {
        throw new Error('Fetching stats failed!');
      }
      this.setState({ userStats: res.data.user, loadingUserStats: false });
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  };

  rndSide = () => {
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
