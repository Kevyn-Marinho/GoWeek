import React, { Component } from 'react';

import './Timeline.css';
import twitterLogo from '../twitter.svg';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';


export default class Timeline extends Component {

    state = {
        tweets: [],
        newTweet : '',
    };
  
    async componentDidMount() {
        this.subscribeToEvents();

        const response = await api.get('tweets');

        this.setState({tweets: response.data});
    }

    handleInputChange = (event) => {
        this.setState({ newTweet : event.target.value });

    };

    handleNewTweet = async event => {
        if(event.keyCode !== 13) return;
    
    
        const content = this.state.newTweet;
        const author = localStorage.getItem("@GoTwitter:username");
    

         this.setState({newTweet:''});

         await api.post('tweets', { content, author});
    };

    subscribeToEvents = () => {

        const io = socket('http://localhost:3000');

        io.on('tweet', 
            data => {
                this.setState({ tweets : [data, ...this.state.tweets]});
            }
        );

        io.on('like', data => {
            this.setState( { tweets: this.state.tweets.map(
                tweet => tweet._id === data._id ? data : tweet) } )
        });


    };

render() {
    return (

        <div className="timeline-wrapper">
            <img src={twitterLogo} height={24} alt="logo GoTwitter" />

            <form>
                <textarea
                    value={this.state.newTweet}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleNewTweet}
                    placeholder="O que está acontecendo?"
                />
            </form>
        
            <ul className="tweet-list">
            {
                this.state.tweets.map( (tweet) => (

                    <Tweet key={tweet._id} tweet={tweet} />
                ))
            }
            </ul>
        </div>
    );
  }
}
