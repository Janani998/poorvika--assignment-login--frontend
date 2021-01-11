import React, { Component } from 'react'
import "../SignIn/SignIn.css"
import { Link } from 'react-router-dom';
import axios from 'axios'

class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            conformPassword : "",
            errorMessage : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(){
        const {email,password,conformPassword} = this.state;
        const emailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/;
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!email || !password || !conformPassword){
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
        if(password !== conformPassword) {
            this.setState({errorMessage : "Password and conform password didn't match"});
            return;
        }
        this.setState({errorMessage : ""})
        return true;
    }

    handleChange(event){
        this.setState({errorMessage : ""})
        this.setState({[event.target.name] : event.target.value});
    }

    handleSignup(){
        const {email,password} = this.state;
        if(this.validate()){
            axios.post('http://localhost:8080/users/register', {
                email,
                password
              })
              .then((response) => {
                console.log(response);
                if(response.status === 200){
                    this.props.history.push('/');
                }
                else{ 
                    console.log("User Account Already present");
                   
                }
              })
              .catch((error) => {
                this.setState({errorMessage : error.response.data.msg});
              });
        }
    }
    
    render(){
        const {email,password,conformPassword,errorMessage} = this.state
        return(
            <div className = "mainContainer">
                <div className = "container">
                    <div><h1>Sign Up</h1></div>
                    <div className = "errorText">{errorMessage}</div>
                    <div className = "text">Email Id <span className = "errorText">*</span></div>
                    <input type = "text" name = "email" value ={email} placeholder = "Enter Email Id" className = "inputField"onChange ={this.handleChange}/>
                    <div className = "text">Password <span className = "errorText">*</span></div>
                    <input type = "password" value ={password} name = "password" placeholder = "Enter Password" className = "inputField" onChange ={this.handleChange}/>
                    <div className = "text">Conform Password <span className = "errorText">*</span></div>
                    <input type = "password" value ={conformPassword} name = "conformPassword" placeholder = "Reenter Password" className = "inputField" onChange ={this.handleChange}/>
                    <button className = "btn" onClick = {this.handleSignup}>Signup</button>
                    <div>Already have a account <Link to = "/signin">Login</Link></div>
                </div>
            </div>
        );
    }
}
export default SignUp;