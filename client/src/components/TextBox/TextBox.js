import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextBox.css';

class TextBox extends Component {

	constructor(props) {
	 
		super(props);
		this.state = { text: '' };
		this.change = this.change.bind(this);
	
	}

	change(value) {
	  
		this.setState({ text: value });
		this.props.callbackText(this.state);
	
	}

	render() {
		return (
			<div className="innerTextBox">
			
				 <ReactQuill 
					theme='snow'
					value={this.state.text}
					onChange={this.change} 
				/>
				
			</div>
		)
	}
  
}

export default TextBox;