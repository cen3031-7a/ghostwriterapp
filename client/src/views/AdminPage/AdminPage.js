import React, {Component} from 'react';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.css';
import './AdminPage.css'
import { AlignJustify, CheckCircle, ChevronDown, X } from 'react-feather'
import { Accordion, Button, Card } from 'react-bootstrap';
import {uuid} from 'uuidv4';

var sectionData;

class AdminPage extends Component {
	
	constructor(props)
	{
		super(props);
		this.state = 
		{
			order: [],
			token: this.props.token,
			data: this.props.data,
			dragSections: true,
			link: ''
		}
	}
	
	componentDidMount() {
		
		this.getData();
		
	}
	
	getData = () => {
		
		fetch('/api/sections?include_questions=true&AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'GET',
			headers:
			{
				'Authorization': this.state.token
			}
			
		})
			.then((data) => data.json())
			.then((res) => this.setState({data: res.sections}))
			.then(() => console.log("GOT DATA"));
		
		console.log('reading')
			
		fetch('/api/users/info?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'GET',
			headers:
			{
				'Authorization': this.state.token
			}
			
		})
			.then((data) => data.json())
			.then(function(body)
		{
			console.log(body)
		});
	  
	} 
		
	postQOrder = (order, ID) => {
		
		fetch('/api/sections/' + ID + '/questions?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'POST',
			body: 
				JSON.stringify({questions: order}),
			headers: 
			{
				'Content-Type': 'application/json',
				'Authorization': this.state.token
            }
			
		})
		.then(function(response)
		{
			return response;
		})
		.then(function(body)
		{
			console.log('id', ID)
			console.log('posting', body);
		})
		.then(() => this.getData());

	}
	
	postQText = (order, ID) => {
		
		fetch('/api/sections/' + ID + '/questions?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'POST',
			body: 
				JSON.stringify({questions: order}),
			headers: 
			{
				'Content-Type': 'application/json',
				'Authorization': this.state.token
            }
			
		})
		.then(function(response)
		{
			return response;
		})
		.then(function(body)
		{
			console.log('id', ID)
			console.log('posting', body);
		})
		.then(() => this.getData());

	}
	
	postSection = (order, ID) => {
		
		fetch('/api/sections/' + ID + '?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'POST',
			body: 
				JSON.stringify(order),
			headers: 
			{
				'Content-Type': 'application/json',
				'Authorization': this.state.token
            }
			
		})
		.then(function(response)
		{
			return response;
		})
		.then(function(body)
		{
			console.log('id', ID)
			console.log('posting', body);
		})
		.then(() => this.getData());

	}
	
	postSecOrder = (order) => {
		
		console.log('posting!!', order)
		
		fetch('/api/sections?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'POST',
			body: 
				JSON.stringify({sections: order}),
			headers: 
			{
				'Content-Type': 'application/json',
				'Authorization': this.state.token
            }
			
		})
		.then(function(response)
		{
			return response;
		})
		.then(function(body)
		{
			console.log('posting', body);
		})
		.then(() => this.getData());

	}
	
	submitLink = (event) =>
	{
		
		event.preventDefault();
		this.postYoutube(event.target.parentNode.childNodes[1].childNodes[1].value);
		
	}
	
	postYoutube = (ytlink) => {
		
		console.log(ytlink)
		fetch('/api/publicdata/front-page-youtube-link?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'POST',
			body: 
				JSON.stringify({link: ytlink}),
			headers: 
			{
				'Content-Type': 'application/json',
				'Authorization': this.state.token
            }
			
		})
		.then(function(response)
		{
			return response;
		});

	}
	
	
	
	deleteSection = (ID) => {
		
		fetch('/api/sections/' + ID + '?AuthID=4c57b17d-a91f-4b75-a10b-17460bfa1a10', {
			
			method: 'DELETE',
			headers: 
			{
				'Content-Type': 'application/json',
				'Authorization': this.state.token
            }
			
		})
		.then(function(response)
		{
			return response;
		})
		.then(function(body)
		{
			console.log('id', ID)
			console.log('posting', body);
		})
		.then(() => this.getData());
		
	}
	
	addSection = () =>
	{

		var tempData = this.state.data;
		tempData.push(
		{
			sectionname: '',
			sectionid: uuid(),
			tips: [],
			questions: [],
			isDeleted: false
		});
		this.setState({data: tempData});
		console.log(this.state.data);
		
	}
	
	addQuestion = (sectionID) =>
	{
		
		var tempData = this.state.data;
		tempData[tempData.findIndex((e) => e.sectionid === sectionID)].questions.push(
		{
			question: '',
			questionid: uuid(),
			tips: [],
			isDeleted: false
		});
		this.setState({data: tempData});
		
		console.log(this.state.data)
		
	}
	
	removeQuestion = (sID, qID) =>
	{
		
		var tempData = this.state.data;
		var questions = tempData[tempData.findIndex((e) => e.sectionid === sID)].questions;
		
		console.log(questions)
		console.log(qID)
		questions.splice(questions.findIndex((e) => e.questionid === qID), 1);
		console.log(questions)
		
		this.postQText(questions, sID);
		
	console.log('working')
		
	}
	
	updateSection = (event) =>
	{
		
		event.preventDefault();
		event.target.parentNode.childNodes[2].style.visibility = 'visible';
		
		var sID = event.target.parentNode.childNodes[1].id;
		
		var tempData = this.state.data;
		
		var section = tempData[tempData.findIndex((e) => e.sectionid === sID)];
		section.sectionname = event.target.childNodes[0].value;
		
		this.postSection(section, sID);
		
	}
	
	updateQuestion = (event) =>
	{
		
		event.preventDefault();
		
		event.target.childNodes[0].childNodes[2].style.visibility = 'visible';
		
		var secID = event.target.childNodes[1].getAttribute('sectionid');
		var qID = event.target.childNodes[1].getAttribute('questionid');
		
		var tempData = this.state.data;
		
		var questions = tempData[tempData.findIndex((e) => e.sectionid === secID)].questions;
		
		questions[questions.findIndex((e) => e.questionid === qID)].question = event.target.childNodes[1].value;
		
		this.postQText(questions, secID);

	//	var tempData = this.state.data;
	//	tempData[tempData.findIndex((e) => e.sectionid === secID)].questions[tempSection.questions.findIndex((e) => e.questionid === qID)].question = event.target.value;
		
	//	this.setState({data: tempData});
		
	}
	
    render() {
		
		const data = this.state.data;
		if(this.state.dragSections) console.log('draggable')
			else console.log('not')
		
		sectionData = data
			.map((q, i) => {

			var questions = q.questions.map((r, i) => { 
				return(
					<Card key={r.questionid} id={r.questionid} sectionid={q.sectionid} style={{margin: '5px', borderRadius: '3px', backgroundColor: '#fafafa', border: '.5px solid silver'}}> 
						<form onSubmit={this.updateQuestion}>
						<p style={{width: '98%'}}> 
							<AlignJustify style={{float: 'left'}} />
							<input type="submit" style={{margin: '1px', marginLeft: '10px', backgroundColor: '#0275d8', color: 'white', borderRadius: '3px', border: 'none'}} value="Save"></input>  
							<CheckCircle size='20px' style={{margin: 'auto', color: 'green', visibility: (r.question != '') ? 'visible' : 'hidden', display: 'inline', padding: '2px', marginLeft: '5px'}}  />
							<X size='20px' style={{float: 'right', color: 'red'}}   onClick={() => this.removeQuestion(q.sectionid, r.questionid)} /> 
						</p> 
						
						<textarea questionid={r.questionid} onChange={(event) => event.target.parentNode.childNodes[0].childNodes[2].style.visibility = 'hidden' } sectionid={q.sectionid} style={{width: '100%', height: '100px', margin: 'auto', resize: 'none'}} defaultValue={r.question} />
						</form>
						
						</Card>) });

				return(
				
					<Accordion id={q.sectionid} draggable={this.state.dragSections.toString()} defaultActiveKey="0" style={{backgroundColor: 'e0e0e0', width: '75%', margin: 'auto'}} key={q.sectionid}>
						<Card style={{borderRadius: '3px', backgroundColor: '#fafafa', border: '.5px solid silver'}}>
						<div style={{display: 'inline', padding: '5px'}}> 
							
							<AlignJustify size='20px' style={{float: 'left', margin: '5px', display: 'inline'}} />
								
							<form id={q.sectionid} style={{display: 'inline'}} onSubmit={this.updateSection}>
								<input type="text" onChange={(event) => event.target.parentNode.parentNode.childNodes[2].style.visibility = 'hidden' } style={{width: '70%'}} defaultValue={data[data.findIndex((e) => e.sectionid === q.sectionid)].sectionname} /> 
								<input type="submit" style={{margin: '1px', marginLeft: '10px', backgroundColor: '#0275d8', color: 'white', borderRadius: '3px', border: 'none'}} value="Save"></input>  
							</form>

							<CheckCircle size='20px' style={{margin: 'auto', color: 'green', visibility: (data[data.findIndex((e) => e.sectionid === q.sectionid)].sectionname != '') ? 'visible' : 'hidden', display: 'inline', padding: '2px', marginLeft: '5px'}}  />

							<X size='20px' style={{float: 'right', color: 'red', display: 'inline'}} onClick={() => this.deleteSection(q.sectionid)}/>
								
						</div>
						<Accordion.Toggle as={Card.Header} className="accHeader" eventKey="1">
								Click to View Questions
							</Accordion.Toggle>
							
							<Accordion.Collapse eventKey="1" onEnter={() => this.setState({dragSections: false})} onExit={() => this.setState({dragSections: true})}>
								<Card.Body>
									<Button style={{margin: '5px'}} onClick={() => this.addQuestion(q.sectionid)}>Add Question</Button>
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
			<Card>
			<div style={{margin: '2.5%'}}>
			Home Page Video (Youtube Link): <form onSubmit={this.submitLink}> <input type='text' style={{width:' 50%'}} /> <input type="submit" style={{margin: '1px', marginLeft: '10px', backgroundColor: '#0275d8', color: 'white', borderRadius: '3px', border: 'none'}} value="Save"></input>  </form>
			</div>
			</Card>
			<div>
				<Button style={{margin: '1%', marginLeft: '10%'}} onClick={this.addSection}>Add Section</Button>
				NOTE: Please save Questions before rearranging them. This is to prevent empty questions from being posted.
				<div className="section" ref={this.dragSection}>
					{sectionData}
				</div>
			</div>
				
			</div>

		);
		
    }
  
	dragQuestion = (componentBackingInstance) => {
	  
		if (componentBackingInstance) {
			
		  let options = {
				moves: function (el, source, handle, sibling) {
					if(el.childNodes[0].childNodes[0].childNodes[2].style.visibility == 'visible') return true;
					else return false;
				},
			};
		  const dragula = Dragula([componentBackingInstance], options);
		  dragula.on('drop', (el, target, source, sibling) => {
			  
			 var newOrder = [];
	
			  for(var i = 0; i < target.childNodes.length; i++)
				  newOrder[i] = {questionid: target.childNodes[i].id};
			  
			console.log(newOrder);
			
			this.postQOrder(newOrder, target.childNodes[0].getAttribute('sectionid'));
				  
			  
		  })
		  
		}
		
	};
	
	dragSection = (componentBackingInstance) => {

		if (componentBackingInstance) {
			let options = {
				moves: function (el, source, handle, sibling) {
					if(el.getAttribute('draggable') == 'true') return true;
					else return false;
				},
			};
		  const dragula = Dragula([componentBackingInstance], options);
		  dragula.on('drop', (el, target, source, sibling) => {
			  
			 var newOrder = [];
	
			  for(var i = 0; i < target.childNodes.length; i++)
				  newOrder[i] = target.childNodes[i].id;
			  
			console.log(newOrder);
			
			this.postSecOrder(newOrder);
			
		  })
		  
		}
		
	};
  
}


export default AdminPage;