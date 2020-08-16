import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.less';
import HomePage from '@/views/HomePage';

function App() {
  return (
    // <div className="App">
    //   <HomePage />
    // </div>
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
