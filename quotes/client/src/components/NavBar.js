import React from 'react';
import '../App.css';
// import logo from '../images/logo.png';
import {withRouter, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
// import {home, register, login, album, dashboard, favorites} from '../actions';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

function NavBar() {
    const currentPage = useSelector(state => state.currentPage)
    const dispatch = useDispatch();    
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <Link to="/"><Button variant="contained" color="primary">Home</Button></Link>
                  </IconButton>
                  <Link to="/register"><Button variant="contained" color="primary">Register</Button></Link>
                  <Link to="/login"><Button variant="contained" color="primary">Login</Button></Link>
                  {
                    localStorage.getItem('token') &&
                    <Link to="/dashboard"><Button variant="contained" color="primary">Dashboard</Button></Link>
                  }
                  {
                    localStorage.getItem("token") &&
                    <Link to="/" onClick={() => localStorage.removeItem("token")}><Button variant="contained" color="primary">Logout</Button></Link>
                  }
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(NavBar);