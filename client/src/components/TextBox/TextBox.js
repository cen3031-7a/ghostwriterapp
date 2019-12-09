import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextBox.css';

class TextBox extends Component {
	
	//saving state: 0 - saved/not typed yet, 1 - currently typing, 2 - stopped typing

	constructor(props) {

		super(props);
		this.state = {text: ((this.props.resText !== undefined) ? this.props.resText.response : ''), saving: 0};
		this.onChange = this.onChange.bind(this);

	}
	
		componentDidMount() {
		
			let interval = setInterval(this.saveInfo.bind(this), 5000);
			
		}
	
	//Front-end autosaving, checks and updates status every 5 seconds between: typing, not typing, and currently saved
	saveInfo = () =>
	{
		
		if(this.state.saving === 1) this.setState({saving: 2});
		
		if(this.state.saving === 2)
		{
			this.setState({saving: 0});
			console.log('posted', this.state.text);
			this.props.callbackText(this.state.text);
		}
		
	}

	//On type, set state to typing, set text value
	onChange(value) {
		
		this.setState({ text: value });
		this.setState({saving: 1});
		this.props.isTyping(true);
	
	}

	render() {

		//Render ReactQuill rich text box
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