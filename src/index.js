import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Movies from './Movies'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  (
    <Router>
    <Switch>
      <Route exact path="/" component={Movies} />
			<Route exact path="/login" component={Login} />

			</Switch>
		</Router>
  ),
  document.getElementById('root')
);
