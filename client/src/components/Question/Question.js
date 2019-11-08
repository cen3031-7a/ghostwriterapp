import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
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
				<Accordion defaultActiveKey="0">
					<Card style={{borderRadius: '3px', backgroundColor: '#f8f8f8', border: '.5px solid silver', margin: '1px'}}>
						<Accordion.Toggle as={Card.Header} className="accHeader" eventKey="1">
							{this.props.question}
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="1">
							<Card.Body>
								<TextBox callbackText={this.textRes} />
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