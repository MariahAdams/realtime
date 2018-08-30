import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from './reducers';
import { requestGame } from './actions';
import PropTypes from 'prop-types';
import styles from './Home.css';

class Home extends Component {

  static propTypes = {
    user: PropTypes.object,
    requestGame: PropTypes.func.isRequired
  };
  
  render() { 
    const { user, requestGame } = this.props;

    return (
      <div className={styles.home}>
        <h2>Welcome to the app!</h2>
        {
          user && <section>
            <button onClick={requestGame}>Play Game</button>
          </section>
        }
      </div>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state)
  }),
  { requestGame }
)(Home);