import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './actions';
import Header from './Header';
import Home from './Home';
import Game from '../game/Game';
import styles from './App.css';

class App extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.login();
  }

  render() {

    return (
      <Router>
        <Fragment>
          <div className={styles.app}>
            <header>
              <h1>Hello React!</h1>
              <Header/>
            </header>

            <main>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/game/:gameKey" component={Game}/>
                <Redirect to="/"/>
              </Switch>
            </main>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect(
  null,
  { login }
)(App);