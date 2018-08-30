import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from './reducers';
import PropTypes from 'prop-types';
import styles from './Home.css';

class Home extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  requestGame = () => {
    console.log('Go!');
  };
  
  render() { 
    const { user } = this.props;

    return (
      <div className={styles.home}>
        <h2>Welcome to the app!</h2>
        {
          user && <section>
            <button onClick={this.requestGame}>Play Game</button>
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
  null
)(Home);