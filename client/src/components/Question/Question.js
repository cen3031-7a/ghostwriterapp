import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import TextBox from '../../components/TextBox/TextBox';

class Question extends Component {
	
	textRes =(text) => {
		var question = this.props.question;
		var id = this.props.id;
		this.props.callbackQ(
		{
			id: id,
			question: question,
			text: text
		});
	}

    render() {

		
		return(
        <div className="App">	
			<div className="textBox">
		<Collapsible transitionTime={200} trigger={this.props.question}>
			<TextBox callbackText={this.textRes} />
		</Collapsible>
			</div>
		</div>
		
		);
		
    }
  
}


export default Question;