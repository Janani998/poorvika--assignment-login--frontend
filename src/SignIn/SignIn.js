import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./SignIn.css";
import axios from 'axios'

class SignIn extends Component{
    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            errorMessage : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleChange(event){
        this.setState({errorMessage : ""})
        this.setState({[event.target.name] : event.target.value});
    }

    validate(){
        const {email,password} = this.state;
        const emailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/;
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!email || !password){
            this.setState({errorMessage : "Enter all mandatory fields"});
            return;
        }
        if(!(emailReg.test(email))){
            this.setState({errorMessage : "Enter Valid Email Id"});
            return;
        }
        if(!(passwordReg.test(password))){
            this.setState({errorMessage : "Enter Valid Password with atleast 8 characters, atleast one uppercase,atleast one digit and a special symbol"});
            return;
        }
        this.setState({errorMessage : ""})
        return true;
    }

    handleLogin(){
        const {email,password} = this.state;
        if(this.validate()){
            axios.post('http://localhost:8080/users/login', {
                email,
                password
              })
              .then((response) =>{
                console.log(response);
                if(response.status === 200){
                    window.localStorage.setItem('login',JSON.stringify(response.data));
                    this.props.history.push('/home');
                }
              })
              .catch((error) => {
                this.setState({errorMessage : error.response.data.msg});
              });
        }
    }

    render(){
        const {email,password,errorMessage} = this.state;
        return(
            <div className = "mainContainer">
                <div className = "container">
                    <div><h1>Sign In</h1></div>
                    <div className = "errorText">{errorMessage}</div>
                    <div className = "text">Email Id <span className = "errorText">*</span></div>
                    <input type = "text" name = "email" value ={email} placeholder = "Enter Email Id" className = "inputField"onChange ={this.handleChange}/>
                    <div className = "text">Password <span className = "errorText">*</span></div>
                    <input type = "password" value ={password} name = "password" placeholder = "Enter Password" className = "inputField" onChange ={this.handleChange}/>
                    <button className = "btn" onClick = {this.handleLogin}>Login</button>
                    <div>Don't have a account <Link to = "/signup">Sign Up</Link></div>
                </div>
            </div>
        );
    }
}
export default SignIn;
