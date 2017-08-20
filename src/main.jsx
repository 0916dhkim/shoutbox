import React from 'react';
import ReactDOM from 'react-dom';
import ChatList from './chatlist.jsx';
import ChatForm from './chatform.jsx';

class Greeting extends React.Component {
    render() {
        return (
            <h1>Good Morning!</h1>
        );
    }
}

ReactDOM.render(
    (
        <div>
            <Greeting />
            <ChatList />
            <ChatForm />
        </div>
    ),
    document.getElementById('root')
);
