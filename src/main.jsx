import React from 'react';
import ReactDOM from 'react-dom';
import ChatList from './chatlist.jsx';
import ChatForm from './chatform.jsx';
import style from './chat.css.js';

class Greeting extends React.Component {
    render() {
        return (
            <h1 style={style.greeting}>
                Good Morning!
            </h1>
        );
    }
}

ReactDOM.render(
    (
        <div style={style.root}>
            <Greeting />
            <ChatList />
            <ChatForm />
        </div>
    ),
    document.getElementById('root')
);
