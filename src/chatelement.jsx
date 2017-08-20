import React from 'react';
import style from './chat.css.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Focus a chat element on mount.
        this.container.scrollIntoView({block: 'end', behaviour: 'smooth'});
    }

    render() {
        return (
            <div ref={x=>this.container=x} style={style.chatElement}>
                <div style={style.chatSender}>{this.props.sender}</div>
                <div style={style.chatContent}>{this.props.content}</div>
                <div style={style.chatDate}>{new Date(this.props.date).toISOString()}</div>
            </div>
        );
    }
}
