import React from 'react';

class ListenButton extends React.Component {
    render() {
        return <div className="ListenButtonContainer"><a href = {this.props.linkTo} className = "ListenButtonLink"><i className={this.props.iconClasses} aria-hidden="true"></i> <span className = {this.props.textClasses}>{this.props.text}</span></a></div>
    }
}

export default ListenButton;