import React, {Component} from 'react';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.css';
import './AdminPage.css'
import { X } from 'react-feather'
import { Accordion, Button, Card } from 'react-bootstrap';

var sectionData;

class AdminPage extends Component {
	
	constructor(props)
	{
		super(props);
		this.state = 
		{
			order: []
		}
	}
	
	getData = () => {
	  
		fetch('/api/sections?include_questions=true')
			.then((data) => data.json())
			.then((res) => this.setState({data: res.sections}));
	  
	}
		
	postOrder = (order) => {
		
		fetch('/api/users/timeline?AuthID=edc620fe-1003-4da6-846f-a4abee80fbd8', {
			
			method: 'POST',
			body: 
				JSON.stringify({timeline: order}),
			headers: 
			{
				'Content-Type': 'application/json'
            }
			
		})
		.then(function(response)
		{
			return response;
		})
		.then(function(body)
		{
			console.log('posting', body);
		}); 
		
		this.getData();

	}
	
	
	orderUpdate(value)
	{
	  
		this.setState ({
			order: value
		})
			
		this.postOrder(value);

	}
	
	parentDash = (text) =>
	{

		this.props.callbackQPage(text);
		
	}
	
    render() {
		
		const data = this.props.data;
		console.log(data)
		
		sectionData = data
			.map((q, i) => {
				
			console.log(q.questions)
			var questions = q.questions.map((r, i) => { 
				return(
					<Card id={r.questionid} style={{padding: '5px', margin: '5px', borderRadius: '3px', backgroundColor: '#fafafa', border: '.5px solid silver'}}> 
						<p style={{width: '98%'}}> Question {i + 1}: <X size='20px' style={{float: 'right', color: 'red'}}  /> </p> 
						<textarea style={{width: '100%', height: '100px', margin: 'auto', resize: 'none'}} defaultValue={r.question} />
						</Card>) });

			console.log(data[data.findIndex((e) => e.sectionid === q.sectionid)])
				return(
				
					<Accordion id={q.sectionid} defaultActiveKey="0" style={{backgroundColor: 'e0e0e0', width: '75%', margin: 'auto'}} key={q.sectionid}>
						<Card style={{borderRadius: '3px', backgroundColor: '#fafafa', border: '.5px solid silver'}}>
						
							<Accordion.Toggle as={Card.Header} className="accHeader" eventKey="1">
								<X size='20px' style={{left: '0', color: 'red'}}  />
								<div style={{display: 'inline', padding: '5px'}}> {data[data.findIndex((e) => e.sectionid === q.sectionid)].sectionname} </div>
							</Accordion.Toggle>
							
							<Accordion.Collapse eventKey="1">
								<Card.Body>
									<Button>Add Question</Button>
									<div className="section" ref={this.dragQuestion}>
									{questions}
									</div>
								</Card.Body>
							</Accordion.Collapse>

						</Card>
					</Accordion>
					
				)
				
			})
		
		return(
		
			<div className="App">
			
				<Button style={{margin: '5px'}}>Add Section</Button>
					{sectionData}			
				
			</div>

		);
		
    }
  
	dragQuestion = (componentBackingInstance) => {
	  
		if (componentBackingInstance) {
			
		  let options = { };
		  const dragula = Dragula([componentBackingInstance], options);
		  dragula.on('drop', (el, target, source, sibling) => {
			  
			 var newOrder = [];
	
			  for(var i = 0; i < target.childNodes.length; i++)
				  newOrder[i] = {questionid: target.childNodes[i].id};
			  
			console.log(newOrder);
				  
			  
		  })
		  
		}
		
	};
  
}


export default AdminPage;