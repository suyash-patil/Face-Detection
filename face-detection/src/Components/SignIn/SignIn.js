import React, { Component } from 'react';
import './SignIn.css';
import {FaGithub,FaLinkedin} from 'react-icons/fa';

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            SignInEmail: '',
            SignInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({SignInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({SignInPassword: event.target.value})
    }
    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        }).then(response => response.json())
        .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        else {
            const warnings = document.querySelector('.warnings');
            const pass = document.querySelector('.pass');
            pass.style.background = "#ff0000";
            warnings.textContent = "You entered incorrect password";
            console.log('You entered wrong password');
        }
      })
    }
    render() {
        const {onRouteChange} = this.props;
        return (
            <div className="pt5 pl3 pr3">
                <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                    <main className="pa3 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0 fonts center">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.onEmailChange} 
                                    className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.onPasswordChange} 
                                    className="b pass pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"/>
                                </div>
                            </fieldset>
                            <div>
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer fonts f6 dib" 
                                    type="submit" 
                                    value="Sign in" 
                                    onClick={this.onSubmitSignIn}
                                />
                            </div>
                            <div className="lh-copy mt3">
                            <p onClick={()=>onRouteChange('register')} className="f6 link dim black db fonts pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
                <div className="warnings"></div>      
                <div>
                <p>Created by
                <a href="https://github.com/suyash-patil" target="_blank" rel="noopener noreferrer"> <FaGithub className="icons"/> suyash-patil</a>
                </p>
                <p><a href="https://linkedin.com/in/suyash-patil" target="_blank" rel="noopener noreferrer"> <FaLinkedin className="icons"/> Suyash Patil</a></p>
                </div>       
            </div>
        );
    }
    
}

export default SignIn;