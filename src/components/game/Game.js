import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGame } from '../app/reducers';


class Game extends Component {

  static propTypes = {
    game: PropTypes.object
  };
  
  render() { 
    const { game } = this.props;

    return ( 
      <section>
        <h1>Rock, Paper, Scissors, Lizard, Spock!</h1>
        <h3>Players:</h3>
        <p>
          {game.player1} vs {game.player2}
        </p>
      </section>

    );
  }
}
 
export default connect(
  (state) => {
    game: getGame(state)
  },
  { loadGame }
)(Game);