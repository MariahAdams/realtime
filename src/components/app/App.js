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
              <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Atom_symbol_as_used_in_the_logo_of_the_television_series_The_Big_Bang_Theory_%28black%29.svg/2000px-Atom_symbol_as_used_in_the_logo_of_the_television_series_The_Big_Bang_Theory_%28black%29.svg.png"/>
                <h4 className="title">Rock, Paper, Scissors, Lizard, Spock!</h4>
              </div>
              <Header/>
            </header>

            <main>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/games/:gameKey" component={Game}/>
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