import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGame } from './reducers';
import { getUser } from '../app/reducers';
import { loadGame, unloadGame, move } from './actions';
import styles from './Game.css';


class Game extends Component {

  static propTypes = {
    match: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    loadGame: PropTypes.func.isRequired,
    unloadGame: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { match, loadGame } = this.props;
    loadGame(match.params.gameKey);
  }
  
  componentWillUnmount() {
    const { match, unloadGame } = this.props;
    unloadGame(match.params.gameKey);
  }

  render() { 
    const { game, user, move } = this.props;
    if(!game || !user) return null;

    const { uid } = user;
    const who = player => {
      if(player === 'TIE') return 'TIE';
      return player === uid ? 'YOU' : 'THEM';
    };

    const player1 = who(game.player1);
    const player2 = who(game.player2);

    return ( 
      <section  className={styles.game}>
        <h3>Players:</h3>
        <p>
          {player1} <b>vs</b> {player2}
        </p>

        <ul>
          {game.rounds && Object.keys(game.rounds).map((key, i) => {
            const round = game.rounds[key];
            
            return (
              <li key={i}>
                <ul>
                  <h3>Round {i + 1}</h3>
                  {round.moves.map(move => (
                    <li key={move.uid}><span>{who(move.uid)}:</span> {move.play}</li>
                  ))}
                  <li><h3 className="winner">Winner: {who(round.winner)}</h3></li>
                </ul>
              </li>
            );
          })}
        </ul>

        <p>
          {['ROCK', 'PAPER', 'SCISSORS', 'LIZARD', 'SPOCK'].map(play => (
            <button 
              key={play} 
              onClick={() => move(play)}>
              {play}
            </button>
          ))}
        </p>
      </section>

    );
  }
}
 
export default connect(
  (state) => ({
    game: getGame(state),
    user: getUser(state)
  }),
  { loadGame, unloadGame, move }
)(Game);