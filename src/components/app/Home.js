import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getGames } from './reducers';
import { Link } from 'react-router-dom';
import { requestGame } from './actions';
import PropTypes from 'prop-types';
import styles from './Home.css';

class Home extends Component {

  static propTypes = {
    user: PropTypes.object,
    games: PropTypes.array.isRequired,
    requestGame: PropTypes.func.isRequired
  };
  
  render() { 
    const { user, games, requestGame } = this.props;

    return (
      <div className={styles.home}>
        <h2>Welcome to the app!</h2>
        {
          user && <section>
            <button onClick={requestGame}>Play Game</button>
            <ul>
              {games.map((gameKey, i) => (
                <li key={gameKey}>
                  <Link to={`/games/${gameKey}`}>Game {i + 1}</Link>
                </li>
              ))}
            </ul>
          </section>
        }
      </div>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state),
    games: getGames(state)
  }),
  { requestGame }
)(Home);