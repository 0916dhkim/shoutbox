import React from 'react';
import ChatElement from './chatelement.jsx';

function messageToChatElement(message) {
    return <ChatElement key={message.id} sender={message.sender} content={message.content} date={message.date} />
}

export default class extends React.Component {
    constructor(props) {
        super(props);

        // Bind methods that needs access to props and state of the component.
        this.addMessages = this.addMessages.bind(this);
        this.updateChat = this.updateChat.bind(this);

        this.state = {
            messages: [],
            lastUpdate: new Date().getTime()
        };
    }

    addMessages(messages) {
        this.setState((prevState, props) => {
            var ret = [];
            var prevIndex = 0;
            var curIndex = 0;

            while (prevIndex < prevState.messages.length || curIndex < messages.length) {
                if (prevIndex === prevState.messages.length) {
                    // If end of previous messages,
                    // add a new message.
                    ret.push(messages[curIndex++]);
                } else if (curIndex === messages.length) {
                    // If end of new messages,
                    // add a previous message.
                    ret.push(prevState.messages[prevIndex++]);
                } else if (messages[curIndex].date < prevState.messages[prevIndex].date) {
                    // If new message is earlier than previous message,
                    // add a new message.
                    ret.push(messages[curIndex++]);
                } else if (messages[curIndex].date > prevState.messages[prevIndex].date) {
                    // If previous message is earlier than new message,
                    // add a previous message.
                    ret.push(prevState.messages[prevIndex++]);
                } else {
                    // If previous message has same date as new message,
                    // compare message id.
                    if (prevState.messages[prevIndex].id === messages[curIndex].id) {
                        // If two messages are identical,
                        // only add previous message.
                        ret.push(prevState.messages[prevIndex++]);
                        curIndex++;
                    } else {
                        // If two messages are different (with same date),
                        // add both messages.
                        ret.push(prevState.messages[prevIndex++]);
                        ret.push(messages[curIndex++]);
                    }
                }
            }

            return {messages: ret};
        });
    }

    updateChat() {
        var req = new XMLHttpRequest();
        var url = './messages/since/date/' + this.state.lastUpdate;
        req.open('GET', url, true);

        // Handle ready state changes.
        req.onreadystatechange = () => {
            var res = null;
            if (req.readyState === 4) {
                // When request is complete.
                if (req.status === 200) {
                    // When request is successful.
                    // Try parsing server response.
                    try {
                        res = JSON.parse(req.responseText);
                    } catch (e) {
                        console.log("JSON parsing failed");
                    }
                } else {
                    console.log("Failed to receive messages from the server");
                }

                if (res) {
                    // If parsing is successful.
                    // Add messages into list.
                    this.addMessages(res);
                }
            }
        };

        // Send request.
        req.send();
    }

    componentDidMount() {
        setInterval(this.updateChat, 500);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>{this.state.messages.map(messageToChatElement)}</div>
        );
    }
}
