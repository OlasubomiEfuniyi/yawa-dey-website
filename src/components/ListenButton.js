import React from 'react';

class ListenButton extends React.Component {
    render() {
        return <div className="ListenButtonContainer"><i className={this.props.iconClasses} aria-hidden="true"></i> <span className = {this.props.textClasses}>{this.props.text}</span></div>
    }
}

export default ListenButton;