import React, { Component } from 'react'
import axios from 'axios'
import "./Home.css"

class Home extends Component{

    componentDidMount(){
        if(!window.localStorage.getItem('login')){
            this.props.history.push('/');
        }
        else{
            const login = JSON.parse(window.localStorage.getItem('login'))
            axios.get('http://localhost:8080/users/', {
            headers: { 'x-auth-token': login.token }
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        
    }

    handleLogout = () => {
        window.localStorage.removeItem('login');
        this.props.history.push('/');
    }

    handleNavigate = () =>{
        this.props.history.push('/updatepassword');
    } 

    render(){
        return(
            <div className = "homeContainer">
                <header className = "header">
                    <button className = "homeBtn" onClick = {this.handleNavigate}>Change Password</button>
                    <button className = "homeBtn" onClick = {this.handleLogout}>Logout</button>
                </header>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiyoC3ppdWIAIIzGWDJnFCYykVfbTqgLdYoA&usqp=CAU" alt = "welcome" className = "image"/>
            </div>
        );
    }
}
export default Home;