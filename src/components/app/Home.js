import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from './reducers';
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
          user ? <div>User <span style={{ color: 'blue' }}>{user.uid}</span> is logged in.</div> : <div>No user.</div>
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