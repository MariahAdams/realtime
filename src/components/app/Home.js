import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../app/reducers';
import PropTypes from 'prop-types';
import styles from './Home.css';

class Home extends Component {

  static propTypes = {
    user: PropTypes.object
  };
  
  render() { 
    const { user } = this.props;

    return (
      <div className={styles.home}>
        <h2>Welcome to the app!</h2>
        {
          user ? <div style={{ color: 'blue' }}>{user.key}</div> : <div>No user.</div>
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