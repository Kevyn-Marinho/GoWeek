import React, { Component } from 'react';

import './Login.css'
import twitterLogo from '../twitter.svg'

export default class Login extends Component {
  
    state = {
        username : '',
    };
  
    handleInputChange = (event) => {
        this.setState({ username : event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { username } = this.state;

        if(!username.length) return;

        localStorage.setItem('@GoTwitter:username', username);

        this.props.history.push('/timeline');

    };

  render() {
    return (
        <div className="login-wrapper">
            <img src={twitterLogo} alt="GoTwitter"/> 
        
            <form onSubmit={this.handleSubmit}>
                <input 
                    value={this.state.username}
                    onChange={this.handleInputChange}    
                    placeholder="Nome do usuário"
                />
                <button type="submit" > Entrar </button>
            </form>
        </div>
    );
  }
}
