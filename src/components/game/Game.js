import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGame } from './reducers';
import { loadGame, unloadGame } from './actions';


class Game extends Component {

  static propTypes = {
    match: PropTypes.object,
    game: PropTypes.object,
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
    const { game } = this.props;
    if(!game) return null;

    return ( 
      <section>
        <h1>Rock, Paper, Scissors, Lizard, Spock!</h1>
        <h3>Players:</h3>
        {game &&
          <p>
            {game.player1} vs {game.player2}
          </p>
        }
      </section>

    );
  }
}
 
export default connect(
  (state) => ({
    game: getGame(state)
  }),
  { loadGame, unloadGame }
)(Game);