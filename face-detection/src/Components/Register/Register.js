import React, { Component } from 'react';
import validator from 'email-validator';
import './Register.css';
import {FaGithub,FaLinkedin} from 'react-icons/fa';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: ''
        }
    }
    onNameChange = (event) => {
        this.setState({username: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onSubmitRegister = () => {
        if(!(validator.validate(this.state.email))){
            const warnings = document.querySelector('.warnings');
            const emailadd = document.querySelector('.email-add');
            emailadd.style.background = "#d93025";
            console.log("You have entered wrong Invalid email address");
            warnings.textContent = "Please enter a valid email address";
        }
        else if(this.state.username.length < 3) {
            const warnings = document.querySelector('.warnings');
            const usernam = document.querySelector('.usernam');
            usernam.style.background = "#d93025";
            warnings.textContent = "Username should contain a minimum of 3 characters";
        }
        
        else if(this.state.password.length < 4) {
            const warnings = document.querySelector('.warnings');
            const pass = document.querySelector('.pass');
            pass.style.background = "#d93025";
            warnings.textContent = "Please enter a minimum of 4 characters while creating password";
        }
        
        else {
        fetch('http://localhost:3000/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            })
        }).then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }
}
    
    render() {
        return (
            <div className="pt5 pl3 pr3">
                <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                    <main className="pa3 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input className="pa2 usernam input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                                    onChange={this.onNameChange}
                                    type="text" 
                                    name="name"  
                                    id="name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 email-add input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                                    onChange={this.onEmailChange} 
                                    type="email"
                                    name="email-address"  
                                    id="email-address" />
                                    
                                </div>
                                
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="pass b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                                    onChange={this.onPasswordChange} 
                                    type="password" 
                                    placeholder="Minimum 4 characters"
                                    name="password" 
                                    id="password"/>
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer fonts f6 dib" 
                                    type="submit" 
                                    value="Register" 
                                    onClick={this.onSubmitRegister}
                                />
                            </div>
                        </div>
                    </main>
                </article>
                <div className="warnings">
                <div>
                <p>Created by
                <a href="https://github.com/suyash-patil" target="_blank" rel="noopener noreferrer"> <FaGithub className="icons"/> suyash-patil</a>
                </p>
                <p><a href="https://linkedin.com/in/suyash-patil" target="_blank" rel="noopener noreferrer"> <FaLinkedin className="icons"/> Suyash Patil</a></p>
                </div>  
                </div>
            </div>
        );
    }
}

export default Register;