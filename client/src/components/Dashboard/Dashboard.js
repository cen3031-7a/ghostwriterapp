import React, {Component} from 'react';
import  './Dashboard.css';
import Dragula from 'react-dragula';
import 'dragula/dist/dragula.css';
import Section from '../../components/Section/Section';
import {AlignJustify,  ChevronDown } from 'react-feather'
import { Accordion, Card } from 'react-bootstrap';

var sectionData;

class Dashboard extends Component {
	
	constructor(props)
	{
		super(props);
		this.state = 
		{
			order: [],
			empty: true
		}

	}

	//Set state of question order, and callback to POST order to Mongo
	orderUpdate(value)
	{
		this.setState ({
			order: value
		})
			
		this.props.callbackOrder(value);

	}
	
	//Callback to POST responses to Mongo
	parentDash = (text) =>
	{

		this.props.callbackQPage(text);
		
	}

	toggleQuestionBoolean = (id) =>{
		this.props.toggleQuestionBoolean(id)
	}
	
    render() {
		
		const data = this.props.oldData;
		const resData = this.props.resData;

		//const empty = resData.isEmpty()

		if(resData.length === 0) this.state.empty = true
		else this.state.empty = false
		
		//Render sections with bootstrap Accordion box, Section component filled with questions, icons, etc.
		sectionData = resData
			.map((q, i) => {	

				return(
				
					<Accordion id={q.sectionid} defaultActiveKey="0" style={{backgroundColor: 'e0e0e0'}} key={q.sectionid}>
						<Card style={{borderRadius: '3px', backgroundColor: '#fafafa', border: '.5px solid silver'}}>
						
							<Accordion.Toggle as={Card.Header} className="accHeader" eventKey="1">
								<div style={{display: 'inline', padding: '5px'}}> {data[data.findIndex((e) => e.sectionid === q.sectionid)].sectionname} </div>
								<AlignJustify
								style={{float: 'right'}} 
								/>
								<ChevronDown className="closeCollapse" />
							</Accordion.Toggle>
							
							<Accordion.Collapse eventKey="1">
								<Card.Body>
									<Section className="SECTION" resData={q} data={data[data.findIndex((e) => e.sectionid === q.sectionid)]} id={q.sectionid} callbackDash={this.parentDash} toggleQuestionBoolean = {this.toggleQuestionBoolean} />
								</Card.Body>
							</Accordion.Collapse>

						</Card>
					</Accordion>
					
				)
				
			})
		
		//Render sections, and make 'draggable'
		return(
		
			<div className="App">
			
				<div className="section" ref={this.dragBox}>

					{sectionData}
					{this.state.empty && <p className="noSections">Select a Section from the Select Section Dropdown to Add a Section to Your Story</p>}

				</div>
				
				
			</div>

		);
		
    }
  
	//react-dragula allows for draggable sections - order is kept track of and then POSTed to Mongo
	dragBox = (componentBackingInstance) => {
	  
		if (componentBackingInstance) {
			
		  let options = { };
		  const dragula = Dragula([componentBackingInstance], options);
		  dragula.on('drop', (el, target, source, sibling) => {
			  
			 var newOrder = [];
	
			  for(var i = 0; i < target.childNodes.length; i++)
				  newOrder[i] = {sectionid: target.childNodes[i].id};
			  
			 this.orderUpdate(newOrder);
				  
			  
		  })
		  
		}
		
	};
  
}


export default Dashboard;
