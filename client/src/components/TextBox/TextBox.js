import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './TextBox.css';

class TextBox extends Component {

	constructor(props) {
	 
		super(props);
		this.state = { text: '' };
		this.change = this.change.bind(this);
	
	}

	change(value) {
	  
		this.setState({ text: value });
	
	}

	render() {
		return (
			<div>
			
				 <ReactQuill 
					theme='snow'
					className="textBox"
					value={this.state.text}
					onChange={this.change} 
				/>
				
			</div>
		)
	}
  
}

export default TextBox;