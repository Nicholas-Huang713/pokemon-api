import React from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const errStyle = { color: 'red' };

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        success: "",
        errorMsg: "",
        emptyMsg: ""
      }
    }
  
    handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({ [name] : value });
    }
  
    handleRegister = (event) => {
      const {email, password, firstName, lastName} = this.state;
      
      if(email ==="" || password==="" || firstName===""|| lastName===""){
        event.preventDefault();
        this.setState({
          emptyMsg: "All fields must be completed"
        })
        return;
      }
      event.preventDefault();
      const currentUser = {
        email,
        password,
        lastName, 
        firstName
      }
      axios({
        url: '/api/register',
        method: 'POST',
        data: currentUser 
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        this.props.history.push('/dashboard');
      })
      .catch((err) => {
        this.setState({
          errorMsg: "Email already exists",
          emptyMsg: ""
        });
      });        
    }
    
    render() {
      const {success, errorMsg, emptyMsg} = this.state;
      return (
        <div className="App">
          <h1>Register</h1>
          <h3>{success}</h3>
          <p style={errStyle}>{errorMsg}</p>
          <p style={errStyle}>{emptyMsg}</p>
          <form onSubmit={this.handleRegister}>
            <label>FirstName</label>
            <input type="text" 
                    name="firstName"                            
                    value={this.state.firstName}
                    onChange={this.handleChange}/>
            <br/>
            <label>LastName</label>
            <input type="text" 
                        name="lastName"                            
                        value={this.state.lastName}
                        onChange={this.handleChange}/>
            <br/>
            <label>Email</label>
            <input type="email" 
                    name="email"                            
                    value={this.state.email}
                    onChange={this.handleChange}/>
            <br/>
            <label>Password</label>
            <input type="password" 
                    name="password"                            
                    value={this.state.password}
                    onChange={this.handleChange}/>
            <br/>
            <button>Register</button>
          </form>
        </div>
      );
    }
  }
  
  export default withRouter(Register);