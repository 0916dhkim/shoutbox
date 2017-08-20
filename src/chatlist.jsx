import React from 'react';
import ChatElement from './chatelement.jsx';

function messageToChatElement(message) {
    return <ChatElement key={message.id} sender={message.sender} content={message.content} date={message.date} />
}

function recursiveAddMessage(message, list, index) {
    if (message.date < list[index].date) {
        // If new message is earlier than the message at index,
        // insert new message at index.
        return list.slice().splice(index,0,message);
    } else if (message.date > list[index].date) {
        // If new message is older than the message at index,
        if (index < list.length) {
            // If there are unchecked messages in the list,
            // move to the next index.
            return recursiveAddMessage(message, list, index + 1);
        } else {
            // If new message is older than all messages in the list,
            // concat new message at the end of the list.
            return list.concat([message]);
        }
    } else {
        // If message has same time as the message at index,
        if (message.id === list[index].id) {
            // If two messages are identical,
            // do not add new message to the list
            // because it is already in the list.
            return list.slice();
        } else {
            // If two messages are not identical (with the same time),
            // insert new message at index.
            return list.slice().splice(index,0,message);
        }
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);

        // Bind methods that needs access to props and state of the component.
        this.addMessage = this.addMessage.bind(this);
        this.updateChat = this.updateChat.bind(this);

        this.state = {
            messages: [],
            lastUpdate: new Date().getTime()
        };
    }

    addMessage(message) {
        this.setState((prevState, props) => {
            if (prevState.messages.length === 0) {
                // If there was no message in the list before,
                return { messages: [message] };
            } else {
                return { messages: recursiveAddMessage(message, prevState.messages, 0) };
            }
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
                    res.forEach(message => this.addMessage(message));
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
