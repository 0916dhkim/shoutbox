import React from 'react';

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
            <div ref={x=>this.container=x}>
                <div>{this.props.sender}</div>
                <div>{this.props.content}</div>
                <div>{new Date(this.props.date).toISOString()}</div>
            </div>
        );
    }
}
