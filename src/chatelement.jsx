import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>{this.props.sender}</div>
                <div>{this.props.content}</div>
                <div>{new Date(this.props.date).toISOString()}</div>
            </div>
        );
    }
}
