import React from 'react';
import style from './chat.css.js';

export default class extends React.Component {
    constructor(props) {
        super(props);

        // Bind methods.
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSenderChange = this.handleSenderChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);

        // Set default state.
        this.state = {
            sender: 'anonymous',
            content: 'Hi, there!'
        }
    }

    handleSubmit(e) {
        // Remove content.
        this.setState({ content: '' });

        // Send message to the server.
        var req = new XMLHttpRequest();
        req.open('POST', './message', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({
            sender: this.state.sender,
            content: this.state.content,
            date: Date.now()
        }));

        // Prevent default form handling.
        e.preventDefault();
    }

    handleSenderChange(e) {
        this.setState({ sender: e.target.value });
    }

    handleContentChange(e) {
        this.setState({ content: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={style.chatForm}>
                <input type='text' value={this.state.sender} onChange={this.handleSenderChange} />
                <input type='text' value={this.state.content} onChange={this.handleContentChange} />
                <input type='submit' style={{display:'none'}} />
            </form>
        );
    }
}
