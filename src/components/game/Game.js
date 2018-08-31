import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGame } from './reducers';
import { getUser } from '../app/reducers';
import { loadGame, unloadGame, move } from './actions';


class Game extends Component {

  static propTypes = {
    match: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    loadGame: PropTypes.func.isRequired,
    unloadGame: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log('Game component did mount!');
    const { match, loadGame } = this.props;
    loadGame(match.params.gameKey);
  }
  
  componentWillUnmount() {
    console.log('Game component unmounted');
    const { match, unloadGame } = this.props;
    unloadGame(match.params.gameKey);
  }

  render() { 
    const { game, user, move } = this.props;
    if(!game || !user) return null;

    const { uid } = user;
    const who = player => player === uid ? 'YOU' : 'THEM';

    const player1 = who(game.player1);
    const player2 = who(game.player2);

    return ( 
      <section>
        <h1>Rock, Paper, Scissors, Lizard, Spock!</h1>
        <h3>Players:</h3>
        <p>
          {player1} <b>vs</b> {player2}
        </p>

        <ul>
          {game.rounds && Object.keys(game.round).map((key, i) => {
            const round = game.rounds[key];
            return (
              <li key={i}>
                <ul>
                  {round.moves.map(move => (
                    <li key={move.uid}>{who(move.uid)}: {move.play}</li>
                  ))}
                  <li>winner: {who(round.winner)}</li>
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
              {play}</button>
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