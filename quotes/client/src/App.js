import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import PrivateRoute from './components/PrivateRoute';

function App() {

    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute>
              <Route path="/dashboard" component={DashBoard} />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    );
}

export default App;