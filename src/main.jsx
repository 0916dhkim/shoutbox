import React from 'react';
import ReactDOM from 'react-dom';
import ChatList from './chatlist.jsx';

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
        </div>
    ),
    document.getElementById('root')
);
