import React, { Component } from 'react'
import axios from 'axios'
import "../SignIn/SignIn.css"

class UpdatePassword extends Component{
    constructor(){
        super();
        this.state = {
            password : "",
            conformPassword : "",
            message : "",
            errorMessage : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount(){
        if(!window.localStorage.getItem('login')){
            this.props.history.push('/');
        }
    }

    validate(){
        const {password,conformPassword} = this.state;
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!password || !conformPassword){
            this.setState({errorMessage : "Enter all mandatory fields"});
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

    handleUpdate(){
        if(this.validate()){
            const login = JSON.parse(window.localStorage.getItem('login'))
        axios.put(`http://localhost:8080/users/updatepassword/${login.user.id}`, {
            data : {password : this.state.password},
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({password : ""})
                this.setState({conformPassword : ""})
                this.setState({message : "Password Updated Successfully"})
            }
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        }
    }
    
    render(){
        const {password,conformPassword,message,errorMessage} = this.state
        return(
            <div className = "mainContainer">
                <div className = "container">
                    <div><h1>Update Password</h1></div>
                    {errorMessage && <div className = "errorText">{errorMessage}</div>}
                    {message && <div style={{color: "green", fontSize : "18px"}}>{message}</div>}
                    <div className = "text"> New Password <span className = "errorText">*</span></div>
                    <input type = "password" value ={password} name = "password" placeholder = "Enter New Password" className = "inputField" onChange ={this.handleChange}/>
                    <div className = "text">Conform Password <span className = "errorText">*</span></div>
                    <input type = "password" value ={conformPassword} name = "conformPassword" placeholder = "Reenter Password" className = "inputField" onChange ={this.handleChange}/>
                    <button className = "btn" onClick = {this.handleUpdate}>Change Password</button>
                </div>
            </div>
        );
    }
}
export default UpdatePassword;