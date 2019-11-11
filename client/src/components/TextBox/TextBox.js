import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextBox.css';

class TextBox extends Component {

	constructor(props) {

		super(props);
		this.state = {text: this.props.resText.response};
		this.onChange = this.onChange.bind(this);

	}

	onChange(value) {
		
		this.setState({ text: value });
		this.props.callbackText(this.state);
	
	}

	render() {

		return (
			<div className="innerTextBox">
			
				 <ReactQuill 
					theme='snow'
					value={this.state.text || ''}
					onChange={this.onChange} 
				/>
				
			</div>
		)

	}

}

export default TextBox;