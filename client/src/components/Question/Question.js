import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import {CheckCircle} from 'react-feather'
import TextBox from '../../components/TextBox/TextBox';

class Question extends Component {
	
	constructor(props) {

		super(props);
		this.state = 
		{
			//Store whether user has response and if so store response
			text: (this.props.resText !== undefined) ? this.props.resText.response : '',
			isSaved: (this.props.resText !== undefined && this.props.resText.response !== '') ? true: false
			
		 };

	}

	//Set current text state and send response to server
	textRes =(text) => {
		
		this.setState({text: text})
		this.sendRes();
		
	}
	
	//Callback function to App.js to post to server
	sendRes() {

		var id = this.props.id;
		var question = this.props.question;
		var text = this.state.text;
		
		this.setState({isSaved: true});
		
		this.props.callbackQ({
			id: id,
			question: question,
			text: text
		});
		
	}

	toggleQuestionBoolean = (id) =>{
		this.props.toggleQuestionBoolean(id)
	}
	
	unSave(cond) {if(cond) this.setState({isSaved: false})}

    render() {

		//Render bootstrap accordion box with question TextBox, icons, and question text
		return(
		
			<div className="App">	
				<div className="textBox">
				
					<Accordion defaultActiveKey="0" onClick = {() => this.toggleQuestionBoolean(this.props.id)}>
						<Card style={{borderRadius: '3px', backgroundColor: '#f8f8f8', border: '.5px solid silver', margin: '1px'}}>
						
							<Accordion.Toggle as={Card.Header} className="accHeader" style={{fontSize: '1rem'}} eventKey="1">
								<CheckCircle size='20px' style={{float: 'left', color: 'green', visibility: this.state.isSaved ? 'visible' : 'hidden', display: 'inline', padding: '2px'}}  />
								{this.props.question}
							</Accordion.Toggle>
							
							<Accordion.Collapse eventKey="1"  onExit={this.sendRes.bind(this)}>
								<Card.Body>
									<TextBox isTyping={this.unSave.bind(this)} callbackText={this.textRes} resText={this.props.resText} />
								</Card.Body>
							</Accordion.Collapse>
							
						</Card>
					</Accordion>
					
				</div>
			</div>
		
		);
		
    }
  
}


export default Question;