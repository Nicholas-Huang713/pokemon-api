import React from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

const errStyle = { color: 'red' };

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
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
  
    handleLogin = (event) => {
        const {email, password} = this.state;
        if(email === "" || password === "") {
            this.setState({
                emptyMsg: "All fields must be completed",
                errorMsg: "",
                success: ""
            });
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const currentUser = {
            email,
            password
        }
        axios({
            url: '/api/login',
            method: 'POST',
            data: currentUser 
        })
        .then((res) => {
            const user = res.data;
            this.setState({
                success: `Hello ${user.firstname} ${user.lastname}!`,
                emptyMsg: "",
                errorMsg: ""
            })
        })
        .catch((err) => {
            this.setState({
                errorMsg: err.response.data,
                emptyMsg: "",
                success: ""
            });
        });        
    }
    
    render() {
      const {success, errorMsg, emptyMsg} = this.state;
      return (
        <div className="App">
          <h1>Login</h1>
          <h3>{success}</h3>
          <p style={errStyle}>{errorMsg}</p>
          <p style={errStyle}>{emptyMsg}</p>
          <form onSubmit={this.handleLogin}>
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
            <button>Submit</button>
          </form>
          <hr />
          <Link to="/">Register</Link>
        </div>
      );
    }
    
  }
  
  export default withRouter(Login);